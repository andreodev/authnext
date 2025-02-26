"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { handleDelete } from "./hooks/useFetch";

interface UserProfileProps {
  name: string | null;
  email: string | null;
  image: string | null;
}

export default function UserProfile({ name, email, image }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);


  const [formData, setFormData] = useState({
    name: name || "",
    email: email || "",
    image: image || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/user/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Perfil atualizado com sucesso!");
        setIsEditing(false);
      } else {
        alert("Erro ao atualizar perfil.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao salvar as alterações.");
    }
  };

  

  return (
    <div className="flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Perfil de usuário</CardTitle>
          <CardDescription>
            Verifique e atualize seus dados! (com exceção do e-mail)
          </CardDescription>
        </CardHeader>
        <div className="flex justify-center mb-6">
          <Image
            src={formData.image || "/default-avatar.png"}
            alt="Imagem de perfil"
            className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-xl"
            width={150}
            height={150}
            priority
          />
        </div>
        <div className="text-center ">
          {isEditing ? (
            <div className="text-white">
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="  p-2 mb-4 w-full rounded text-white"
                placeholder="Novo nome"
              />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 mb-4 w-full rounded text-white"
                placeholder="Novo e-mail"
                disabled // Desabilita a edição do email
              />
              <Input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className=" p-2 mb-4 w-full rounded"
                placeholder="URL da nova imagem"
              />
            </div>
          ) : (
            <div>
              <p className="text-lg mb-2 font-medium text-white">
                <strong>Nome:</strong> {formData.name}
              </p>
              <p className="text-lg font-medium text-white">
                <strong>Email:</strong>{" "}
                {formData.email || "Email não disponível"}
              </p>
            </div>
          )}
        </div>
        <div className="mt-6 text-center">
          {isEditing ? (
            <div>
              <Button
                className=" ml-2  py-2 px-4 rounded-lg transition duration-300 ease-in-out mr-2"
                onClick={handleSave}
              >
                Salvar Alterações
              </Button>
              <Button
                className=" py-2 px-4 rounded-lg ml-2 ho transition duration-300 ease-in-out"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <div>
              <Button
                className="py-2 px-4 rounded-xl transition-colors mb-2  ease-in-out"
                onClick={() => setIsEditing(true)}
              >
                Editar Perfil
              </Button>
              <Button
                className=" py-2 px-4 rounded-xl ml-2  transition-colors ease-in-out mt-4"
                onClick={() => handleDelete({ email: formData.email })}
              >
                Excluir Perfil
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
