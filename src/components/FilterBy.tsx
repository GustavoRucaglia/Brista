import React from 'react'

const SlideFilterBy = () => {
  return (
    <div>
        <span className='text-lg font-semibold mr-5'>Ordenar por: </span>
        <select className='w-[180px] h-10 border-2 rounded-lg px-4 text-[#A6A6A6]'>
            <option value="All">Recentes</option>
            <option value="Completed">Recomendados</option>
            <option value="Uncompleted">Avaliações</option>
        </select>
    </div>
  )
}

export default SlideFilterBy