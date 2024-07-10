import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    user: string,
    setUser: Dispatch<SetStateAction<string>>
}

const Users = ({ user, setUser }: Props) => {
    return (
        <>
            <label htmlFor="user" className="font-semibold text-md">Share access to user:</label>
            <input value={user} onChange={(e) => { setUser(e.target.value) }} className="text-md px-[1.5px] border-[1px] border-gray-600 rounded-[2px] w-2/5 font-mono resize-none"></input>
        </>
    )
}

export default Users