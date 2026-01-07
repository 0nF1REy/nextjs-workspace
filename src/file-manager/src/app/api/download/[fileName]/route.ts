import { MAX_FILE_SIZE, UPLOAD_DIR } from "@/app/constants";
import { canShowInBrowser, getMimeTypeFromExtension } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

type Params = Promise<{ fileName: string }>;
const GET = async (_: NextRequest, { params }: { params: Params }) => {
  try {
    const { fileName } = await params;

    if (!fileName) {
      return NextResponse.json(
        { error: "O nome do arquivo é obrigatório" },
        { status: 400 }
      );
    }

    const fileExt = path.extname(fileName).toLowerCase();
    const contentType = getMimeTypeFromExtension(fileExt);

    if (!contentType) {
      return NextResponse.json(
        { error: "Tipo de arquivo não suportado" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), UPLOAD_DIR, fileName);

    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { error: "Arquivo não encontrado" },
        { status: 404 }
      );
    }

    const stats = await fs.stat(filePath);

    if (stats.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Arquivo muito grande" },
        { status: 400 }
      );
    }

    const file = await fs.readFile(filePath);

    const disposition = canShowInBrowser(fileExt) ? "inline" : "attachment";

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `${disposition}; filename="${encodeURIComponent(
          fileName
        )}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Security-Policy": "default-src 'self'",
        "X-Content-Type-Options": "nosniff",
        "Content-Length": stats.size.toString(),
        "Accept-Ranges": "bytes",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
};

export { GET };
