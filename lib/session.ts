import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "delicious-karrot",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function saveSession(user_id: number) {
  const session = await getSession();
  session.id = user_id;
  await session.save();
}
