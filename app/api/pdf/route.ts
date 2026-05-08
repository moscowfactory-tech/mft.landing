import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import { ProposalPDF } from "@/lib/pdf/template";
import React, { type ReactElement, type JSXElementConstructor } from "react";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const proposal = await prisma.proposal.findUnique({
      where: { id },
      include: { template: true },
    });

    if (!proposal) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = proposal.data as { blocks: { id: string; type: "text" | "price" | "list"; label: string; value: string }[] };

    const element = React.createElement(ProposalPDF, {
      clientName: proposal.clientName,
      blocks: data.blocks ?? [],
      templateName: proposal.template.name,
    }) as unknown as ReactElement<DocumentProps, string | JSXElementConstructor<unknown>>;

    const buffer = await renderToBuffer(element);

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="KP_${proposal.clientName.replace(/\s+/g, "_")}.pdf"`,
      },
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
