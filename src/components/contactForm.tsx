'use client'

import { Button } from './ui/button'
import { Input } from './ui/input'


export function ContactForm() {

  return (
      <form>
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center">
          <h2 className="mb-[32px] text-4xl font-medium">FALE CONOSCO</h2>
          <div className="mb-4 flex w-full gap-4">
  
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-4">
                  <Input
                    type="email"
                    className="w-full rounded-xl  bg-neutral-50 px-[16px] py-[14px] text-[#888797] border-black border focus:border-slate-500"
                    placeholder="Email"
                  />
                  <Input
                    className="w-full rounded-xl border bg-neutral-50 px-[16px] py-[14px] border-black text-[#888797] focus:border-slate-500"
                    placeholder="Assunto"
                  />
                  <textarea name="mensagem" id="mensagem" className="w-full rounded-md bg-neutral-50 px-[16px] h-20 text-[#888797] focus:border-slate-500 border border-black" placeholder='Digite sua mensagem'>

                  </textarea>

              <Button
                type="submit"
                className="text-md rounded-full bg-[#0056B3] py-[16px] text-white"
              >
                Enviar
              </Button>
            </div>
          </div>
        </div>
      </form>
  )
}