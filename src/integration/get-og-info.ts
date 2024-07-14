import ogs from "open-graph-scraper-lite";

import { fetch, ResponseType } from "@tauri-apps/api/http";
import {
  createOrUpdateOgMetadata,
  getOgMetadataByUrl,
  OgMetadataModel,
} from "@/database/og-metadata";
import { writeImageToDisk } from "./filesystem";

function getHTMLFromUrl(url: string) {
  return fetch(url, {
    method: "GET",
    timeout: 30,
    responseType: ResponseType.Text,
    headers: {
      "Content-Type": "text/html",
    },
  });
}

function getImageFromUrl(url: string) {
  return fetch(url, {
    method: "GET",
    timeout: 30,
    responseType: ResponseType.Binary,
  });
}

export async function getOgInfo(url: string): Promise<OgMetadataModel> {
  const alreadyExistingMetadata = await getOgMetadataByUrl(url);
  console.log("alreadyExistingMetadata", alreadyExistingMetadata);
  if (alreadyExistingMetadata) {
    return alreadyExistingMetadata;
  }

  const response = await getHTMLFromUrl(url);
  const options = {
    html: response.data as string,
  };
  try {
    const { result } = await ogs(options);

    const object: OgMetadataModel = {
      url,
      title: result.ogTitle ?? "",
      description: result.ogDescription ?? "",
      filename: result.ogImage?.at(0)?.url ?? "",
    };
    if (object.filename) {
      const { data: imageBlob } = await getImageFromUrl(object.filename);
      const encodeFilename = encodeURIComponent(object.filename);
      object.filename = encodeFilename;
      await writeImageToDisk(object.filename, imageBlob as any);
    }
    await createOrUpdateOgMetadata(object);
    return object;
  } catch (e) {
    console.error(e);
  }
  return {
    url,
    title: "",
    description: "",
    filename: "",
  };
}
