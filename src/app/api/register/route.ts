import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.email || !body.password || !body.name) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios!" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email: body.email } });
    if (existingUser) {
      return NextResponse.json({ error: "E-mail já cadastrado!" }, { status: 400 });
    }

    const hashedPassword = await hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        image: body.image || "https://via.placeholder.com/150",
      },
    });

    return NextResponse.json({ message: "Usuário criado com sucesso!", user }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar usuário." }, { status: 500 });
  }
}
