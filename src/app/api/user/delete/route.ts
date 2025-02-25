import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "O campo email é obrigatório!" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado!" }, { status: 404 });
    }

    // Deleta o usuário
    await prisma.user.delete({
      where: { email },
    });

    return NextResponse.json({ message: "Usuário deletado com sucesso!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar usuário.", details: (error as Error).message }, { status: 500 });
  }
}
