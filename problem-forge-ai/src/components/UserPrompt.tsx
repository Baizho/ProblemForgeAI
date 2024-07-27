import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import GridPattern from './magicui/animated-grid-pattern';
import TextareaAutosize from 'react-textarea-autosize';
import { BiReset } from 'react-icons/bi';
import TagsDropdown from './Dropdowns/TagsDropdown';
import DifficultyDropdown from './Dropdowns/DifficultyDropdown';
import LanguageDropdown from './Dropdowns/LanguageDropdown';

interface Difficulty {
    label: string;
    color: string;
}

interface Language {
    label: string;
    value: string;
}

type Props = {
    idea: string;
    setIdea: Dispatch<SetStateAction<string>>;
    language: Language;
    setLanguage: Dispatch<SetStateAction<Language>>;
    selectedTags: string[];
    setSelectedTags: Dispatch<SetStateAction<string[]>>;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    selectedDifficulty: Difficulty | null;
    setSelectedDifficulty: Dispatch<SetStateAction<Difficulty | null>>;
};

const UserPrompt: React.FC<Props> = ({
    idea,
    setIdea,
    language,
    setLanguage,
    selectedTags,
    setSelectedTags,
    selectedDifficulty,
    setSelectedDifficulty,
    handleSubmit
}) => {
    const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);
    const [isDifficultyDropdownOpen, setIsDifficultyDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

    return (
        <div className="z-10 flex flex-col items-center min-h-screen py-12 bg-gray-100">
            <GridPattern />

            <h1 className="z-10 text-xl lg:text-3xl xl:text-5xl font-raleway font-bold text-gray-900 mb-6 text-center">
                Future of Coding Contests<br /> Create, Generate, Compete
            </h1>
            <h2 className="z-10 text-lg lg:text-xl xl:text-3xl font-raleway font-semibold text-gray-700 mb-8 text-center">
                Create custom coding problems with AI
            </h2>
            <p className="z-10 text-gray-600 text-xs lg:text-sm xl:text-lg text-center mb-6 font-raleway px-2">
                Describe your problem idea and watch as our AI transforms it into a competitive programming problem.
            </p>

            <form className="z-20 flex flex-col items-center w-full h-full" onSubmit={handleSubmit}>
                <div className="w-full flex justify-center">
                    <div className="flex flex-wrap w-[95%]">
                        <LanguageDropdown
                            selectedLanguage={language}
                            setSelectedLanguage={setLanguage}
                            isLanguageDropdownOpen={isLanguageDropdownOpen}
                            setIsLanguageDropdownOpen={setIsLanguageDropdownOpen}
                        />

                        <div className="w-full xl:w-1/4 md:w-1/2 pl-2 mb-4 font-raleway">
                            <label htmlFor="problemIdea" className="font-semibold font-raleway">
                                Problem Idea
                            </label>
                            <div className="mb-2 text-sm">Create your own story</div>
                            <TextareaAutosize
                                id="idea"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Create a simple and fun story about adding numbers"
                                value={idea}
                                onChange={(e) => setIdea(e.target.value)}
                            />
                        </div>

                        <TagsDropdown
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                            isTagsDropdownOpen={isTagsDropdownOpen}
                            setIsTagsDropdownOpen={setIsTagsDropdownOpen}
                        />

                        <DifficultyDropdown
                            selectedDifficulty={selectedDifficulty}
                            setSelectedDifficulty={setSelectedDifficulty}
                            isDifficultyDropdownOpen={isDifficultyDropdownOpen}
                            setIsDifficultyDropdownOpen={setIsDifficultyDropdownOpen}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="z-10 w-[95%] md:w-[400px] px-8 py-2 bg-blue-500 text-white font-raleway font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                >
                    Generate
                </button>
            </form>

            <div className="z-10 mt-8 text-center font-raleway">
                <h3 className="z-10 text-lg font-raleway font-semibold text-gray-700 mb-4">Examples:</h3>
                <div className="z-10 flex flex-wrap justify-center space-x-2">
                    <button
                        className="z-10 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-2 cursor-pointer hover:bg-blue-200"
                        onClick={(e) => {
                            const content = e.currentTarget.textContent;
                            setSelectedTags(['Math']);
                            setSelectedDifficulty({ label: 'Easy', color: 'bg-green-200 text-green-700' });
                            if (content) setIdea(content);
                        }}
                    >
                        Create a simple and fun story about adding numbers.
                    </button>
                    <button
                        className="z-10 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-2 cursor-pointer hover:bg-blue-200"
                        onClick={(e) => {
                            const content = e.currentTarget.textContent;
                            setSelectedTags(['Binary Search']);
                            setSelectedDifficulty({ label: 'Medium', color: 'bg-yellow-200 text-yellow-700' });
                            if (content) setIdea(content);
                        }}
                    >
                        My friend loves binary search. Make a problem about it.
                    </button>
                    <button
                        className="z-10 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-2 cursor-pointer hover:bg-blue-200"
                        onClick={(e) => {
                            const content = e.currentTarget.textContent;
                            setSelectedTags(['Array']);
                            setSelectedDifficulty({ label: 'Hard', color: 'bg-red-200 text-red-700' });
                            if (content) setIdea(content);
                        }}
                    >
                        Generate a problem involving the president and arrays.
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserPrompt;
