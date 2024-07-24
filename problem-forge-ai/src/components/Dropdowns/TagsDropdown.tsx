'use client'

import Link from 'next/link'
import React, { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { BiReset } from 'react-icons/bi';

type Props = {
    selectedTags: string[],
    setSelectedTags: Dispatch<SetStateAction<string[]>>,
    isTagsDropdownOpen: boolean,
    setIsTagsDropdownOpen: Dispatch<SetStateAction<boolean>>,
}

const TagsDropdown = ({ selectedTags, setSelectedTags, isTagsDropdownOpen, setIsTagsDropdownOpen }: Props) => {
    const [filter, setFilter] = useState('');
    const [visibleCount, setVisibleCount] = useState(10);

    const allTags = [
        'Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math',
        'Sorting', 'Greedy', 'Depth-First Search', 'Database', 'Binary Search',
        'Tree', 'Breadth-First Search', 'Matrix', 'Graph', 'Linked List',
        'Stack', 'Queue', 'Heap', 'Recursion', 'Backtracking', 'Bit Manipulation',
        'Trie', 'Segment Tree', 'Binary Indexed Tree', 'Sliding Window', 'Two Pointers',
        'Union Find', 'Topological Sort', 'Greedy Algorithm', 'Graph Theory', 'Algebra',
        'Calculus', 'Statistics', 'Probability', 'Optimization', 'Game Theory', 'Cryptography'
    ];

    const toggleDropdown = () => {
        setIsTagsDropdownOpen(!isTagsDropdownOpen);
    };

    const handleTagClick = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const filteredTags = allTags.filter(tag =>
        tag.toLowerCase().includes(filter.toLowerCase())
    );

    const visibleTags = filteredTags.slice(0, visibleCount);

    const handleExpand = () => {
        setVisibleCount(prevCount => prevCount + 10);
    };
    return (
        <>
            <div className="relative inline-block w-full xl:w-1/4 md:w-1/2 pl-2 mb-4 font-raleway z-50">
                <label htmlFor="problemTopic" className="font-semibold font-raleway">Problem Topic</label>
                <div className='mb-2 text-sm'>List integrated topics</div>
                <div className="flex items-center px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={toggleDropdown}>
                    {selectedTags.length === 0 ? (
                        <span className="flex-1">Tags</span>
                    ) : (
                        <div className="flex flex-wrap w-full overflow-auto max-h-24">
                            {selectedTags.map((tag) => (
                                <div key={tag} className="bg-gray-200 text-gray-700 rounded px-2 py-1 m-1 text-xs">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    )}
                    <span className="ml-2">{selectedTags.length}</span>
                </div>
                <AnimatePresence>
                    {isTagsDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="absolute top-full mt-2 w-full bg-white border rounded shadow-lg z-50 overflow-hidden"
                        >
                            <input
                                type="text"
                                className="w-full p-2 border-b focus:outline-none bg-white"
                                placeholder="Filter topics"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                            <div className="p-2 overflow-y-auto">
                                <div className="flex flex-wrap">
                                    {visibleTags.map((tag) => (
                                        <div
                                            key={tag}
                                            className={`m-1 px-2 py-1 rounded cursor-pointer ${selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                                }`}
                                            onClick={() => handleTagClick(tag)}
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                                {filteredTags.length > visibleCount && (
                                    <div className="text-center">
                                        <button
                                            type="button"
                                            className="mt-2 text-blue-500"
                                            onClick={handleExpand}
                                        >
                                            Expand
                                        </button>
                                    </div>
                                )}
                                <div className="flex justify-end mt-2">
                                    <button type="button" className="flex items-center text-blue-500" onClick={() => setSelectedTags([])}>
                                        <BiReset className="mr-1" />
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}

export default TagsDropdown;