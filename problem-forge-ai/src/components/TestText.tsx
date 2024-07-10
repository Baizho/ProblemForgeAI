'use client'

import React, { useState } from 'react'

type Props = {
    name: string,
    content: string,

}

const TestText = (props: Props) => {
    const { name, content } = props;
    const [showTest, setShowTest] = useState(false);

    const toggleShowTest = () => {
        setShowTest(!showTest);
    };
    // console.log(file.toString());

    return (
        <div className="border border-gray-300 rounded-lg bg-white  p-4 shadow-md">
            <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                <span className="font-semibold text-gray-700">{name}</span>
                <button onClick={toggleShowTest} className="bg-blue-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700">Show Test</button>
            </div>
            {/* <div className="flex justify-between items-center">
                <span className="font-bold">{name}</span>
                <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                    onClick={toggleShowTest}
                >
                    {showTest ? 'Hide Test' : 'Show Test'}
                </button>
            </div> */}
            {showTest && (
                <div className="mt-4 bg-gray-200 p-2 rounded-md overflow-auto max-h-64">
                    <pre className="whitespace-pre-wrap">{content}</pre>
                </div>
            )}
        </div>
    );
};

export default TestText;