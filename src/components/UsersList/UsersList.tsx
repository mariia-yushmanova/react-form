import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import { useUsers } from "~/hooks/useUsers";

export const UsersList = () => {
  const { data, isLoading, isError } = useUsers();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching users</div>;
  }

  return (
    <Box>
      <Heading as="h4" size="md" marginBottom="1rem">
       Пользователи
      </Heading>
      <List
        spacing={4}
        backgroundColor="gray.100"
        borderRadius="md"
        borderColor="gray.200"
      >
        {data &&
          data.map((user, index) => (
            <ListItem key={index}>
              {user.firstName} {user.lastName} ({user.username})
            </ListItem>
          ))}
      </List>
    </Box>
  );
};
