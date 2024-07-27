'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';

type Props = {
    error1: string;
    setError1: Dispatch<SetStateAction<string>>;
    error2: string;
    setError2: Dispatch<SetStateAction<string>>;
    timeLimit: number;
    setTimeLimit: Dispatch<SetStateAction<number>>;
    memoryLimit: number;
    setMemoryLimit: Dispatch<SetStateAction<number>>;
};

const Constraints: React.FC<Props> = ({
    error1,
    setError1,
    error2,
    setError2,
    timeLimit,
    setTimeLimit,
    memoryLimit,
    setMemoryLimit
}) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/* Time Limit */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="time-limit">
                        Time limit:
                    </label>
                    <div className="flex items-center">
                        <input
                            value={timeLimit}
                            onChange={(e) => {
                                // Ensure the input is not empty
                                if (e.currentTarget.value === "") e.currentTarget.value = "0";
                                const num = parseInt(e.currentTarget.value);
                                setTimeLimit(num);

                                // Validate the time limit
                                if (num % 50 !== 0) {
                                    setError1("Time limit must be divisible by 50");
                                } else if (!(250 <= num && num <= 15000)) {
                                    setError1("Time limit must be between 250ms and 15000ms");
                                } else {
                                    setError1("");
                                }
                            }}
                            className="font-mono shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="time-limit"
                            type="text"
                            placeholder="1000"
                        />
                        <span className="ml-2 text-gray-700">ms</span>
                    </div>
                    {error1 && <p className="text-red-600 text-xs italic">{error1}</p>}
                    <p className="text-gray-600 text-xs italic">
                        Time limit per test (between 250 ms and 15000 ms)
                    </p>
                </div>

                {/* Memory Limit */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="memory-limit">
                        Memory limit:
                    </label>
                    <div className="flex items-center">
                        <input
                            value={memoryLimit}
                            onChange={(e) => {
                                // Ensure the input is not empty
                                if (e.currentTarget.value === "") e.currentTarget.value = "0";
                                const num = parseInt(e.currentTarget.value);

                                // Validate the memory limit
                                if (!(4 <= num && num <= 1024)) {
                                    setError2("Invalid Memory Limit set (must be between 4 and 1024)");
                                } else {
                                    setError2("");
                                }
                                setMemoryLimit(num);
                            }}
                            className="font-mono shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="memory-limit"
                            type="text"
                            placeholder="256"
                        />
                        <span className="ml-2 text-gray-700">MB</span>
                    </div>
                    {error2 && <p className="text-red-600 text-xs italic">{error2}</p>}
                    <p className="text-gray-600 text-xs italic">
                        Memory limit (between 4 MB and 1024 MB)
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Constraints;
