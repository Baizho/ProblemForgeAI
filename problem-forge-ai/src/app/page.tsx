'use client'

// import "./globals.css";

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
import GridPattern from "@/components/magicui/animated-grid-pattern";
import { AnimatedGridPatternDemo } from "@/components/GridBg";


import Image from "next/image";
import logo from "@/../public/logoOlympath.png";
import Link from "next/link";
import LoadingModal from "@/components/LoadingModal";


export default function Home() {
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [language, setLanguage] = useState("english");
  const [problemTopic, setProblemTopic] = useState("");
  const [problemLevel, setPRoblemLevel] = useState("");

  // State variable to set editors default language
  const [userLang, setUserLang] = useState("cpp");

  // State variable to set editors default theme
  const [userTheme, setUserTheme] = useState("vs-dark");

  // State variable to set editors default font size
  const [fontSize, setFontSize] = useState(15);

  // State variable to set users input
  const [userInput, setUserInput] = useState("");

  // State variable to set users output
  const [userOutput, setUserOutput] = useState("");

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

  const [testFiles, setTestFiles] = useState<string[]>([]);
  const [testLoading, setTestLoading] = useState(false);
  const [countTests, setCountTests] = useState(10);

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const [polygonLoading, setPolygonLoading] = useState(false);
  const [isProcessComplete, setIsProcessComplete] = useState(false);


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
      problemTopic: problemTopic,
      problemLevel: problemLevel,
      problemLanguage: language
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
    try {
      const res = await axiosBackInstance.post("/generateTests", {
        number: countTests,
        input: input,
        output: output,
        testInput: testInput,
        testOutput: testOutput
      });
      const files = res.data.file_links;
      setTestFiles(files);
    } catch (err: any) {
      alert("There was an error generating tests");
    }
    // console.log(file_links);
    setTestLoading(false);
  }

  const submitPolygon = async () => {
    if (!apiKey || !secret) {
      alert("Please add your api key or secret");
      setTab("Users");
      return;
    }
    if (error1 || error2) {
      alert("You have errors in your Constraints tab");
      setTab("Constraints");
      return;
    }
    if (testFiles.length === 0) {
      alert("You forgot to generate tests");
      setTab("Tests")
      return;
    }
    setPolygonLoading(true);
    setIsProcessComplete(false);


    // await new Promise(resolve => setTimeout(resolve, 10000)); // Simulating 20-second process
    const res = await axiosBackInstance.post("/polygonAddProblemApi", {
      title: title,
      statement: statement,
      input: input,
      output: output,
      testInput: testInput,
      testOutput: testOutput,
      notes: notes,
      tests: testFiles,
      user: user,
      sol: sol,
      timeLimit: timeLimit,
      memoryLimit: memoryLimit,
      problemLanguage: language,
      userLang: userLang,
      apiKey: apiKey,
      apiSecret: secret,
    });
    const response = res.data;
    if (response.message === "Problem created successfully!") {
      alert("success, added to polygon!");
    } else {
      alert("error in sending to polygon");
    }
    setIsProcessComplete(true);
  }

  const generateSolution = async () => {
    if (!title || !statement || !input || !output || !testInput || !testOutput) {
      alert("make sure to fill in title, statement, input, output");
      return;
    }
    const res = await axiosBackInstance.post("/generateSolution", {
      statement: statement,
      input: input,
      output: output,
      testInput: testInput,
      testOutput: testOutput,
      notes: notes,
      userLang: userLang,
    });
    const response = res.data;
    setSol(response.message);
  }

  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);

  const copyInput = () => {
    navigator.clipboard.writeText(testInput).then(() => {
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(testOutput).then(() => {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  return (
    <>
      <div id="enterIdea" className=" min-h-screen flex flex-col z-10 bg-gray-100">
        <div className="h-full w-full"><LoadingModal isLoading={polygonLoading} isProcessComplete={isProcessComplete} onClose={() => {
          setPolygonLoading(false);
          setIsProcessComplete(false);
        }} /></div>
        <Link href="/" className="flex items-center w-full px-8 my-6">
          <div className="h-[60px] w-[80px] relative">
            <Image src={logo} alt="logo" className="z-20" fill />
          </div>
          <div className="text-3xl font-syne font-bold">olympath</div>
        </Link>
        {/* user prompt */}
        <UserPrompt idea={idea} setIdea={setIdea} language={language} setLanguage={setLanguage} problemLevel={problemLevel} setProblemLevel={setPRoblemLevel} problemTopic={problemTopic} setProblemTopic={setProblemTopic} handleSubmit={handleSubmit} />

        {/* tab navigation */}

        {/* Tab Pages */}
        <div id="problem" className="flex flex-col">
          <TabNavigation tab={tab} setTab={setTab} />
          <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className=" bg-gray-100 p-6 flex flex-col">

              {tab === "Statement" && <Statement title={title} setTitle={setTitle} statement={statement} setStatement={setStatement} input={input} setInput={setInput} output={output} setOutput={setOutput} testInput={testInput} setTestInput={setTestInput} testOutput={testOutput} setTestOutput={setTestOutput} notes={notes} setNotes={setNotes} />}
              {tab === "Constraints" && <Constraints error1={error1}
                setError1={setError1}
                error2={error2}
                setError2={setError2} timeLimit={timeLimit} setTimeLimit={setTimeLimit} memoryLimit={memoryLimit} setMemoryLimit={setMemoryLimit} />}
              {tab === "Tests" && <Tests testFiles={testFiles} handleTests={handleTests} countTests={countTests} setCountTests={setCountTests} testLoading={testLoading} />}
              {tab === "Solution" && <Solution
                sol={sol} setSol={setSol} generateSolution={generateSolution}
                userLang={userLang}
                setUserLang={setUserLang}
                userTheme={userTheme}
                setUserTheme={setUserTheme}
                fontSize={fontSize}
                setFontSize={setFontSize}
                userInput={userInput}
                setUserInput={setUserInput}
                userOutput={userOutput}
                setUserOutput={setUserOutput}
              />
              }
              {tab === "Users" && <Users user={user} setUser={setUser} apiKey={apiKey} setApiKey={setApiKey} secret={secret} setSecret={setSecret} />}
            </div>

            <div className=" bg-gray-100 p-6 flex flex-col h-full">
              <div className="font-semibold text-sm h-[20px]">Preview</div>
              <div className="flex flex-col h-[100%] border-[1px] border-gray-300 bg-white px-6 py-2  overflow-y-auto">
                <div className="text-center text-[125%] font-mono">{title}</div>
                <div className="text-center text-sm font-sans font-normal">time limit per test: {timeLimit / 1000} second</div>
                <div className="text-center text-sm font-sans font-normal">memory limit per test: {memoryLimit} megabytes</div>
                <div className="text-center text-sm font-sans font-normal">input: standard input</div>
                <div className="text-center text-sm font-sans font-normal">output: standard output</div>
                <div className="text-sm font-mono mt-6"><ProblemText text={statement} /></div>

                {input && (
                  <><div className="font-semibold text-sm mt-6">Input</div>
                    <div className="text-sm font-mono mt-3"><ProblemText text={input} /></div></>
                )}
                {output &&
                  <><div className="font-semibold text-sm mt-6">Output</div>
                    <div className="text-sm font-mono mt-3"><ProblemText text={output} /></div></>
                }
                {(testInput || testOutput) && (
                  <>
                    <div className="font-semibold text-sm mt-6">Sample</div>
                    <div className="w-full border-[1px] border-black flex flex-col mt-1">
                      <div className="flex justify-between items-center w-full border-b-[1px] border-black px-[6px] font-semibold text-sm py-1">
                        input
                        <button
                          onClick={copyInput}
                          className="bg-gray-200 text-sm text-black py-1 px-2 rounded hover:bg-gray-300"
                        >
                          {copiedInput ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <div className="font-mono w-full border-b-[1px] min-h-[30px] border-black px-[6px] bg-gray-100 text-sm text-amber-950 whitespace-pre-wrap">
                        {testInput}

                      </div>
                      <div className="flex justify-between items-center  w-full border-b-[1px] border-black px-[6px] font-semibold text-sm py-1">
                        output
                        <button
                          onClick={copyOutput}
                          className="bg-gray-200 text-sm text-black py-1 px-2 rounded hover:bg-gray-300"
                        >
                          {copiedOutput ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <div className="font-mono w-full border-b-[1px] min-h-[30px] border-black px-[6px] bg-gray-100 text-sm text-amber-950 whitespace-pre-wrap">{testOutput}</div>
                    </div>
                  </>
                )}

                {notes &&
                  <><div className="font-semibold text-sm mt-6">Notes</div>
                    <div className="text-sm font-mono mt-3"><ProblemText text={notes} /></div></>
                }
              </div>
            </div>

          </div >
        </div>

        <button className="bg-blue-500 font-raleway text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 shadow-md transition duration-300" onClick={submitPolygon}>
          Create Problem to Polygon
        </button>

      </div >
    </>
  );
}
