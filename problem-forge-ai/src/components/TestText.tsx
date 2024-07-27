'use client'

import React, { useState } from 'react'

type Props = {
    name: string,
    content: string,
    id: number,
    deleteTest: (id: number) => void,

}

const TestText = (props: Props) => {
    const { name, content, id, deleteTest } = props;
    const [showTest, setShowTest] = useState(false);

    const toggleShowTest = () => {
        // console.log(content);
        setShowTest(!showTest);
    };

    return (
        <div className="border border-gray-300 rounded-lg bg-white  p-4 shadow-md">
            <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                <span className="font-semibold text-gray-700 font-mono">{name}</span>
                <div className='flex space-x-2'>
                    <button onClick={toggleShowTest} className="text-sm font-raleway bg-blue-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700">Show Test</button>
                    <button onClick={(e) => { deleteTest(id) }} className="text-sm font-raleway bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-700">Delete Test</button>
                </div>
            </div>
            {showTest && (
                <div className="mt-4 bg-gray-200 p-2 rounded-md overflow-auto max-h-64">
                    <pre className="whitespace-pre-wrap">{content}</pre>
                </div>
            )}
        </div>
    );
};

export default TestText;