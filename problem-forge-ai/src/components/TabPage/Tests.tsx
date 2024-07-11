import React, { Dispatch, FormEvent, SetStateAction } from 'react'
import TestText from '../TestText'

interface fileProp {
    key: string,
    content: string,
}


type Props = {
    testFiles: fileProp[],
    handleTests: (e: FormEvent<HTMLFormElement>) => {},
    countTests: number,
    setCountTests: Dispatch<SetStateAction<number>>,
    testLoading: boolean,
}

const formatNumber = (number: number, length: number) => {
    const curLength = number.toString().length;
    if (curLength > length) return number;
    return '0'.repeat(length - curLength) + number.toString()
}

const Tests = ({ testFiles, handleTests, countTests, setCountTests, testLoading }: Props) => {
    return (
        <>
            {/* <form className="flex w-full justify-between mt-4" >
                <div>
                    <label className="pr-2">Number of tests (minimum 5, maximum 99):</label>
                    <input className="w-32" type="number" min={5} max={99} value={countTests} onChange={((e) => { const num = parseInt(e.target.value); { setCountTests(num) } })}></input>
                </div>
                <button type="submit" className="px-8 bg-gray-200 border-[1px] border-gray-600 text-md">Generate Tests</button>
            </form> */}
            <div className="flex items-center  mb-4">
                <form className="flex items-center justify-between w-full" onSubmit={(e) => { handleTests(e) }}>
                    <div className='flex items-center gap-x-2 '>
                        <label htmlFor="number-of-tests" className="block text-gray-700 text-lg font-bold">Number of tests:</label>
                        <input value={countTests} onChange={((e) => { const num = parseInt(e.target.value); { setCountTests(num) } })} type="number" id="number-of-tests" className="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" placeholder="10" min="5" max="99" />
                    </div>
                    <button type="submit" className=" bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700">Generate Tests</button>
                </form>
            </div>
            {testLoading && (
                <div className="text-center">Tests are loading...</div>
            )}
            <div className="mt-2 overflow-y-auto max-h-[500px]">
                {testFiles.map((file, index) => {
                    console.log(file.key);
                    return (
                        <TestText key={index} content={file.content} name={`test_${formatNumber(index + 1, countTests.toString().length)}`} />
                    )
                })}
            </div>

        </>
    )
}

export default Tests