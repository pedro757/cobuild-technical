import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function ButtonAppBar() {
  const { data: session } = useSession();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ paddingRight: 8 }}>
            <Link href="/">
              <div style={{ display: "flex", cursor: "pointer" }}>
                <AssignmentIcon fontSize="large" sx={{ marginRight: 1 }} />
                TASKS
              </div>
            </Link>
          </Typography>
          {session &&
            <Typography variant="h6" component="div" className="create">
              <Link href="/task/create">
                <div style={{ display: "flex", cursor: "pointer" }}>
                  <AddIcon sx={{ marginRight: 1, marginTop: "4px" }} />
                  create
                </div>
              </Link>
            </Typography>
          }
          <div style={{display: "flex", flexDirection: "row-reverse", flexGrow: 1}}>
          {session ? (
              <Button
                sx={{justifyContent: "flex-end"}}
                variant="contained"
                onClick={() => signOut()}
                endIcon={<LogoutIcon />}
              >
                Sign Out
              </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => signIn()}
              endIcon={<LoginIcon />}
            >
              Sign In
            </Button>
          )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
