import React, { useState } from "react";
import { Button } from "../ui/button";
import MarkdownEditor from "../molecules/MarkdownEditor";
import db from "@/database/client";
import { updateOrCreateSnapshot } from "@/database/editor";

type Props = {};

const NewEntry = (props: Props) => {
  return (
    <>
      <MarkdownEditor
        onChange={(e) => {
          const uuid = crypto.randomUUID();
          updateOrCreateSnapshot(uuid, JSON.stringify(e.blocks));
        }}
      />
    </>
  );
};

export default NewEntry;
