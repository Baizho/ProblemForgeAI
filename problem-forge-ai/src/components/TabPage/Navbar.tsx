// Filename: Navbar.tsx

import React, { Dispatch, SetStateAction } from 'react';
import Select, { SingleValue } from 'react-select';

interface Props {
    userLang: string;
    setUserLang: Dispatch<SetStateAction<string>>;
    userTheme: string;
    setUserTheme: Dispatch<SetStateAction<string>>;
    fontSize: number;
    setFontSize: Dispatch<SetStateAction<number>>;
    generateSolution: () => void;
}

const Navbar: React.FC<Props> = ({ userLang, setUserLang, userTheme, setUserTheme, fontSize, setFontSize, generateSolution }) => {
    const languages: { value: string; label: string }[] = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "py", label: "Python" },
        { value: "java", label: "Java" },
    ];

    const themes: { value: string; label: string }[] = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ];

    const handleLangChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
        if (selectedOption) {
            setUserLang(selectedOption.value);
        }
    };

    const handleThemeChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
        if (selectedOption) {
            setUserTheme(selectedOption.value);
        }
    };

    const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFontSize(Number(e.target.value));
    };

    return (
        <div className="bg-gray-800 text-white p-4 w-full flex flex-col items-center 2xl:flex-row 2xl:justify-between">
            <div className="flex flex-col 2xl:flex-row items-center 2xl:space-x-4">
                <Select
                    className="w-full mb-4 md:mb-0 md:w-48"
                    options={languages}
                    value={languages.find(option => option.value === userLang)}
                    onChange={handleLangChange}
                    placeholder="Select Language"
                    styles={{
                        control: (base) => ({
                            ...base,
                            backgroundColor: '#1f2937',
                            borderColor: '#4b5563',
                            color: 'white',
                        }),
                        menu: (base) => ({
                            ...base,
                            backgroundColor: '#1f2937',
                            color: 'white',
                        }),
                        singleValue: (base) => ({
                            ...base,
                            color: 'white',
                        }),
                    }}
                />
                <Select
                    className="w-full mb-4 md:mb-0 md:w-48"
                    options={themes}
                    value={themes.find(option => option.value === userTheme)}
                    onChange={handleThemeChange}
                    placeholder="Select Theme"
                    styles={{
                        control: (base) => ({
                            ...base,
                            backgroundColor: '#1f2937',
                            borderColor: '#4b5563',
                            color: 'white',
                        }),
                        menu: (base) => ({
                            ...base,
                            backgroundColor: '#1f2937',
                            color: 'white',
                        }),
                        singleValue: (base) => ({
                            ...base,
                            color: 'white',
                        }),
                    }}
                />
                <div className="flex items-center space-x-2">
                    <label className="mr-2">Font Size</label>
                    <input
                        type="range"
                        min="18"
                        max="30"
                        value={fontSize}
                        step="2"
                        onChange={handleFontSizeChange}
                        className="w-full md:w-auto"
                    />
                </div>

                <button
                    className="bg-gray-300 text-black px-8 py-2 my-2  border border-gray-600 text-md rounded hover:bg-gray-700"
                    onClick={generateSolution}
                >
                    Generate Solution
                </button>
            </div>
        </div>
    );
};

export default Navbar;
