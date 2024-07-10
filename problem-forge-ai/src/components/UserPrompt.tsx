import React, { Dispatch, FormEvent, SetStateAction } from 'react'

type Props = {
    idea: string,
    setIdea: Dispatch<SetStateAction<string>>,
    handleSubmit: (e: FormEvent<HTMLFormElement>) => {}
}

const UserPrompt = ({ idea, setIdea, handleSubmit }: Props) => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* <!-- Hook --> */}
            <div className="text-center my-8">
                <h1 className="text-4xl font-bold text-gray-800">Ignite the Competitive Spirit <br></br> Generate Coding Problems with AI  </h1>
                <p className="mt-4 text-gray-600">Use our AI to turn your creative prompts into real challenges for the programming community</p>
            </div>

            {/* <!-- Idea Prompt Input Field --> */}

            <form className="text-center mb-8" onSubmit={(e) => handleSubmit(e)}>
                <div className="flex justify-center items-center space-x-2">
                    <input value={idea} onChange={(e) => { setIdea(e.target.value) }} type="text" placeholder="Enter your idea prompt..." className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">Generate</button>
                </div>
            </form>

            {/* <!-- Suggestions --> */}
            <div className="text-center">
                <p className="text-gray-500 mb-4">Examples:</p>
                <div className="flex flex-row justify-center gap-x-3 gap-y-2 items-center">
                    <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition" onClick={(e) => { if (e.currentTarget.textContent) setIdea(e.currentTarget.textContent) }}>Create a simple and fun story about adding numbers.</button>
                    <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition" onClick={(e) => { if (e.currentTarget.textContent) setIdea(e.currentTarget.textContent) }}>My friend loves binary search. Make a problem about it.</button>
                    <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition" onClick={(e) => { if (e.currentTarget.textContent) setIdea(e.currentTarget.textContent) }}>Generate a problem involving the president and arrays.</button>
                </div>
            </div>
        </div>
    )
}

export default UserPrompt