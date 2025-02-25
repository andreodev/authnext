import ButtonLogout from "@/components/ui/ButtonLogout";
import { Card } from "@/components/ui/card";
import UserProfile from "@/components/UserProfile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession();

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full flex justify-end">
        <ButtonLogout />
      </div>

        <UserProfile
          name={session.user?.name ?? ""}
          email={session.user?.email ?? ""}
          image={session.user?.image ?? ""}
        />
    </div>
  );
}
