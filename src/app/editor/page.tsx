import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { EditorApp } from "@/components/editor/EditorApp";

export default async function EditorPage() {
  const ok = await isAdminAuthenticated();
  if (!ok) redirect("/editor/login");
  return <EditorApp />;
}
