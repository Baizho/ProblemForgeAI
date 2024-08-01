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
        { value: "python3", label: "Python" },
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
        <div className="bg-gray-800 text-white p-4 w-full">
            <div className="flex flex-col items-center space-y-4 xl:flex-row xl:justify-between xl:space-y-0 xl:space-x-4">
                <div className="flex flex-col items-center w-full md:w-auto md:flex-row md:space-x-4">
                    <Select
                        className="w-full md:w-48 lg:w-28"
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
                        className="w-full md:w-48 lg:w-28 text-sm"
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
                </div>
                <div className="flex flex-col items-center w-full md:w-auto md:flex-row md:space-x-4">
                    <div className="flex items-center w-full md:w-auto space-x-2">
                        <label className="mr-2">Font Size</label>
                        <input
                            type="range"
                            min="10"
                            max="30"
                            value={fontSize}
                            step="2"
                            onChange={handleFontSizeChange}
                            className="w-full md:w-auto"
                        />
                    </div>
                    <button
                        className="bg-gray-300 text-black px-4 py-2 border border-gray-600 text-sm rounded hover:bg-gray-700"
                        onClick={generateSolution}
                    >
                        Generate Solution
                    </button>
                </div>
            </div>
        </div>


    );
};

export default Navbar;
