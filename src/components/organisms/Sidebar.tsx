import { motion } from "framer-motion";
import { Button, buttonVariants } from "../ui/button";
import { updateOrCreateSnapshot } from "@/database/editor";
import useUI from "@/stores/ui";
import { cn } from "@/lib/utils";
import { PlusCircle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { getEntriesTitles } from "@/integration/entries";

type Props = {};

const Sidebar = () => {
  const sidebarOpen = useUI((state) => state.sidebarOpen);
  const [entries, setEntries] = useState<{ id: string; title: string }[]>([]);
  useEffect(() => {
    getEntriesTitles().then(setEntries);
  }, []);
  return (
    <aside
      className={cn(
        "flex flex-col pt-12 h-full pl-2 w-full transition-opacity",
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
      <ul>
        {entries.map((entry) => (
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
