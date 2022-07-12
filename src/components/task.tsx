import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import { trpc } from "../utils/trpc";

interface Task {
  id: string;
  name: string;
  content: string;
}

export default function Task({ task }: { task: Task }) {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation("task.remove", {
    onSuccess() {
      utils.invalidateQueries(["task.getAll"]);
    },
  });

  return (
    <Card sx={{ minWidth: 275, marginBottom: 1 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {task.name}
        </Typography>
        <Typography variant="body2">{task.content}</Typography>
        {mutation.error && (
          <p>Something went wrong! {mutation.error.message}</p>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<DoneIcon />}>
          Mark as Done
        </Button>
        <Button
          disabled={mutation.isLoading}
          size="small"
          onClick={() => mutation.mutate({ id: task.id })}
          startIcon={<DeleteIcon />}
        >
          Delete Task
        </Button>
      </CardActions>
    </Card>
  );
}
