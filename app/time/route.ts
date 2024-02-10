// handle frame actions
// ./app/frames/route.ts

import { getFrameHtml, validateFrameMessage, Frame } from "frames.js";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Parse and validate the frame message
  const { isValid, message } = await validateFrameMessage(body);
  if (!isValid || !message) {
    return new Response("Invalid message", { status: 400 });
  }
  const total =
    Date.parse("2024-02-16 16:35:00 GMT-0100") -
    Date.parse(new Date().toString());
  function getTimeRemaining(total: any) {
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return `${days < 10 ? "0" + days : days} : ${
      hours < 10 ? "0" + hours : hours
    } : ${minutes < 10 ? "0" + minutes : minutes} : ${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }
  const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/og?time=${getTimeRemaining(
    total
  )}`;
  console.log(message.data);
  if (total > 0) {
    const frame: Frame = {
      version: "vNext",
      image: imageUrl,
      buttons: [
        {
          label: `Learn More`,
          action: "post_redirect",
        },
      ],
      postUrl: `https://mrphs.io/`,
    };

    // Return the frame as HTML
    const html = getFrameHtml(frame);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
      status: 200,
    });
  } else {
    const frame: Frame = {
      version: "vNext",
      image: `${process.env.NEXT_PUBLIC_HOST}/choseMorph.jpg`,
      buttons: [
        {
          label: `Sleep Fraction`,
          action: "post"
        },
        {
          label: `Vigilant Fraction`,
          action: "post"
        }
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
  }
  // Use the frame message to build the frame
}
