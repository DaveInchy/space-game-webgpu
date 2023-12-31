import "mods@css/main.css";
import BackgroundImage from "/textures/background/lowres_stars.jpg";
import { metadata as metadat, roboto } from "mods@core/config/globals";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const font = roboto;
  const metadata = metadat;
  return (
    <html lang="en">
      <head>
        <title>ThreeJS Studio</title>
        <link type="application/x-icon" href={"/ThreeJS.svg"} />
      </head>
      <body>
        <div id="app" style={{...font.style, }} className={""}>
          {children}
        </div>
      </body>
    </html>
  )
}
