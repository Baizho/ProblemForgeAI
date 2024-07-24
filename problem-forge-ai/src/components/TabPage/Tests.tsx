import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react'
import TestText from '../TestText'


type Props = {
    testFiles: string[],
    setTestFiles: Dispatch<SetStateAction<string[]>>,
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



const Tests = ({ testFiles, setTestFiles, handleTests, countTests, setCountTests, testLoading }: Props) => {

    const [showTextarea, setShowTextarea] = useState(false);
    const [testText, setTestText] = useState('');
    const [fileContent, setFileContent] = useState('');

    const handleButtonClick = () => {
        setShowTextarea(!showTextarea);
    };

    const handleTextareaChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTestText(e.target.value);
    };

    const handleTextareaSubmit = () => {
        setTestFiles([...testFiles, testText]);
        setTestText('');
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const tests: string[] = [];
        const files = Array.from(e.target.files || []);

        const readFile = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                if (file && file.type === 'text/plain') {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        if (event.target && typeof event.target.result === 'string') {
                            resolve(event.target.result);
                        } else {
                            reject('File read error');
                        }
                    };
                    reader.onerror = () => {
                        reject('File read error');
                    };
                    reader.readAsText(file);
                } else {
                    reject('Invalid file type');
                }
            });
        };

        try {
            for (const file of files) {
                const fileContent = await readFile(file);
                tests.push(fileContent);
            }
            setTestFiles([...testFiles, ...tests]);
            // console.log(tests);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className='max-h-[500px]'>

            <div className="flex justify-center mb-4">
                <form className="flex items-center justify-between w-full" onSubmit={(e) => { handleTests(e) }}>
                    <div className='flex items-center gap-x-2 '>
                        <label htmlFor="number-of-tests" className="block text-gray-700 text-md font-bold">Number of tests:</label>
                        <input value={countTests} onChange={((e) => { const num = parseInt(e.target.value); { setCountTests(num) } })} type="number" id="number-of-tests" className="font-mono shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" placeholder="10" min="5" max="99" />
                    </div>
                    <button type="submit" className=" font-raleway bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700">Generate Tests</button>
                </form>
            </div>
            <div className="py-4">
                <button
                    onClick={handleButtonClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-32"
                >
                    Add Test
                </button>
                {showTextarea && (
                    <div className="mt-4">
                        <textarea
                            value={testText}
                            onChange={handleTextareaChange}
                            placeholder="Write your test here..."
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <button
                            onClick={handleTextareaSubmit}
                            className="mt-2 bg-green-500 text-white px-4 py-2 w-32 rounded-md hover:bg-green-600"
                        >
                            Submit Test
                        </button>
                        <div className="mt-2">
                            <label className="block mb-2 text-gray-700">
                                Or upload .txt files:
                            </label>
                            <input
                                type="file"
                                accept=".txt"
                                onChange={(e) => { handleFileUpload(e) }}
                                className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
                                multiple
                            />
                            {fileContent && (
                                <div className="mt-2 p-2 border border-gray-300 rounded-md bg-gray-50">
                                    <p className="text-gray-700">File Content:</p>
                                    <pre className="whitespace-pre-wrap">{fileContent}</pre>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {testLoading && (
                <div className="text-center font-mono">Tests are loading...</div>
            )}
            <div className="mt-2 overflow-y-auto min-h-[400px] max-h-[100%]">
                {testFiles.map((file, index) => {
                    // console.log(file.key);
                    return (
                        <TestText key={index} content={file.length > 500 ? file.substring(0, 50) + '...' : file} name={`test_${formatNumber(index + 1, countTests.toString().length)}`} />
                    )
                })}
            </div>

        </div>
    )
}

export default Tests