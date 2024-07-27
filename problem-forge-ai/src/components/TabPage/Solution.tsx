// Filename: Solution.tsx

import { Editor } from '@monaco-editor/react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Navbar from './Navbar';
import spinner from '@/../public/loadingCode.svg';
import axiosBackInstance from '@/app/axiosInstance';
import Image from 'next/image';
import TextareaAutosize from 'react-textarea-autosize';

type Props = {
    solution: string;
    setSolution: Dispatch<SetStateAction<string>>;
    generateSolution: () => Promise<void>;
    userLang: string;
    setUserLang: Dispatch<SetStateAction<string>>;
    userTheme: string;
    setUserTheme: Dispatch<SetStateAction<string>>;
    fontSize: number;
    setFontSize: Dispatch<SetStateAction<number>>;
    userInput: string;
    setUserInput: Dispatch<SetStateAction<string>>;
    userOutput: string;
    setUserOutput: Dispatch<SetStateAction<string>>;
};

const Solution = ({
    solution,
    setSolution,
    generateSolution,
    userLang,
    setUserLang,
    userTheme,
    setUserTheme,
    fontSize,
    setFontSize,
    userInput,
    setUserInput,
    userOutput,
    setUserOutput,
}: Props) => {

    // Loading state variable to show spinner while fetching data
    const [loading, setLoading] = useState(false);

    // Loading state variable for generating solution
    const [generating, setGenerating] = useState(false);

    const options = {
        fontSize: fontSize
    }

    // Function to call the compile endpoint
    function compile() {
        setLoading(true);
        if (solution === ``) {
            setLoading(false);
            return;
        }

        // Post request to compile endpoint
        axiosBackInstance.post(`/compile`, {
            code: solution,
            language: userLang,
            input: userInput
        }).then((res) => {
            setUserOutput(res.data);
        }).finally(() => {
            setLoading(false);
        });
    }

    // Function to handle generate solution
    async function handleGenerateSolution() {
        setGenerating(true);
        await generateSolution();
        setGenerating(false);
    }

    // Function to clear the output screen
    function clearOutput() {
        setUserOutput("");
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <Navbar
                userLang={userLang} setUserLang={setUserLang}
                userTheme={userTheme} setUserTheme={setUserTheme}
                fontSize={fontSize} setFontSize={setFontSize}
                generateSolution={handleGenerateSolution}
            />
            <div className="flex flex-col w-full">

                <div className="relative flex-1">

                    {generating && (
                        <div className='w-full h-full flex items-center justify-center absolute bg-gray-100  bg-opacity-75 z-30'>
                            <div className="w-[25%] h-[25%] z-20 absolute">
                                <Image src={spinner} alt="Generating..." fill className="animate-spin" />
                            </div>
                        </div>
                    )}
                    <Editor
                        options={options}
                        height="60vh"
                        width="100%"
                        theme={userTheme}
                        language={userLang}
                        defaultLanguage="cpp"
                        defaultValue="# Enter your code here"
                        value={solution}
                        onChange={(value) => { if (value) setSolution(value) }}
                    />
                    <button
                        className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={compile}
                    >
                        Run
                    </button>
                </div>
                <div className="flex flex-col mt-4">
                    <h4 className="font-bold mb-2">Input:</h4>
                    <div className="flex-1 mb-4">
                        <TextareaAutosize
                            id="code-inp"
                            value={userInput}
                            className="w-full min-h-[150px] p-2 border border-gray-300 rounded font-mono"
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                    </div>
                    <h4 className="font-bold mb-2">Output:</h4>
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <Image src={spinner} alt="Loading..." width={40} height={40} className="animate-spin" />
                        </div>
                    ) : (
                        <div className="flex-1 mb-4">
                            <TextareaAutosize
                                id="code-inp"
                                value={userOutput}
                                className="w-full min-h-[150px] p-2 border border-gray-300 rounded font-mono"
                                onChange={(e) => setUserOutput(e.target.value)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Solution;
