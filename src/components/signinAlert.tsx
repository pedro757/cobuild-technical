import Alert from "@mui/material/Alert";
import Link from "next/link";

export default function SigninAlert() {
  return (
    <Alert severity="error">
      This Page is restricted, Please
      <Link href="/api/auth/signin"> Sign In</Link>
    </Alert>
  );
}
