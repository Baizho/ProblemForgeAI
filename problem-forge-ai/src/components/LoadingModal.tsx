'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import step0 from "@/../public/tests.png";
import step1 from "@/../public/step1.png";
import step2 from "@/../public/step2.png";
import step3 from "@/../public/step3.png";
import step4 from "@/../public/step4.png";
import step5 from "@/../public/step5.png";

type Props = {
    isLoading: boolean,
    isProcessComplete: boolean,
    onClose: () => void,
}

const steps = [
    { title: "Manually adding the tests (if needed)", description: "Download them by clicking the button and go to polygon!", src: step0 },
    { title: "Go to Polygon and grant access to Codeforces", description: "Grant codeforces access to your problem", src: step1 },
    { title: "Acquire the problem link in polygon", description: "At the bottom right, copy the link", src: step2 },
    { title: "Navigating to Codeforces Gym", description: "Create a new Mashup to add your problem to codeforces!", src: step3 },
    { title: "Adding the problem", description: "Place the link and create your contest!", src: step4 },
    { title: "Success!", description: "Your problem is integrated in codeforces. Good luck!", src: step5 }
];

const LoadingModal = ({ isLoading, isProcessComplete, onClose }: Props) => {
    const [currentStep, setCurrentStep] = useState(0);

    const goToNextStep = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    };

    const goToPrevStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    };
    useEffect(() => {
        setCurrentStep(0);
        if (isLoading) {
            const interval = setInterval(() => {
                setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
            }, 5000); // Change step every 5 seconds

            return () => clearInterval(interval);
        }
    }, [isLoading]);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full lg:max-w-[80%] flex flex-col items-center justify-between h-[99%]">
                <div className='w-full flex flex-col items-center h-full'>
                    <div className='w-full flex flex-col items-center'>
                        {isProcessComplete ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4 font-raleway">Your problem has been created in Polygon</h2>
                                <div className="text-green-500 text-center text-5xl mb-4">✓</div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold mb-4 font-raleway"> Creating your problem to Polygon</h2>
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            </>
                        )}

                        <div className="mb-4 flex flex-col lg:flex-row lg:space-x-4">
                            <div>
                                <h3 className="text-xl font-semibold mb-2 font-raleway text-red-500">Follow these steps!</h3>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 font-raleway text-blue-500">{steps[currentStep].title}</h3>
                                <p className=' font-raleway'>{steps[currentStep].description}</p>
                            </div>
                        </div>

                        <div className="flex justify-center space-x-2 mb-4">
                            {steps.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 w-2 rounded-full ${index === currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4 w-[100%] md:w-[90%] xl:w-[85%] 2xl:w-[60%] aspect-video ">
                        <div className='relative w-full h-full border-[1px]'>
                            <Image
                                src={steps[currentStep].src}
                                alt={`Step ${currentStep + 1}`}
                                fill
                            />
                        </div>
                    </div>
                    <div className="flex w-full justify-center space-x-2 mb-4  ">
                        <button
                            onClick={goToPrevStep}
                            disabled={currentStep === 0}
                            className={`py-2 px-4 text-xs rounded font-bold  font-raleway ${currentStep === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-700 text-white'
                                }`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={goToNextStep}
                            disabled={currentStep === steps.length - 1}
                            className={`py-2 px-4 text-xs rounded font-bold  font-raleway ${currentStep === steps.length - 1
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-700 text-white'
                                }`}
                        >
                            Next
                        </button>
                    </div>

                </div>

                <div className='flex w-full'>
                    <button
                        onClick={onClose}
                        disabled={!isProcessComplete}
                        className={`text-sm lg:text-base w-[85%] py-2 px-4 rounded font-bold font-raleway ${isProcessComplete
                            ? 'bg-blue-500 hover:bg-blue-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        Did you finish the steps to add your problem?
                    </button>
                    <button
                        onClick={onClose}
                        className={`w-[25   %] py-2 px-4 text-sm lg:text-base rounded text-white font-bold font-raleway bg-red-500`}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};


export default LoadingModal;