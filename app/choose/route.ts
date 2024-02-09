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
  const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/og?time=${new Date().toISOString()}`
  console.log(message.data);
  if(message.data) {
    const frame: Frame = {
      version: "vNext",
      image: imageUrl,
      buttons: [
        {
          label: `Blue`,
          action: "post"
        },
        {
          label: `Red`,
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
  } else {
    return new Response("Invalid message", { status: 400 });
  }
  // Use the frame message to build the frame
  
}