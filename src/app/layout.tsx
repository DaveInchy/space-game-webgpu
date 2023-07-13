import "mods@css/main.css";
import { Roboto_Flex } from "next/font/google";

const font = Roboto_Flex({ subsets: ['latin'] })

export const metadata = {
  title: 'Next Web Game',
  description: 'Made by Space Dave',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="app" style={font.style} className={"bg-black"}>
          {children}
        </div>
      </body>
    </html>
  )
}
