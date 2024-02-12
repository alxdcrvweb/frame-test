// handle frame actions
// ./app/frames/route.ts

import {
  getFrameHtml,
  validateFrameMessage,
  Frame,
  getTokenUrl,
} from "frames.js";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Parse and validate the frame message
  const { isValid, message } = await validateFrameMessage(body);
  if (!isValid || !message) {
    return new Response("Invalid message", { status: 400 });
  }

  if (message.data.frameActionBody.buttonIndex == 1) {
    const frame: Frame = {
      version: "vNext",
      image: `${process.env.NEXT_PUBLIC_HOST}/sleepers.jpg`,
      buttons: [
        {
          label: `Mint`,
          action: "mint",
          target: getTokenUrl({
            address: "0x28e7473cad80fdfdb6e517a3ecc78424ba5c5bf1",
            tokenId: "3",
            chainId: 84532,
          }),
        },
        {
          label: `Learn more about project`,
          action: "link",
          target: "https://mrphs.io/",
        },
      ],
      postUrl: `${process.env.NEXT_PUBLIC_HOST}/result`,
    };

    // Return the frame as HTML
    const html = getFrameHtml(frame);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
      status: 200,
    });
  } else if (message.data.frameActionBody.buttonIndex == 2) {
    const frame: Frame = {
      version: "vNext",
      image: `${process.env.NEXT_PUBLIC_HOST}/vigilant.jpg`,
      buttons: [
        {
          label: `Mint`,
          action: "mint",
          target: getTokenUrl({
            address: "0x28e7473cad80fdfdb6e517a3ecc78424ba5c5bf1",
            tokenId: "2",
            chainId: 84532,
          }),
        },
        {
          label: `Learn more about project`,
          action: "link",
          target: "https://mrphs.io/",
        },
      ],
      postUrl: `${process.env.NEXT_PUBLIC_HOST}/result`,
    };
    const html = getFrameHtml(frame);
    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
      status: 200,
    });
  }
  // Use the frame message to build the frame
}
