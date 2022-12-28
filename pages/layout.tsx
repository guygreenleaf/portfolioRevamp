import Head from "next/head"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <Head key={"layout"}>
        {children}
      </Head>
      <body>
        {children}
      </body>
    </html>
  )
}
