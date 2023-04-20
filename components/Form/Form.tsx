import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
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
    .min(2, "Имя должно содержать от 2 до 20 символов")
    .max(20)
    .refine(
      (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{2,20}$/.test(value),
      "Пароль должен содержать цифры, буквы и хотя бы одну заглавную букву"
    ),
});

type FormData = z.TypeOf<typeof schema>;

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.firstName}>
          <FormLabel htmlFor="firstName">Имя:</FormLabel>
          <Input id="firstName" {...register("firstName")} />
          <FormErrorMessage>
            {errors.firstName && errors.firstName.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lastName}>
          <FormLabel htmlFor="lastName">Фамилия:</FormLabel>
          <Input id="lastName" {...register("lastName")} />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.username}>
          <FormLabel htmlFor="username">Логин:</FormLabel>
          <Input id="username" {...register("username")} />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input id="email" {...register("email")} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.privacyPolicy}>
          <Checkbox id="privacyPolicy" {...register("privacyPolicy")}>
            Ознакомлен с политикой конфиденциальности
          </Checkbox>
          <FormErrorMessage>
            {errors.privacyPolicy && errors.privacyPolicy.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Пароль:</FormLabel>
          <Input id="password" type="password" {...register("password")} />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <Button type="submit">Отправить</Button>
      </VStack>
    </form>
  );
};
