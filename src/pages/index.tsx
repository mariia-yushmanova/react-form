import { Form } from "~/components/Form";
import { UsersList } from "~/components/UsersList";

const Home = () => {
  return (
    <main className="flex min-h-screen justify-around items-start mt-9">
      <Form />
      <UsersList />
    </main>
  );
};

export default Home;
