'use client'

import Image from "next/image";
import { FormEvent, MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axiosBackInstance from "./axiosInstance";
import TextareaAutosize from 'react-textarea-autosize';
import ProblemText from "@/components/ProblemText";
import axios from "axios";
import { count } from "console";
import TestText from "@/components/TestText";
import Editor from "@monaco-editor/react";

interface fileProp {
  key: string,
  content: string,
}

export default function Home() {
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [user, setUser] = useState("");
  const [sol, setSol] = useState("");
  const [title, setTitle] = useState("");
  const [statement, setStatement] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");
  const [notes, setNotes] = useState("");
  const [testFiles, setTestFiles] = useState<fileProp[]>([]);
  const [testLoading, setTestLoading] = useState(false);
  const [countTests, setCountTests] = useState(10);
  const [polygonLoading, setPolygonLoading] = useState(false);


  const handleSubmit = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
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
      sol: sol
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

  const formatNumber = (number: number, length: number) => {
    const curLength = number.toString().length;
    if (curLength > length) return number;
    return '0'.repeat(length - curLength) + number.toString()
  }

  return (
    <>
      <div id="enterIdea" className="min-h-screen flex flex-col justify-center bg-white">

        <h1 className="text-center text-5xl font-bold mb-32">Generate problems with ease!</h1>
        <div className="flex items-center justify-center">
          <input className="text-xl font-thin w-2/5 rounded-xl bg-gray-200 p-2 mx-2" value={idea} onChange={(e) => { setIdea(e.target.value) }}></input>
          <button className="p-2 text-lg rounded-xl bg-blue-300" onClick={(e) => { handleSubmit(e) }}>submit</button>
        </div>
      </div>
      <div id="problem" className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className=" bg-gray-100 p-6 flex flex-col h-full">
          <label htmlFor="title" className="font-semibold text-md">Name:</label>
          <input value={title} onChange={(e) => { setTitle(e.target.value) }} className="text-md px-[1.5px] border-[1px] border-gray-600 rounded-[2px] w-2/5 font-mono resize-none"></input>
          <label htmlFor="statement" className="font-semibold text-md mt-2">Statement</label>
          <TextareaAutosize value={statement} onChange={(e) => { setStatement(e.target.value) }} className="resize-none overflow-hidden text-md px-[1.5px] border-[1px] border-gray-600 rounded-[2px] min-h-[150px] font-mono" ></TextareaAutosize>
          <label htmlFor="input" className="font-semibold text-md mt-2">Input</label>
          <TextareaAutosize value={input} onChange={(e) => { setInput(e.target.value) }} className="resize-none overflow-hidden text-md px-[1.5px] border-[1px] border-gray-600 rounded-[2px] min-h-[100px] font-mono" ></TextareaAutosize>
          <label htmlFor="output" className="font-semibold text-md mt-2">Output</label>
          <TextareaAutosize value={output} onChange={(e) => { setOutput(e.target.value) }} className="resize-none overflow-hidden text-md px-[1.5px] border-[1px] border-gray-600 rounded-[2px] min-h-[100px] font-mono" ></TextareaAutosize>
          <label htmlFor="notes" className="font-semibold text-md mt-2">Notes</label>
          <TextareaAutosize value={notes} onChange={(e) => { setNotes(e.target.value) }} className="resize-none overflow-hidden text-md px-[1.5px] border-[1px] border-gray-600 rounded-[2px] min-h-[100px] font-mono" ></TextareaAutosize>
          <form className="flex w-full justify-between mt-4" onSubmit={(e) => { handleTests(e) }}>
            <div>
              <label className="pr-2">Number of tests (minimum 5, maximum 99):</label>
              <input className="w-32" type="number" min={5} max={99} value={countTests} onChange={((e) => { const num = parseInt(e.target.value); { setCountTests(num) } })}></input>
            </div>
            <button type="submit" className="px-8 bg-gray-200 border-[1px] border-gray-600 text-md">Generate Tests</button>
          </form>
          {testLoading && (
            <div className="text-center">Tests are loading...</div>
          )}
          <div className="mt-2 overflow-y-auto max-h-[170px]">
            {testFiles.map((file, index) => {
              console.log(file.key);
              return (
                <TestText key={index} content={file.content} name={`test_${formatNumber(index + 1, countTests.toString().length)}`} />
              )
            })}
          </div>
          <label htmlFor="user" className="font-semibold text-md">Share access to user:</label>
          <input value={user} onChange={(e) => { setUser(e.target.value) }} className="text-md px-[1.5px] border-[1px] border-gray-600 rounded-[2px] w-2/5 font-mono resize-none"></input>
        </div>
        <div className=" bg-gray-100 p-6 flex flex-col h-full">
          <div className="font-semibold text-sm">Preview</div>
          <div className="flex flex-col min-h-[90%] max-h-[90%] border-[1px] border-gray-300 bg-white px-6 py-2  overflow-y-auto">
            <div className="text-center text-[125%]">{title}</div>
            <div className="text-center text-sm font-light">time limit per test: 1 second</div>
            <div className="text-center text-sm font-light">memory limit per test: 256 megabytes</div>
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

        <div>
          <div className="w-full flex bg-gray-100 px-4 py-2">
            <div className="font-semibold text-lg">Solution:</div>
            <button className="px-8 ml-4 bg-gray-200 border-[1px] border-gray-600 text-md" onClick={generateSolution}>Generate Solution</button>
          </div>
          <div className="h-[500px]">
            <Editor
              height="100%"
              width="100%"
              language="cpp"
              className="overflow-hidden"
              theme="vs-dark"
              value={sol}
              onChange={(e) => { if (e) { setSol(e) } }}
              options={{
                inlineSuggest: {
                  enabled: true
                },
                fontSize: 16,
                formatOnType: true,
                autoClosingBrackets: "always",
                minimap: { scale: 10 }
              }}
            />
          </div>
        </div>
        <div className="w-full h-full bg-gray-100">

        </div>
      </div >

      <button className="w-full h-16 rounded-lg bg-blue-400 my-4 text-xl" onClick={submitPolygon}>Create problem to polygon</button>
    </>
  );
}
