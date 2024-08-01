'use client'

import { FC, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Language {
    label: string;
    value: string;
}

interface LanguageDropdownProps {
    selectedLanguage: Language;
    setSelectedLanguage: (language: Language) => void;
    isLanguageDropdownOpen: boolean;
    setIsLanguageDropdownOpen: (isOpen: boolean) => void;
}

const LanguageDropdown: FC<LanguageDropdownProps> = ({
    selectedLanguage,
    setSelectedLanguage,
    isLanguageDropdownOpen,
    setIsLanguageDropdownOpen,
}) => {
    const languages: Language[] = [
        { label: 'English', value: 'english' },
        { label: 'Russian', value: 'russian' },
        { label: "Chinese (Mandarin)", value: "chinese" },
        { label: "Spanish", value: "spanish" },
        { label: "Japanese", value: "japanese" },
        { label: "Korean", value: "korean" },
        { label: "French", value: "french" },
        { label: "German", value: "german" },
        { label: "Italian", value: "italian" },
        { label: "Hindi", value: "hindi" },
        { label: "Swedish", value: "swedish" },
        { label: "Turkish", value: "turkish" },
        { label: "Polish", value: "polish" },
    ];

    const toggleDropdown = () => {
        setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    };

    const handleLanguageClick = (language: Language) => {
        setSelectedLanguage(language);
        setIsLanguageDropdownOpen(false);
    };

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsLanguageDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isLanguageDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isLanguageDropdownOpen]);

    return (
        <div className="relative inline-block w-full xl:w-1/4 md:w-1/2 pl-2 mb-4 font-raleway z-[65] ">
            <label htmlFor="language" className="font-semibold font-raleway">Language</label>
            <div className='mb-2 text-sm'>Choose your language</div>
            <div ref={dropdownRef}>
                <div className="flex items-center px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={toggleDropdown}>
                    <span className="flex-1">{selectedLanguage ? selectedLanguage.label : 'Select Language'}</span>
                </div>
                <AnimatePresence>
                    {isLanguageDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="absolute top-full mt-2 w-full bg-white border rounded shadow-lg z-[65] overflow-hidden max-h-[300px] overflow-y-auto"
                        >
                            <div className="p-2 bg-white overflow-y-auto">
                                <div className="flex flex-col">
                                    {languages.map((language) => (
                                        <div
                                            key={language.value}
                                            className="px-4 py-2 rounded cursor-pointer hover:brightness-110 border-[1px]"
                                            onClick={() => handleLanguageClick(language)}
                                        >
                                            {language.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LanguageDropdown;