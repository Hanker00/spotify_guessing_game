import React from 'react'

function InstructionCard({number, title, description}) {
  return (
    <div>
    <h1 className='text-5xl text-center'>{number}</h1>
    <h1 className='text-3xl text-[#16FF4A] text-center tracking-widest mb-3'>{title}</h1>
    <div className='bg-[#1E1E1E] rounded-xl shadow-lg'>
   
    <div className="max-w-[600px] h-80 rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4 text-3xl">
            <p className='text-left'>
            {description}
            </p>
        </div>
    </div>
    </div>
    </div>
  )
}

export default InstructionCard