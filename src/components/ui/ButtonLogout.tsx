"use client";

import { signOut } from "next-auth/react";
import { Button } from "./button";
import { LogOut } from "lucide-react";

export default function ButtonLogout() {
  return (
    <Button onClick={() => signOut()} className="flex items-center gap-2">
      <LogOut className="w-5 h-5" />
      Logout
    </Button>
  );
}
