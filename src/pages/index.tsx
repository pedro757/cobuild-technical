import type { NextPage } from "next";
import Head from "next/head";
import ButtonAppBar from "../components/navbar";
import Task from "../components/task";
import Container from "@mui/material/Container";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["task.getAll"]);

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
