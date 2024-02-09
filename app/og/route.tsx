import { ImageResponse } from "next/og";

export const runtime = "experimental-edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const time = searchParams.get("time");

  return new ImageResponse(
    (
      <div className="frame">
        <img src="../../blue.png"/>
        <div>
          <h2>{time}</h2>
          <h4>time</h4>
        </div>
      </div>
    ),
    {
      width: 800,
      height: 421,
    }
  );
}
