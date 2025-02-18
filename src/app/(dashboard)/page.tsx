
import { getCurrent } from "@/features/auth/actions";
import { UserButton } from "@/features/auth/components/user-button";
import { getWorkspaces } from "@/features/workspaces/actions";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect('/sign-in');
  const workspaces: any = await getWorkspaces();

  if (workspaces?.total === 0) redirect('/workspaces/create');
  else redirect(`/workspaces/${workspaces?.documents[0].$id}`);

}
