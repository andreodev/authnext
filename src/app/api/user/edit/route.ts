import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, image } = body;

    if (!email) {
      return NextResponse.json({ error: "O campo email é obrigatório!" }, { status: 400 });
    }

    // Verifica se o usuário existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return NextResponse.json({ error: "Usuário não encontrado!" }, { status: 404 });
    }

    let updatedPassword = existingUser.password;
    if (password) {
      updatedPassword = await hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name: name || existingUser.name, // Atualiza o nome se fornecido
        password: updatedPassword, // Atualiza a senha se fornecida
        image: image || existingUser.image, // Atualiza a imagem se fornecida
        // Não atualiza o email
      },
    });

    return NextResponse.json({ message: "Usuário atualizado com sucesso!", user: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar usuário.", details: (error as Error).message }, { status: 500 });
  }
}
