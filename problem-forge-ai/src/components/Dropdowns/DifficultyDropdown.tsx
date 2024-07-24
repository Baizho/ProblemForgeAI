import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Difficulty {
    label: string;
    color: string;
}

interface DifficultyDropdownProps {
    selectedDifficulty: Difficulty | null;
    setSelectedDifficulty: (difficulty: Difficulty | null) => void;
    isDifficultyDropdownOpen: boolean;
    setIsDifficultyDropdownOpen: (isOpen: boolean) => void;
}

const DifficultyDropdown: FC<DifficultyDropdownProps> = ({
    selectedDifficulty,
    setSelectedDifficulty,
    isDifficultyDropdownOpen,
    setIsDifficultyDropdownOpen,
}) => {
    const difficulties: Difficulty[] = [
        { label: 'Easy', color: 'bg-green-200 text-green-700' },
        { label: 'Medium', color: 'bg-yellow-200 text-yellow-700' },
        { label: 'Hard', color: 'bg-red-200 text-red-700' },
    ];

    const toggleDropdown = () => {
        setIsDifficultyDropdownOpen(!isDifficultyDropdownOpen);
    };

    const handleDifficultyClick = (difficulty: Difficulty) => {
        setSelectedDifficulty(difficulty);
        setIsDifficultyDropdownOpen(false);
    };

    return (
        <div className="relative inline-block w-full xl:w-1/4 md:w-1/2 pl-2 mb-4 font-raleway z-50">
            <label htmlFor="problemLevel" className="font-semibold font-raleway">Problem Level</label>
            <div className='mb-2 text-sm'>Describe the problems difficulty</div>
            <div className="flex items-center px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={toggleDropdown}>
                <span className="flex-1">{selectedDifficulty ? selectedDifficulty.label : 'Select Difficulty'}</span>
            </div>
            <AnimatePresence>
                {isDifficultyDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full mt-2 w-full bg-white border rounded shadow-lg z-50 overflow-hidden"
                    >
                        <div className="p-2 bg-white overflow-y-auto">
                            <div className="flex flex-col">
                                {difficulties.map((difficulty) => (
                                    <div
                                        key={difficulty.label}
                                        className={`px-4 py-2 rounded cursor-pointer hover:brightness-110 ${difficulty.color}`}
                                        onClick={() => handleDifficultyClick(difficulty)}
                                    >
                                        {difficulty.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DifficultyDropdown;
