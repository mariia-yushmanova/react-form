import { z } from "zod";

export const schema = z.object({
    firstName: z
      .string()
      .min(2, "Имя должно содержать от 2 до 20 символов")
      .max(20),
    lastName: z
      .string()
      .min(2, "Фамилия должна содержать от 2 до 20 символов")
      .max(20),
    username: z
      .string()
      .min(2, "Логин должен содержать от 2 до 20 символов")
      .max(20)
      .regex(/^[a-zA-Z]+$/, "Логин должен состоять только из латинских символов"),
    email: z.string().email("Введите корректный адрес электронной почты"),
    privacyPolicy: z
      .boolean()
      .refine(
        (value) => value === true,
        "Вы должны принять политику конфиденциальности"
      ),
    // z.literal(true),
    password: z
      .string()
      .max(20)
      .refine(
        (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{2,20}$/.test(value),
        "Пароль должен содержать 1-9, а-я и А-Я"
      ),
  });

  export type FormData = z.TypeOf<typeof schema>;