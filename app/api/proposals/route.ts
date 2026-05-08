import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const proposals = await prisma.proposal.findMany({
      include: { template: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(proposals);
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { clientName, clientEmail, templateId, data } = await req.json();

    if (!clientName || !templateId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const proposal = await prisma.proposal.create({
      data: { clientName, clientEmail, templateId, data, status: "draft" },
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
