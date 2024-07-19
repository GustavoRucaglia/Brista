import { ReactNode } from 'react'
import { ContactForm } from './contactForm'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'


interface Props {
  trigger: ReactNode
}

export function ModalContactForm(props: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild={true}>{props.trigger}</DialogTrigger>
      <DialogContent className="w-full lg:w-[400px]">
        <ContactForm />
      </DialogContent>
    </Dialog>
  )
}