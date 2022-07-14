import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Task } from "@prisma/client";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import SigninAlert from "../../components/signinAlert";
import ButtonAppBar from "../../components/navbar";
import { trpc } from "../../utils/trpc";

const EditTask: NextPage = () => {
  const { data: session } = useSession();
  const [form, setForm] = useState<Task>({ id: "", name: "", content: "", done: false });
  const router = useRouter();
  const { id } = router.query;
  if (id && typeof id === 'string') {
    trpc.useQuery(
      [
        "task.byId",
        {
          id: id
        },
      ],
      {
        onSuccess(data) {
          if (data != null) {
            setForm(data)
          }
        },
      }
    );
  }
  const mutation = trpc.useMutation("task.update", {
    onSuccess() {
      router.push("/");
    },
  });

  if (!session) {
    return (
      <>
        <ButtonAppBar />
        <Container maxWidth="md">
          <SigninAlert />
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
        <title>Edit Task</title>
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

export default EditTask;
