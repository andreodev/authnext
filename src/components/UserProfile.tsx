"use client";

import { useState } from "react";
import Image from "next/image";

interface UserProfileProps {
  name: string | null;
  email: string | null;
  image: string | null;
}

export default function UserProfile({ name, email, image }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Estado para armazenar os dados editados
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

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir seu perfil?");
    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/user/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        alert("Perfil deletado com sucesso!");
        window.location.href = "/login"; 
      } else {
        alert("Erro ao excluir perfil.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao excluir o perfil.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full sm:w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Detalhes do Perfil
        </h2>
        <div className="flex justify-center mb-6">
          <Image
            src={formData.image || "/default-avatar.png"}
            alt="Imagem de perfil"
            className="rounded-full w-32 h-32 object-cover border-4 border-indigo-500 shadow-xl"
            width={150}
            height={150}
            priority
          />
        </div>
        <div className="text-center text-gray-700">
          {isEditing ? (
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border-2 border-gray-300 p-2 mb-4 w-full rounded"
                placeholder="Novo nome"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border-2 border-gray-300 p-2 mb-4 w-full rounded"
                placeholder="Novo e-mail"
                disabled // Desabilita a edição do email
              />
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="border-2 border-gray-300 p-2 mb-4 w-full rounded"
                placeholder="URL da nova imagem"
              />
            </div>
          ) : (
            <div>
              <p className="text-lg mb-2 font-medium">
                <strong>Nome:</strong> {formData.name}
              </p>
              <p className="text-lg font-medium">
                <strong>Email:</strong> {formData.email || "Email não disponível"}
              </p>
            </div>
          )}
        </div>
        <div className="mt-6 text-center">
          {isEditing ? (
            <div>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out mr-2"
                onClick={handleSave}
              >
                Salvar Alterações
              </button>
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out"
                onClick={() => setIsEditing(false)} 
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div>
              <button
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
                onClick={() => setIsEditing(true)} 
              >
                Editar Perfil
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out mt-4"
                onClick={handleDelete} 
              >
                Excluir Perfil
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
