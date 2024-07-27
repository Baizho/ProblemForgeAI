'use client';

import { FormEvent, useState } from "react";
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
import spinner from '@/../public/loadingCode.svg';
import Image from "next/image";
import logo from "@/../public/logoOlympath.png";
import Link from "next/link";
import LoadingModal from "@/components/LoadingModal";

interface Difficulty {
  label: string;
  color: string;
}

interface Language {
  label: string;
  value: string;
}

export default function Home() {
  const router = useRouter();

  // State variables for problem generation form
  const [idea, setIdea] = useState("");
  const [language, setLanguage] = useState<Language>({ label: "English", value: "english" });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  // State variables for editor settings
  const [userLang, setUserLang] = useState("cpp");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(15);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");

  // State variables for tab navigation
  const [tab, setTab] = useState<"Statement" | "Constraints" | "Tests" | "Users" | "Solution">("Statement");

  // State variables for problem data
  const [statementLoading, setStatementLoading] = useState(false);
  const [solution, setSolution] = useState("");
  const [title, setTitle] = useState("");
  const [statement, setStatement] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");
  const [notes, setNotes] = useState("");

  // State variables for user credentials
  const [apiKey, setApiKey] = useState("");
  const [secret, setSecret] = useState("");

  // State variables for constraints
  const [timeLimit, setTimeLimit] = useState(1000);
  const [memoryLimit, setMemoryLimit] = useState(256);

  // State variables for test generation
  const [testFiles, setTestFiles] = useState<string[]>([]);
  const [testLoading, setTestLoading] = useState(false);
  const [countTests, setCountTests] = useState(10);

  // State variables for error handling
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  // State variables for loading indicators
  const [polygonLoading, setPolygonLoading] = useState(false);
  const [isProcessComplete, setIsProcessComplete] = useState(false);

  // Handle form submission for problem generation
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!idea) {
      alert("Please write an idea for a problem");
      return;
    }
    if (selectedTags.length === 0) {
      alert("Please select a topic");
      return;
    }
    if (!selectedDifficulty) {
      alert("Please select a difficulty");
      return;
    }
    router.push("#problem");
    setStatementLoading(true);
    try {
      const res = await axiosBackInstance.post("/generateProblem", {
        ideaPrompt: idea,
        problemTopic: selectedTags.join(","),
        problemLevel: selectedDifficulty?.label,
        problemLanguage: language.value,
      });
      const problem = res.data.message;
      setTitle(problem.title);
      setStatement(problem.statement);
      setInput(problem.input);
      setOutput(problem.output);
      setTestInput(problem.example.inputExample);
      setTestOutput(problem.example.outputExample);
      setNotes(problem.example.explanation);
      setTestFiles([]);
    } catch (err: any) {
      alert("Error generating the problem. Please provide more details or avoid inappropriate content.");
    }
    setStatementLoading(false);
  };

  // Handle test generation
  const handleTests = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !statement || !input || !output) {
      alert("Please fill in title, statement, input, and output fields.");
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
      const files = res.data.tests;
      setTestFiles([...testFiles, ...files]);
    } catch (err: any) {
      alert("Error generating tests.");
    }
    setTestLoading(false);
  };

  // Generate solution for the problem
  const generateSolution = async () => {
    if (!title || !statement || !input || !output || !testInput || !testOutput) {
      alert("Please fill in title, statement, input, output fields.");
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
    setSolution(response.message);
  };

  // Handle copy input button click
  const [copiedInput, setCopiedInput] = useState(false);
  const copyInput = () => {
    navigator.clipboard.writeText(testInput).then(() => {
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  // Handle copy output button click
  const [copiedOutput, setCopiedOutput] = useState(false);
  const copyOutput = () => {
    navigator.clipboard.writeText(testOutput).then(() => {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  return (
    <>
      <div id="enterIdea" className="min-h-screen flex flex-col z-10 bg-gray-100">
        <div className="h-full w-full">
          <LoadingModal
            isLoading={polygonLoading}
            isProcessComplete={isProcessComplete}
            onClose={() => {
              setPolygonLoading(false);
              setIsProcessComplete(false);
            }}
          />
        </div>

        <Link href="/" className="flex justify-center sm:justify-start items-center w-full px-8 my-6">
          <div className="h-[60px] w-[80px] relative">
            <Image src={logo} alt="logo" className="z-20" fill />
          </div>
          <div className="text-3xl font-syne font-bold">olympath</div>
        </Link>

        {/* User Prompt */}
        <UserPrompt
          idea={idea}
          setIdea={setIdea}
          language={language}
          setLanguage={setLanguage}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          handleSubmit={handleSubmit}
        />

        {/* Tab Navigation */}
        <div id="problem" className="flex flex-col">
          <TabNavigation tab={tab} setTab={setTab} />

          <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-gray-100 p-6 flex flex-col">
              {tab === "Statement" && (
                <Statement
                  title={title}
                  setTitle={setTitle}
                  statement={statement}
                  setStatement={setStatement}
                  input={input}
                  setInput={setInput}
                  output={output}
                  setOutput={setOutput}
                  testInput={testInput}
                  setTestInput={setTestInput}
                  testOutput={testOutput}
                  setTestOutput={setTestOutput}
                  notes={notes}
                  setNotes={setNotes}
                />
              )}
              {tab === "Constraints" && (
                <Constraints
                  error1={error1}
                  setError1={setError1}
                  error2={error2}
                  setError2={setError2}
                  timeLimit={timeLimit}
                  setTimeLimit={setTimeLimit}
                  memoryLimit={memoryLimit}
                  setMemoryLimit={setMemoryLimit}
                />
              )}
              {tab === "Tests" && (
                <Tests
                  testFiles={testFiles}
                  setTestFiles={setTestFiles}
                  handleTests={handleTests}
                  countTests={countTests}
                  setCountTests={setCountTests}
                  testLoading={testLoading}
                />
              )}
              {tab === "Solution" && (
                <Solution
                  solution={solution}
                  setSolution={setSolution}
                  generateSolution={generateSolution}
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
              )}
              {tab === "Users" && (
                <Users
                  apiKey={apiKey}
                  setApiKey={setApiKey}
                  secret={secret}
                  setSecret={setSecret}
                />
              )}
            </div>

            <div className="bg-gray-100 p-6 flex flex-col h-full">
              <div className="font-semibold text-sm h-[20px]">Preview</div>
              <div className="flex flex-col h-[100%] border-[1px] border-gray-300 bg-white px-6 py-2 overflow-y-auto relative">
                {statementLoading && (
                  <div className='w-full h-full flex items-center -my-2 -mx-6 justify-center absolute bg-gray-100 bg-opacity-75 z-30'>
                    <div className="w-[25%] h-[25%] z-20 absolute">
                      <Image src={spinner} alt="Generating..." fill className="animate-spin" />
                    </div>
                  </div>
                )}
                <div className="text-center text-[125%] font-mono">{title}</div>
                <div className="text-center text-sm font-sans font-normal">time limit per test: {timeLimit / 1000} second</div>
                <div className="text-center text-sm font-sans font-normal">memory limit per test: {memoryLimit} megabytes</div>
                <div className="text-center text-sm font-sans font-normal">input: standard input</div>
                <div className="text-center text-sm font-sans font-normal">output: standard output</div>
                <div className="text-sm font-mono mt-6"><ProblemText text={statement} /></div>

                {input && (
                  <>
                    <div className="font-semibold text-sm mt-6">Input</div>
                    <div className="text-sm font-mono mt-3"><ProblemText text={input} /></div>
                  </>
                )}
                {output && (
                  <>
                    <div className="font-semibold text-sm mt-6">Output</div>
                    <div className="text-sm font-mono mt-3"><ProblemText text={output} /></div>
                  </>
                )}
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
                      <div className="flex justify-between items-center w-full border-b-[1px] border-black px-[6px] font-semibold text-sm py-1">
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
                {notes && (
                  <>
                    <div className="font-semibold text-sm mt-6">Notes</div>
                    <div className="text-sm font-mono mt-3"><ProblemText text={notes} /></div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
