import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { greet } from "./bindings";
import { Input } from "./components/ui/input";
import { User, Computer } from "lucide-react";
import { Button } from "./components/ui/button";
// import { ResponseType, fetch } from "@tauri-apps/api/http";
import MarkdownPreview from "@uiw/react-markdown-preview";

async function fetchAI(
  prompt: string,
  callback: (aiResponse: string, aiContext: number[] | undefined) => void,
  context?: number[]
) {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    body: JSON.stringify({
      model: "llama2",
      prompt,
      context,
    }),
  });
  let textDecoder = new TextDecoder();
  const reader = response.body?.getReader();
  if (!reader) return;
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      // Do something with last chunk of data then exit reader
      return;
    }
    const chunk = textDecoder.decode(value);
    const data = JSON.parse(chunk);
    callback(data.response, data.context);
    // Otherwise do something here to process current chunk
  }
}

function App() {
  const [ideas, setIdeas] = useState<
    {
      id: string;
      content: string;
      aiOpinions: string[];
      context: number[];
    }[]
  >([]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("LAUNCH!");
    const prompt = new FormData(e.target as HTMLFormElement).get(
      "prompt"
    ) as string;
    const id = Math.random().toString(36).substring(7);

    // const response =  fetch("http://127.0.0.1:11434/api/generate", {
    //   method: "POST",
    //   timeout: 30,
    //   responseType: ResponseType.Binary,

    //   body: {
    //     payload: {
    //       model: "llama2",
    //       // "stream":false,
    //       prompt: prompt,
    //     },
    //     type: "Json",
    //   },
    // })
    await fetchAI(
      "Use markdown to answer this. User has an idea and needs your opinion. Give him some ideas around what user thought, be SHORT and CONCISE with the response. Use LESS THAN 80 tokens and most important be frank, if you think User idea is bad or his idea has nothing that does not already exists just say that. Finally help him to convert his idea in something unique never seen: \n\n" +
        prompt,
      (response, context) => {
        setIdeas((prev) => {
          const sameIdeaIndex = prev.findIndex((idea) => idea.id === id);
          return [
            ...prev.filter((_, index) => index !== sameIdeaIndex),
            {
              id,
              content: prompt,
              aiOpinions: [
                prev[sameIdeaIndex]?.aiOpinions.at(-1)
                  ? prev[sameIdeaIndex]?.aiOpinions.at(-1) + response
                  : response,
              ],
              context: prev.at(-1)?.context || context || [],
            },
          ];
        });
      }
    );
  }

  function askForOpinion(id: string) {
    const idea = ideas.find((idea) => idea.id === id);
    if (!idea) return;
    return fetchAI(
      idea.content,
      (response) => {
        setIdeas((prev) => {
          const sameIdeaIndex = prev.findIndex((idea) => idea.id === id);
          return [
            ...prev.filter((_, index) => index !== sameIdeaIndex),
            {
              ...idea,
              aiOpinions: [
                ...idea.aiOpinions,
                prev[sameIdeaIndex]?.aiOpinions.at(-1)
                  ? prev[sameIdeaIndex]?.aiOpinions.at(-1) + response
                  : response,
              ],
            },
          ];
        });
      },
      idea.context
    );
  }

  return (
    <div className="px-8 py-8 pt-12">
      <h1 className="mx-auto text-4xl font-semibold text-center">
        Staryourney
      </h1>
      <h2 className="text-center text-muted-foreground">
        You write, AI opinionates.
      </h2>

      <ul className="mt-8">
        {ideas.map((idea) => {
          return (
            <li className="p-4 mb-4 rounded-lg bg-background">
              <header className="flex items-start gap-4">
                <User className="flex-shrink-0 w-8 h-8 p-1.5 rounded-full aspect-square bg-secondary" />
                <pre className="font-sans text-sm whitespace-pre-line text-muted-foreground">
                  {idea.content}
                </pre>
              </header>
              <ul className="mt-8">
                {idea.aiOpinions.map((opinion) => {
                  return (
                    <li className="mb-4">
                      <header className="relative flex items-start gap-4">
                        <Computer className="flex-shrink-0 w-8 h-8 p-1.5 rounded-full aspect-square bg-secondary [&__p]:m-0 relative z-10" />
                        <MarkdownPreview
                          className="font-sans text-sm whitespace-pre-line [&__p]:!m-0 [&__ol]:list-decimal [&__ul]:list-disc bg-transparent"
                          source={opinion}
                        />
                        <div className="absolute w-0.5 h-full left-[15px] bg-muted-foreground" />
                      </header>
                    </li>
                  );
                })}
              </ul>
              <footer>
                <Button
                  onClick={() => askForOpinion(idea.id)}
                  variant="outline"
                  className="text-sm cursor-pointer text-muted-foreground"
                >
                  Ask for opinion
                </Button>
              </footer>
            </li>
          );
        })}
      </ul>
      <form
        className="p-4 mt-4 rounded-lg bg-background"
        action=""
        onSubmit={handleSubmit}
      >
        <fieldset>
          <label htmlFor="">What are you thinking?</label>
          <Input type="text" name="prompt" placeholder="Creating and app " />
        </fieldset>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
