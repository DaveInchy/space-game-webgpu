import "mods@css/main.css";
import BackgroundImage from "/textures/background/lowres_stars.jpg";
import { roboto } from "mods@core/config/globals";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const font = roboto;
  return (
    <html lang="en">
      <head>
        <title>ThreeJS Studio</title>
      </head>
      <body>
        <div id="app" style={{...font.style, }} className={"bg-stone-900"}>
          {children}
        </div>
      </body>
    </html>
  )
}
