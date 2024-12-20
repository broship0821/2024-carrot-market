import db from "@/lib/db";
import getSession, { saveSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) return notFound();
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const { error, access_token } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });
  const { id, avatar_url, login } = await userProfileResponse.json();
  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });
  if (user) {
    await saveSession(user.id);
    return redirect("/profile");
  }

  let username = login;
  const duplicateUser = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  if (duplicateUser) {
    username = `${login}_${id}`;
  }

  // const userEmailResponse = await fetch("https://api.github.com/user/emails", {
  //   headers: {
  //     Authorization: `Bearer ${access_token}`,
  //   },
  //   cache: "no-cache",
  // });
  // console.log(1111111111111);
  // console.log(await userEmailResponse.json());
  // const {email} = await userEmailResponse.json()[0];

  const newUser = await db.user.create({
    data: {
      username,
      github_id: id + "",
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });
  await saveSession(newUser.id);
  return redirect("/profile");
}
