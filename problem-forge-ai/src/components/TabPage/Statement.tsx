import React, { Dispatch, SetStateAction } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

type Props = {
    title: string,
    setTitle: Dispatch<SetStateAction<string>>,
    statement: string,
    setStatement: Dispatch<SetStateAction<string>>,
    input: string,
    setInput: Dispatch<SetStateAction<string>>,
    output: string,
    setOutput: Dispatch<SetStateAction<string>>,
    testInput: string,
    setTestInput: Dispatch<SetStateAction<string>>,
    testOutput: string,
    setTestOutput: Dispatch<SetStateAction<string>>,
    notes: string,
    setNotes: Dispatch<SetStateAction<string>>,
}

const Statement = ({ title, setTitle, statement, setStatement, input, setInput, output, setOutput, testInput, setTestInput, testOutput, setTestOutput, notes, setNotes }: Props) => {
    return (
        <>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full mt-[20px]">
                <div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input value={title} onChange={(e) => { setTitle(e.target.value) }}
                            type="text"
                            id="name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter problem name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="statement">
                            Statement
                        </label>
                        <TextareaAutosize value={statement} onChange={(e) => { setStatement(e.target.value) }}
                            id="statement"
                            className="text-md font-mono shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[125px]"
                            placeholder="Enter problem statement"
                        ></TextareaAutosize>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="input">
                            Input
                        </label>
                        <TextareaAutosize value={input} onChange={(e) => { setInput(e.target.value) }}
                            id="input"
                            className="text-md font-mono shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[90px]"
                            placeholder="Enter input details"
                        ></TextareaAutosize>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="output">
                            Output
                        </label>
                        <TextareaAutosize value={output} onChange={(e) => { setOutput(e.target.value) }}
                            id="output"
                            className="text-md font-mono shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[90px]"
                            placeholder="Enter output details"
                        ></TextareaAutosize>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="output">
                            Sample Input
                        </label>
                        <TextareaAutosize value={testInput} onChange={(e) => { setTestInput(e.target.value) }}
                            id="testInput"
                            className="text-md font-mono shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[70px]"
                            placeholder=""
                        ></TextareaAutosize>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="output">
                            Sample Output
                        </label>
                        <TextareaAutosize value={testOutput} onChange={(e) => { setTestOutput(e.target.value) }}
                            id="testOutput"
                            className="text-md font-mono shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[60px]"
                            placeholder=""
                        ></TextareaAutosize>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                            Notes
                        </label>
                        <TextareaAutosize value={notes} onChange={(e) => { setNotes(e.target.value) }}
                            id="notes"
                            className="text-md font-mono shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[100px]"
                            placeholder="Enter additional notes"
                        ></TextareaAutosize>
                    </div>
                </div>
            </div>

            {/* <label htmlFor="title" className="font-semibold text-md">Name:</label>
            <input value={title} onChange={(e) => { setTitle(e.target.value) }} className="text-md px-[1.5px] border-[1px] border-gray-600 rounded-[2px] w-2/5 font-mono resize-none"></input>
            <label htmlFor="statement" className="font-semibold text-md mt-2">Statement</label>
            <TextareaAutosize value={statement} onChange={(e) => { setStatement(e.target.value) }} className="resize-none overflow-hidden text-md px-[1.5px] border-[1px] border-gray-600 rounded-[2px] min-h-[150px] font-mono" ></TextareaAutosize>
            <label htmlFor="input" className="font-semibold text-md mt-2">Input</label>
            <TextareaAutosize value={input} onChange={(e) => { setInput(e.target.value) }} className="resize-none overflow-hidden text-md px-[1.5px] border-[1px] border-gray-600 rounded-[2px] min-h-[100px] font-mono" ></TextareaAutosize>
            <label htmlFor="output" className="font-semibold text-md mt-2">Output</label>
            <TextareaAutosize value={output} onChange={(e) => { setOutput(e.target.value) }} className="resize-none overflow-hidden text-md px-[1.5px] border-[1px] border-gray-600 rounded-[2px] min-h-[100px] font-mono" ></TextareaAutosize>
            <label htmlFor="notes" className="font-semibold text-md mt-2">Notes</label>
            <TextareaAutosize value={notes} onChange={(e) => { setNotes(e.target.value) }} className="resize-none overflow-hidden text-md px-[1.5px] border-[1px] border-gray-600 rounded-[2px] min-h-[100px] font-mono" ></TextareaAutosize> */}

        </>
    )
}

export default Statement