import React from 'react'

const SlideFilterBy = () => {
  return (
    <div>
        <span className='text-2xl font-semibold mr-5'>filtrar por: </span>
        <select className='w-[180px] h-10 border-2 rounded-3xl px-4 text-[#A6A6A6]'>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Uncompleted">Uncompleted</option>
        </select>
    </div>
  )
}

export default SlideFilterBy