import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { trpc } from "../utils/trpc";

interface Task {
  id: string;
  name: string;
  content: string;
}

export default function Task({ task }: { task: Task }) {
  const utils = trpc.useContext();
  const removeMutation = trpc.useMutation("task.remove", {
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
        {removeMutation.error && (
          <p>Something went wrong! {removeMutation.error.message}</p>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<DoneIcon />}>
          Mark as Done
        </Button>
        <Button
          disabled={removeMutation.isLoading}
          size="small"
          onClick={() => removeMutation.mutate({ id: task.id })}
          startIcon={<DeleteIcon />}
        >
          Delete Task
        </Button>
        <Link
          href={{
            pathname: "/task/[id]",
            query: { id: task.id },
          }}
        >
          <Button size="small" startIcon={<EditIcon />}>
            Edit Task
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
