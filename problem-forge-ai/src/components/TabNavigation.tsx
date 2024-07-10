import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    tab: "Statement" | "Constraints" | "Tests" | "Users" | "Solution",
    setTab: Dispatch<SetStateAction<"Statement" | "Constraints" | "Tests" | "Users" | "Solution">>,
}

const TabNavigation = ({ tab, setTab }: Props) => {
    return (
        <div className="flex border-b border-gray-200 h-[40px]">
            {/* <!-- Statement Tab --> */}
            <button onClick={(e) => { setTab("Statement") }} className="flex items-center space-x-2 py-2 px-4 border-b-2 border-transparent hover:border-blue-500 text-gray-600 hover:text-blue-500 focus:outline-none focus:text-blue-500 focus:border-blue-500">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m5 3V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16a2 2 0 002 2h8m4-9h2m-6-6h2m-6 6h2m-6 6h2"></path>
                </svg>
                <span>Statement</span>
            </button>
            {/* <!-- Constraints Tab --> */}
            <button onClick={(e) => { setTab("Constraints") }} className="flex items-center space-x-2 py-2 px-4 border-b-2 border-transparent hover:border-blue-500 text-gray-600 hover:text-blue-500 focus:outline-none focus:text-blue-500 focus:border-blue-500">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4H8v4H7a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v7h1m-5 4h-1v1m4-1h1v1m0-11h1v1m-9-1H7v1m10-1h1v1m0-1h1v1"></path>
                </svg>
                <span>Constraints</span>
            </button>
            {/* <!-- Tests Tab --> */}
            <button onClick={(e) => { setTab("Tests") }} className="flex items-center space-x-2 py-2 px-4 border-b-2 border-transparent hover:border-blue-500 text-gray-600 hover:text-blue-500 focus:outline-none focus:text-blue-500 focus:border-blue-500">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
                <span>Tests</span>
            </button>
            {/* <!-- Solution Tab --> */}
            <button onClick={(e) => { setTab("Solution") }} className="flex items-center space-x-2 py-2 px-4 border-b-2 border-transparent hover:border-blue-500 text-gray-600 hover:text-blue-500 focus:outline-none focus:text-blue-500 focus:border-blue-500">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Solution</span>
            </button>
            {/* <!-- Users Tab --> */}
            <button onClick={(e) => { setTab("Users") }} className="flex items-center space-x-2 py-2 px-4 border-b-2 border-transparent hover:border-blue-500 text-gray-600 hover:text-blue-500 focus:outline-none focus:text-blue-500 focus:border-blue-500">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 19.879A3 3 0 107 15a3 3 0 00-1.879 5.121zM13 8a3 3 0 100-6 3 3 0 000 6zm6 5a3 3 0 100-6 3 3 0 000 6zm-7 1h1v2a3 3 0 11-2 0v-2h1zm-6 0h1v2a3 3 0 11-2 0v-2h1zm12 2a3 3 0 10-2 0v-2h1v2h1z"></path>
                </svg>
                <span>Users</span>
            </button>
        </div>
    )
}

export default TabNavigation