import SlideFilterBy from "@/components/FilterBy";
import { Carrosel } from "@/components/carrosel";

const Restaurants = () => {
  return (
    <main className='w-full flex justify-center items-center flex-col max-w-[1200px] h-[80vh]'>
      <div className=" max-w-[1200px] w-[50vw] flex items-start justify-start flex-col gap-14">
        <SlideFilterBy />
        <Carrosel />
      </div>
    </main>
  )
}

export default Restaurants
