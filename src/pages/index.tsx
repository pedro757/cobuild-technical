import Container from "@mui/material/Container";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import ButtonAppBar from "../components/navbar";
import Task from "../components/task";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.useQuery(["task.getAll"]);

  if (!session) {
    return (
      <>
        <ButtonAppBar />
        <Container maxWidth="md">
          <div>Please Log In</div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Cobuild Technical Interview" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ButtonAppBar />
      <Container maxWidth="md">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data && data.map((task) => <Task key={task.id} task={task} />)
        )}
      </Container>
    </>
  );
};

export default Home;
