"use server";
import { z } from "zod";

const usernameSchema = z.string().min(5).max(10);

export async function createAccount(prevState: any, formdata: FormData) {
  const data = {
    username: formdata.get("username"),
    email: formdata.get("email"),
    password: formdata.get("password"),
    confirm_password: formdata.get("confirm_password"),
  };
  usernameSchema.parse(data.username);
}
