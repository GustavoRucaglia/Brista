import Header from "@/components/admin/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
    <Header />
      <main className="bg-muted/40">{children}</main>
    </>
  )
}
