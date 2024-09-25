import React, { useState, useContext, useEffect } from 'react'
import CodeGenerationThemeContext from './CodeGenerationThemeContext';

const CodeGenerationSidebar = () => {


    const { storedData, setSelectedIndex, removePrompt } = useContext(CodeGenerationThemeContext);


    return (
        <div className='w-full'>
            <div className='flex justify-between'>
                <h className='block text-sm mb-1 font-medium'>Prompts :</h>
                <button
                    onClick={removePrompt}
                >
                    <p className='px-6 py-1 mb bg-[#1f4e96] block text-sm text-white rounded-md truncate' >Clear Prompts</p>
                </button>
            </div>
            <div className=' flex flex-col mt-6' style={{ overflowY: 'auto', height: '700px' }}>
                {[...storedData].reverse().map((item, i) => (
                    <button onClick={() => setSelectedIndex(storedData.length - i - 1)}>
                        <p className='px-6 py-2 mb-2 bg-[#1f4e96] text-white rounded-md truncate' >{item.prompt}</p>
                    </button>
                ))}
            </div>

        </div>
    )
}

export default CodeGenerationSidebar;