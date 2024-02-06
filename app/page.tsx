import Image from "next/image";
import styles from "./page.module.css";
import { FrameContainer, FrameImage, FrameButton, useFramesReducer, getPreviousFrame, validateActionSignature, FrameInput } from "frames.js/next/server";
import { Frame, getFrameFlattened, getFrameHtml } from "frames.js";
import type { Metadata } from "next";
 
// Declare the frame
const initialFrame: Frame = {
  image: "https://picsum.photos/seed/frames.js/1146/600",
  version: "vNext",
  buttons: [
    {
      label: "Choose your side",
    },
  ],
  postUrl: `${process.env.NEXT_PUBLIC_HOST}/frames`,
};

console.log(process.env.NEXT_PUBLIC_HOST)
 
// Export Next.js metadata
export const metadata: Metadata = {
  title: "side",
  description: "choose side",
  openGraph: {
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRhy5_uMcls28auaUHiMqKsoz_ndo3QjXhTw&usqp=CAU",
      },
    ],
  },
  other: getFrameFlattened(initialFrame),
};

export default async function Home() {
  let html = getFrameHtml(initialFrame);
  console.log(html)
  return html;
}