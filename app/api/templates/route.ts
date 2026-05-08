import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const templates = await prisma.template.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(templates);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, blocks } = await req.json();

    if (!name || !blocks) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const template = await prisma.template.create({
      data: { name, blocks },
    });

    return NextResponse.json(template, { status: 201 });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
