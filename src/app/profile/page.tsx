import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession()

  if(!session) {
    redirect("/login")
  }

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      <h1>{session.user?.name}</h1>
    </div>
  );
}
