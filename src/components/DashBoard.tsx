import React from 'react'
import type { Organization } from '../types/interfaces';

const DashBoard = ({name,logo,lastLogin,description,membersCount,owner,_id} : Organization) => {
    
    
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-white">
                Welcome to {name}
            </h1>

            <p className="mt-2 text-zinc-400">
                {description}
            </p>
        </div>
    )
}

export default DashBoard