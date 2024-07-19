import SlideFilterBy from "@/components/FilterBy";
import { Carrosel } from "@/components/carrosel";

const Restaurants = () => {
  return (
    <main className='w-full flex justify-center items-center flex-col h-[80vh]'>
    <h1 className="mb-8 text-3xl font-bold text-center">FALE CONOSCO</h1>
    <form className="w-[300px]">
      <div className="mb-4 w-[300px]">
        <label className="block mb-2 text-sm font-bold text-gray-700">E-mail</label>
        <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="E-mail" />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">Assunto</label>
        <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="assunto" type="text" placeholder="Assunto" />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-bold text-gray-700">Mensagem</label>
        <textarea className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="mensagem" placeholder="Digite sua mensagem"></textarea>
      </div>
      <div className="flex items-center justify-between">
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
          Enviar
        </button>
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="reset">
          Redefinir
        </button>
      </div>
    </form>
    </main>
  )
}

export default Restaurants
