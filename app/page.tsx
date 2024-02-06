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
      label: "Random image",
    },
  ],
  postUrl: `${process.env.NEXT_PUBLIC_HOST}/frames`,
};

console.log(process.env.NEXT_PUBLIC_HOST)
 
// Export Next.js metadata
export const metadata: Metadata = {
  title: "Random Image Frame",
  description: "This is an example of a simple frame using frames.js",
  openGraph: {
    images: [
      {
        url: "https://picsum.photos/seed/frames.js/600",
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