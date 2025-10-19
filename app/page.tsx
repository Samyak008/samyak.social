import { redirect } from "next/navigation";

export default function Page() {
  // server redirect from root to /home
  redirect("/home");
}