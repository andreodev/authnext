import ButtonLogout from "@/components/ui/ButtonLogout";
import UserProfile from "@/components/UserProfile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      <ButtonLogout />
      <UserProfile
        name={session.user?.name ?? null}
        email={session.user?.email ?? null}
        image={session.user?.image ?? null}
      />
    </div>
  );
}
