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
import { motion } from "framer-motion";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import Sidebar from "./components/organisms/Sidebar";
import Navbar from "./components/organisms/Navbar";
import useUI from "./stores/ui";
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
  const sidebarOpen = useUI((state) => state.sidebarOpen);
  return (
    <motion.div
      className="w-full grid grid-rows-1 h-[100dvh] overflow-x-hidden transition-all ease-in-out duration-300"
      style={{
        gridTemplateColumns: sidebarOpen ? "220px 1fr" : "0px 1fr",
      }}
    >
      <Navbar />
      <Sidebar />
      <motion.main className="w-full h-full px-2 py-2 overflow-y-auto">
        <div className="h-full px-8 py-8 pt-12 overflow-y-auto rounded-lg shadow-lg bg-neutral-100">
          <Entries />
        </div>
      </motion.main>
    </motion.div>
  );
}

export default App;
