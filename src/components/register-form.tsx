"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); 

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      setLoading(false); 
      return;
    }

    setSuccess("Usuário criado com sucesso!");
    setFormData({ name: "", email: "", password: "", image: "" });

    setLoading(false); 
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, router]);

  return (
    <div className="flex flex-col gap-6">
      {success ? (
        <div className="flex flex-col justify-center items-center min-h-screentext-center p-6">
          <h1 className="text-4xl font-bold text-green-600">Registrado com sucesso!</h1>
          <p className="mt-4 text-lg">Você será redirecionado para a página de login.</p>
          <p className="mt-4 text-sm text-gray-500">Aguarde um momento...</p>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Registre-se</CardTitle>
            <CardDescription>
              Digite seus dados para se registrar em minha plataforma!
            </CardDescription>
          </CardHeader>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Nome</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <div className="flex items-center">
                    <Input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleChange}
                      className="border p-2 rounded"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Senha</Label>
                  <div className="flex items-center">
                    <Input
                      type="password"
                      name="password"
                      placeholder="Senha"
                      value={formData.password}
                      onChange={handleChange}
                      className="border p-2 rounded"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Endereço da Imagem</Label>
                  <div className="flex items-center">
                    <Input
                      type="text"
                      name="image"
                      placeholder="Link da imagem (opcional)"
                      value={formData.image}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-blue-500 text-white rounded"
                  disabled={loading} 
                >
                  {loading ? (
                    <span className="animate-spin">🔄</span> 
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
