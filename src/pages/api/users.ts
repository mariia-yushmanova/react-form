import { type NextApiRequest, type NextApiResponse } from "next";
import { z } from "zod";
import { schema, type FormData } from "~/components/Form/schema";

const users: FormData[] = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormData | FormData[] | { message: string }>
) {
  switch (req.method) {
    case "GET":
      res.status(200).json(users);
      break;
    case "POST":
      try {
        const validData = schema.parse(req.body);
        users.push(validData);
        console.log(users);
        res.status(201).json(validData);
      } catch (error) {
        if (error instanceof z.ZodError) {
          res.status(400).json({ message: "Что-то пошло не так" });
        }
      }
      break;
    default:
      res.status(405).end("Что-то пошло не так");
  }
}
