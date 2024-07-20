import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    user: string,
    setUser: Dispatch<SetStateAction<string>>,
    apiKey: string,
    setApiKey: Dispatch<SetStateAction<string>>,
    secret: string,
    setSecret: Dispatch<SetStateAction<string>>,
}

const Users = ({ user, setUser, apiKey, setApiKey, secret, setSecret }: Props) => {
    return (
        <>
            {/* <label htmlFor="user" className="font-semibold text-md">Share access to user:</label>
            <input value={user} onChange={(e) => { setUser(e.target.value) }} className="text-md px-[1.5px] border-[1px] border-gray-600 rounded-[2px] w-2/5 font-mono resize-none"></input> */}
            <div className='grid grid-cols-1 lg:grid-cols-2 w-full'>
                <div className='flex flex-col w-full font-raleway text-lg'>
                    Using Polygon API requires authorization. To authorize, you will need an API key, which can be generated on settings page
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="apiKey" className="font-semibold text-md w-full">User Api key</label>
                    <input value={apiKey} onChange={(e) => { setApiKey(e.target.value) }} className="text-md px-[1.5px] border-[1px] border-gray-600 rounded-[2px] w-full font-mono resize-none"></input>
                    <label htmlFor="secret" className="font-semibold text-md">User Secret</label>
                    <input value={secret} onChange={(e) => { setSecret(e.target.value) }} className="text-md px-[1.5px] border-[1px] border-gray-600 rounded-[2px] w-full font-mono resize-none"></input>
                </div>
            </div>
        </>
    )
}

export default Users