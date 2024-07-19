import Header from "@/components/Header";
import { Footer } from "@/components/footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
    <Header />
      <main>{children}</main>
    <Footer />
    </>
  )
}
