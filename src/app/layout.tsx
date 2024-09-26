import { PropsWithChildren } from "react";
import "@/assets/globals.css";

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        {props.children}
      </body>
    </html>
  );
}
