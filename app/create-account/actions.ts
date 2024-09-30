"use server";
import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).+$/
);

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
      .min(3, "너무 짧읍니다")
      .max(10, "너무 깁디다")
      .toLowerCase()
      .trim()
      .transform((username) => `${username} 바꿔버리기~`)
      .refine(checkUsername, "no potato"),
    email: z.string().email("올바른 이메일 형식이 아니읍니다").toLowerCase(),
    password: z
      .string()
      .min(4)
      .regex(passwordRegex, "소문자, 대문자, 숫자, 특수문자 포함 필요"),
    confirm_password: z.string().min(4),
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
