'use client'

import { FormEvent, memo, MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axiosBackInstance from "./axiosInstance";
import ProblemText from "@/components/ProblemText";
import UserPrompt from "@/components/UserPrompt";
import TabNavigation from "@/components/TabNavigation";
import Statement from "@/components/TabPage/Statement";
import Tests from "@/components/TabPage/Tests";
import Users from "@/components/TabPage/Users";
import Solution from "@/components/TabPage/Solution";
import Constraints from "@/components/TabPage/Constraints";

interface fileProp {
  key: string,
  content: string,
}


export default function Home() {
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [tab, setTab] = useState<"Statement" | "Constraints" | "Tests" | "Users" | "Solution">("Statement");

  const [user, setUser] = useState("");

  const [sol, setSol] = useState("");
  const [title, setTitle] = useState("");
  const [statement, setStatement] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");
  const [notes, setNotes] = useState("");

  const [apiKey, setApiKey] = useState("");
  const [secret, setSecret] = useState("");

  const [timeLimit, setTimeLimit] = useState(1000);
  const [memoryLimit, setMemoryLimit] = useState(256);

  const [testFiles, setTestFiles] = useState<fileProp[]>([]);
  const [testLoading, setTestLoading] = useState(false);
  const [countTests, setCountTests] = useState(10);

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const [polygonLoading, setPolygonLoading] = useState(false);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle("Loading...");
    setStatement("Loading...");
    setInput("Loading...");
    setOutput("Loading...");
    setTestInput("Loading...");
    setTestOutput("Loading...");
    setNotes("Loading...");
    setTestFiles([]);
    router.push("#problem");
    const res = await axiosBackInstance.post("/generateProblem", {
      ideaPrompt: idea,
    });
    const problem = res.data.message;
    // console.log(problem);
    setTitle(problem.title);
    setStatement(problem.statement);
    setInput(problem.input);
    setOutput(problem.output);
    setTestInput(problem.example.inputExample);
    setTestOutput(problem.example.outputExample);
    setNotes(problem.example.explanation);
  }


  const handleTests = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !statement || !input || !output) {
      alert("make sure to fill in title, statement, input, output");
      return;
    }
    setTestLoading(true);
    const res = await axiosBackInstance.post("/generateTests", {
      number: countTests,
      input: input,
      output: output,
    });
    const file_links = res.data.file_links;
    // console.log(file_links);
    setTestLoading(false);
    setTestFiles(file_links);
  }

  const submitPolygon = async () => {
    if (!apiKey || !secret) {
      alert("Please add your api key or secret");
      setTab("Users");
      return;
    }
    if (error1 || error2) {
      alert("You have errors in your Constraints tab");
      return;
    }
    if (testFiles.length === 0) {
      alert("You forgot to generate tests");
      return;
    }
    const file_keys: string[] = [];
    testFiles.map((test, index) => {
      file_keys.push(test.key);
    })
    setPolygonLoading(true);
    const res = await axiosBackInstance.post("/polygonAddProblem", {
      title: title,
      statement: statement,
      input: input,
      output: output,
      testInput: testInput,
      testOutput: testOutput,
      notes: notes,
      tests: file_keys,
      user: user,
      sol: sol,
      timeLimit: timeLimit,
      memoryLimit: memoryLimit,
    });
    const response = res.data;
    if (response.message === "success?") {
      alert("success, added to polygon!");
    } else {
      alert("error in sending to polygon");
    }
    setPolygonLoading(false);
  }

  const generateSolution = async () => {
    if (!title || !statement || !input || !output) {
      alert("make sure to fill in title, statement, input, output");
      return;
    }
    const res = await axiosBackInstance.post("/generateSolution", {
      statement: statement,
      input: input,
      output: output,
      testInput: testInput,
      testOutput: testOutput,
      notes: notes
    });
    const response = res.data;
    setSol(response.message);
  }


  return (
    <>
      <div id="enterIdea" className="min-h-screen flex flex-col bg-white">
        {/* user prompt */}
        <UserPrompt idea={idea} setIdea={setIdea} handleSubmit={handleSubmit} />

        {/* tab navigation */}
        <TabNavigation tab={tab} setTab={setTab} />

        {/* Tab Pages */}
        <div id="problem" className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
          <div className=" bg-gray-100 p-6 flex flex-col h-full">

            {tab === "Statement" && <Statement title={title} setTitle={setTitle} statement={statement} setStatement={setStatement} input={input} setInput={setInput} output={output} setOutput={setOutput} testInput={testInput} setTestInput={setTestInput} testOutput={testOutput} setTestOutput={setTestOutput} notes={notes} setNotes={setNotes} />}
            {tab === "Constraints" && <Constraints error1={error1}
              setError1={setError1}
              error2={error2}
              setError2={setError2} timeLimit={timeLimit} setTimeLimit={setTimeLimit} memoryLimit={memoryLimit} setMemoryLimit={setMemoryLimit} />}
            {tab === "Tests" && <Tests testFiles={testFiles} handleTests={handleTests} countTests={countTests} setCountTests={setCountTests} testLoading={testLoading} />}
            {tab === "Solution" && <Solution sol={sol} setSol={setSol} generateSolution={generateSolution} />}
            {tab === "Users" && <Users user={user} setUser={setUser} apiKey={apiKey} setApiKey={setApiKey} secret={secret} setSecret={setSecret} />}
          </div>

          <div className=" bg-gray-100 p-6 flex flex-col">
            <div className="font-semibold text-sm h-[20px]">Preview</div>
            <div className="flex flex-col h-[100%] border-[1px] border-gray-300 bg-white px-6 py-2  overflow-y-auto">
              <div className="text-center text-[125%]">{title}</div>
              <div className="text-center text-sm font-light">time limit per test: {timeLimit / 1000} second</div>
              <div className="text-center text-sm font-light">memory limit per test: {memoryLimit} megabytes</div>
              <div className="text-center text-sm font-light">input: standard input</div>
              <div className="text-center text-sm font-light">output: standard output</div>
              <div className="text-md font-mono mt-6"><ProblemText text={statement} /></div>

              {input && (
                <><div className="font-semibold text-md mt-6">Input</div>
                  <div className="text-md font-mono mt-3"><ProblemText text={input} /></div></>
              )}
              {output &&
                <><div className="font-semibold text-md mt-6">Output</div>
                  <div className="text-md font-mono mt-3"><ProblemText text={output} /></div></>
              }
              {testInput && testOutput && (
                <>
                  <div className="font-semibold text-md mt-6">Sample</div>
                  <div className="w-full border-[1px] border-black flex flex-col mt-1">
                    <div className="w-full border-b-[1px] border-black px-[6px] font-semibold text-md py-1">input</div>
                    <div className="w-full border-b-[1px] border-black px-[6px] bg-gray-100 text-sm text-amber-950 whitespace-pre-wrap">{testInput}</div>
                    <div className="w-full border-b-[1px] border-black px-[6px] font-semibold text-md py-1">output</div>
                    <div className="w-full border-b-[1px] border-black px-[6px] bg-gray-100 text-sm text-amber-950 whitespace-pre-wrap">{testOutput}</div>
                  </div>
                </>
              )}

              {notes &&
                <><div className="font-semibold text-md mt-6">Notes</div>
                  <div className="text-md font-mono mt-3"><ProblemText text={notes} /></div></>
              }
            </div>
          </div>
        </div >

        <button className="w-full h-16 rounded-lg bg-blue-400 my-4 text-xl" onClick={submitPolygon}>Create problem to polygon</button>
      </div>


    </>
  );
}
