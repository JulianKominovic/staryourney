// import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { greet } from "./bindings";
// import {
//   Tldraw,
//   ShapeUtil,
//   TLBaseShape,
//   Rectangle2d,
//   ImageShapeUtil,
//   HTMLContainer,
//   TLImageShape,
//   TLOnBeforeCreateHandler,
//   Editor,
// } from "@tldraw/tldraw";
// import "@tldraw/tldraw/tldraw.css";
// import { Input } from "./components/ui/input";
// import { User, Computer, SquareGantt } from "lucide-react";
// import { Button } from "./components/ui/button";
import Entries from "./components/organisms/Entries";

import { Button } from "./components/ui/button";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { updateOrCreateSnapshot } from "./database/editor";
// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };
// async function chatAI(
//   messages: Message[],
//   callback: (messages: Message[]) => void
// ) {
//   const response = await fetch("http://127.0.0.1:11434/api/chat", {
//     method: "POST",
//     body: JSON.stringify({
//       model: "llama2",
//       messages,
//     }),
//   });
//   let textDecoder = new TextDecoder();
//   const reader = response.body?.getReader();
//   if (!reader) return;
//   let newMessages = [...messages];
//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) {
//       // Do something with last chunk of data then exit reader
//       return;
//     }
//     const chunk = textDecoder.decode(value);
//     const data = JSON.parse(chunk);
//     const lastNewMessage = newMessages.at(-1);
//     if (lastNewMessage?.role === "assistant" && lastNewMessage) {
//       lastNewMessage.content += data.message.content;
//     } else {
//       newMessages.push({
//         role: "assistant",
//         content: data.message.content,
//       });
//     }

//     callback(newMessages);

//     // Otherwise do something here to process current chunk
//   }
// }

function App() {
  // const [ideas, setIdeas] = useState<
  //   {
  //     id: string;
  //     chatHistory?: {
  //       role: "user" | "assistant";
  //       content: string;
  //     }[];
  //   }[]
  // >([]);

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   console.log("LAUNCH!");
  //   const prompt = new FormData(e.target as HTMLFormElement).get(
  //     "prompt"
  //   ) as string;
  //   const id = Math.random().toString(36).substring(7);

  //   await chatAI(
  //     [
  //       ...(ideas.find((idea) => idea.id === id)?.chatHistory || []),
  //       {
  //         role: "user",
  //         content: prompt,
  //       },
  //       {
  //         role: "user",
  //         content:
  //           "In the last message I had an idea and need your opinion. Use markdown to answer. Give me some ideas around my thoughts, be SHORT and CONCISE with the response. Use LESS THAN 80 tokens and most important be frank, if you think my idea is bad or has nothing that does not already exists just say that. Finally help me to convert his idea in something unique never seen.",
  //       },
  //     ],
  //     (messages) => {
  //       setIdeas((prev) => {
  //         const sameIdeaIndex = prev.findIndex((idea) => idea.id === id);
  //         return [
  //           ...prev.filter((_, index) => index !== sameIdeaIndex),
  //           {
  //             id,
  //             chatHistory: messages,
  //           },
  //         ];
  //       });
  //     }
  //   );
  // }

  // function askForOpinion(id: string) {
  //   const idea = ideas.find((idea) => idea.id === id);
  //   if (!idea) return;
  //   return chatAI(
  //     [
  //       ...(idea.chatHistory ?? []),
  //       {
  //         role: "user",
  //         content: "",
  //       },
  //     ],
  //     (messages) => {
  //       setIdeas((prev) => {
  //         const sameIdeaIndex = prev.findIndex((idea) => idea.id === id);
  //         return [
  //           ...prev.filter((_, index) => index !== sameIdeaIndex),
  //           {
  //             id,
  //             chatHistory: messages,
  //           },
  //         ];
  //       });
  //     }
  //   );
  // }

  return (
    <div className="w-full grid grid-rows-1 grid-cols-[220px_4fr] h-[100dvh] overflow-x-hidden">
      <nav
        data-tauri-drag-region
        className="fixed top-0 left-0 w-full h-[46px]"
      ></nav>
      <aside className="flex flex-col w-full h-full pl-2">
        {/* <h1 className="mx-auto text-4xl font-semibold text-center">
          Staryourney
        </h1>
        <h2 className="text-center text-muted-foreground">
          You write, AI opinionates.
        </h2> */}
        <Button
          variant={"ghost"}
          className="mt-40"
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
          New Entry
        </Button>
      </aside>
      <main className="w-full h-full px-2 py-2 overflow-y-auto">
        <div className="h-full px-8 py-8 pt-12 overflow-y-auto rounded-lg shadow-lg bg-neutral-100">
          <Entries />
        </div>
      </main>
    </div>
  );
}

export default App;
