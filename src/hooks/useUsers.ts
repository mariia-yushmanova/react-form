import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { type FormData } from "~/components/Form/schema";

export const useUsers = () => {
  const queryClient = useQueryClient();

  const getUsers = useQuery<FormData[]>("users", async () => {
    const response = await axios.get<FormData[]>("/api/users");
    return response.data;
  });

  const createUser = useMutation(
    async (newUser: FormData) => {
      await axios.post("/api/users", newUser);
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries("users");
      },
    }
  );

  return { ...getUsers, createUser };
};
