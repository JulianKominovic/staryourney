import { Button, buttonVariants } from "../ui/button";
import { updateOrCreateSnapshot } from "@/database/editor";
import useUI from "@/stores/ui";
import { cn } from "@/lib/utils";
import { PlusCircle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { getKeywords, KeywordsModel } from "@/database/keywords";
import useEntries from "@/stores/entries";

type Props = {};

const Sidebar = () => {
  const sidebarOpen = useUI((state) => state.sidebarOpen);
  const getEntriesTitles = useEntries((state) => state.getEntriesTitles);
  const [keywords, setKeywords] = useState<KeywordsModel[]>([]);
  useEffect(() => {
    getKeywords().then(setKeywords);
  }, []);
  console.log("keywords", keywords);
  return (
    <aside
      className={cn(
        "flex flex-col pt-12 h-full pl-4 pr-2 w-full transition-opacity",
        {
          "opacity-0": !sidebarOpen,
          "opacity-100": sidebarOpen,
        }
      )}
    >
      {/* <h1 className="mx-auto text-4xl font-semibold text-center">
          Staryourney
        </h1>
        <h2 className="text-center text-muted-foreground">
          You write, AI opinionates.
        </h2> */}
      <p className="text-[10px] text-neutral-600 my-2 after:bg-neutral-600 after:h-px after:w-full after:inline-block">
        Entries
      </p>

      <ul>
        {getEntriesTitles().map((entry) => (
          <li key={entry.id} className="">
            <a
              href={`#${entry.id}`}
              //   variant="ghost"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start w-full h-auto px-1 py-2 text-xs text-black/60"
              )}
            >
              {entry.title}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-[10px] text-neutral-600 my-2">Keywords</p>
      <ul className="flex flex-wrap gap-1">
        {keywords.map(({ keyword, snapshot_id }) => (
          <li key={keyword} className="">
            <Button
              onClick={() => {}}
              variant={"default"}
              className={cn(
                "justify-start w-full h-auto px-2 py-1 text-xs rounded-full"
              )}
            >
              {keyword}
            </Button>
          </li>
        ))}
      </ul>
      <Button
        variant={"ghost"}
        className="flex items-center gap-2"
        onClick={() => {
          const uuid = crypto.randomUUID();
          updateOrCreateSnapshot(
            uuid,
            JSON.stringify([
              {
                id: "00d33438-1409-45fc-ac53-d55f89fd6aa6",
                type: "heading",
                props: {
                  textColor: "default",
                  backgroundColor: "default",
                  textAlignment: "left",
                  level: 1,
                },
                content: [
                  {
                    type: "text",
                    text: "What are you thinking?",
                    styles: {},
                  },
                ],
                children: [],
              },
              {
                id: "33967d08-821c-47fe-ad5b-eb9c2422ce7c",
                type: "paragraph",
                props: {
                  textColor: "default",
                  backgroundColor: "default",
                  textAlignment: "left",
                },
                content: [],
                children: [],
              },
            ])
          ).finally(() => {
            window.location.reload();
          });
        }}
      >
        <PlusCircle className="text-lg" />
        New Entry
      </Button>
    </aside>
  );
};

export default Sidebar;
