"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";

const checkUsername = (username: string) => !username.includes("potato");
const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;
const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "문자를 넣어야 합니다",
        required_error: "적으십시오",
      })
      .toLowerCase()
      .trim()
      .transform((username) => `${username} 바꿔버리기~`)
      .refine(checkUsername, "no potato"),
    email: z.string().email("올바른 이메일 형식이 아니읍니다").toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formdata: FormData) {
  const data = {
    username: formdata.get("username"),
    email: formdata.get("email"),
    password: formdata.get("password"),
    confirm_password: formdata.get("confirm_password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) return result.error.flatten();
  else console.log(result.data);
}
