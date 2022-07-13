import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import ButtonAppBar from "../../components/navbar";
import { trpc } from "../../utils/trpc";

const CreateTask: NextPage = () => {
  const { data: session } = useSession();
  const [form, setForm] = useState({ name: "", content: "" });
  const router = useRouter();
  const mutation = trpc.useMutation("task.create", {
    onSuccess() {
      router.push("/");
    },
  });

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate(form);
  }

  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }
  return (
    <>
      <Head>
        <title>Create Task</title>
      </Head>
      <ButtonAppBar />
      <Container maxWidth="md">
        <form onSubmit={handleSubmit}>
          <TextField
            required
            margin="normal"
            id="nameInput"
            label="Name"
            name="name"
            value={form.name}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            id="contentInput"
            label="Content"
            name="content"
            value={form.content}
            onChange={(e) => handleChange(e)}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

export default CreateTask;
