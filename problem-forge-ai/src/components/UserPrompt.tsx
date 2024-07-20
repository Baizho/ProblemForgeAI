import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { AnimatedGridPatternDemo } from './GridBg';
import example from "@/../public/ex.png";
import Image from 'next/image';
import GridPattern from './magicui/animated-grid-pattern';

type Props = {
    idea: string,
    setIdea: Dispatch<SetStateAction<string>>,
    language: string,
    setLanguage: Dispatch<SetStateAction<string>>,
    problemTopic: string,
    setProblemTopic: Dispatch<SetStateAction<string>>,
    problemLevel: string,
    setProblemLevel: Dispatch<SetStateAction<string>>,
    handleSubmit: (e: FormEvent<HTMLFormElement>) => {}
}

const UserPrompt = ({ idea, setIdea, language, setLanguage, problemTopic, setProblemTopic, problemLevel, setProblemLevel, handleSubmit }: Props) => {
    return (
        <>
            <div className="z-10 flex flex-col items-center min-h-screen py-12 bg-gray-100">
                <GridPattern />

                <h1 className="z-10 text-2xl lg:text-4xl xl:text-6xl  font-raleway font-bold text-gray-900 mb-6 text-center">
                    Future of Coding Contests<br /> Create, Generate, Compete
                </h1>
                <h2 className="z-10 text-xl lg:text-2xl xl:text-4xl font-raleway font-semibold text-gray-700 mb-8 text-center">
                    Generate Coding Problems with AI
                </h2>
                <p className="z-10 text-gray-600 text-base lg:text-md xl:text-xl text-center mb-6 font-raleway">
                    Describe your problem idea and watch as our AI transforms it into a competitive programming problem.
                </p>

                <form className="flex flex-col items-center w-full px-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center justify-center lg:flex-row lg:items-center  w-full space-y-4 lg:space-y-0 lg:space-x-4 mb-4">
                        <div className='flex flex-col items-center md:flex-row md:justify-center md:space-x-4 w-full'>
                            <div className="flex flex-col w-full md:w-2/4 m-4">
                                <label htmlFor="language" className="font-semibold mb-2 font-raleway">Language</label>
                                <select
                                    id="language"
                                    className="font-raleway w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    <option value="english">English</option>
                                    <option value="russian">Russian</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-full md:w-2/4 m-4">
                                <label htmlFor="idea" className="font-semibold mb-2 font-raleway">Problem Idea</label>
                                <input
                                    id="idea"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Create a simple and fun story about adding numbers"
                                    value={idea}
                                    onChange={(e) => setIdea(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col items-center md:flex-row md:justify-center md:space-x-4 w-full'>
                            <div className="flex flex-col w-full md:w-2/4 m-4 ">
                                <label htmlFor="problemTopic" className="font-semibold mb-2 font-raleway">Problem Topic</label>
                                <input
                                    id="problemTopic"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="dynamic programming"
                                    value={problemTopic}
                                    onChange={(e) => setProblemTopic(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col w-full md:w-2/4 m-4 ">
                                <label htmlFor="problemLevel" className="font-semibold mb-2 font-raleway">Problem Level</label>
                                <input
                                    id="problemLevel"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="For beginners"
                                    value={problemLevel}
                                    onChange={(e) => setProblemLevel(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>
                    <button
                        type="submit"
                        className="max-w-[200px] px-8 py-2 bg-blue-600 text-white font-raleway font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                        Generate
                    </button>
                </form>

                {/* <!-- Suggestions --> */}
                < div className="z-10 mt-8 text-center" >
                    <h3 className="z-10 text-lg font-raleway font-semibold text-gray-700 mb-4">Examples:</h3>
                    <div className="z-10 flex flex-wrap justify-center space-x-2">
                        <button className="z-10 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-2 cursor-pointer hover:bg-blue-200" onClick={(e) => { setProblemTopic("sum of two numbers"); setProblemLevel("for beginners"); if (e.currentTarget.textContent) setIdea(e.currentTarget.textContent) }}>Create a simple and fun story about adding numbers.</button>
                        <button className="z-10 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-2 cursor-pointer hover:bg-blue-200" onClick={(e) => { setProblemTopic("binary search"); setProblemLevel("for beginners"); if (e.currentTarget.textContent) setIdea(e.currentTarget.textContent) }}>My friend loves binary search. Make a problem about it.</button>
                        <button className="z-10 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-2 cursor-pointer hover:bg-blue-200" onClick={(e) => { setProblemTopic("arrays"); setProblemLevel("for beginners"); if (e.currentTarget.textContent) setIdea(e.currentTarget.textContent) }}>Generate a problem involving the president and arrays.</button>
                    </div>
                </div >
                <div className="w-full justify-center flex ">
                    <div className="w-[80%] lg:w-[60%] aspect-video relative">
                        <Image src={example} fill alt="example" />
                    </div>
                </div>
            </div >
        </>
    )
}

export default UserPrompt