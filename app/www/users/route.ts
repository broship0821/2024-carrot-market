import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log(request);
  return Response.json({
    ok: true,
  });
}

export async function POST(requst: NextRequest) {
  const data = await requst.json();
  return Response.json(data);
}
