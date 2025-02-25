"use client"

import Image from "next/image";

interface UserProfileProps {
  name: string | null;
  email: string | null;
  image: string | null;
}

export default function UserProfile({ name, email, image }: UserProfileProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Detalhes do Perfil</h2>
        <div className="flex justify-center mb-6">
          <Image
            src={image || "/default-avatar.png"}
            alt="Imagem de perfil"
            className="rounded-full w-24 h-24 object-cover"
            width={150}
            height={150}
          />
        </div>
        <div className="text-center text-gray-700">
          <p className="text-lg"><strong>Nome:</strong> {name}</p>
          <p className="text-lg"><strong>Email:</strong> {email || "Email não disponível"}</p>
        </div>
      </div>
    </div>
  );
}
