"use server";

import { ALLOWED_TYPES, MAX_FILE_SIZE, UPLOAD_DIR } from "@/app/constants";
import { isAllowedMimeType, sanitizeFileName } from "@/app/utils";
import path from "path";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

type UploadResult = {
  success: boolean;
  message: string;
  fileName?: string;
};

const upload = async (formData: FormData): Promise<UploadResult> => {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { success: false, message: "Arquivo não fornecido" };
    }

    if (!isAllowedMimeType(file.type)) {
      return {
        success: false,
        message: `Tipo de arquivo não permitido. Tipos que são aceitos: ${Object.keys(
          ALLOWED_TYPES
        ).join(", ")}`,
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        message: `O arquivo é muito grande. O tamanho máximo é ${
          MAX_FILE_SIZE / (1024 * 1024)
        } MB`,
      };
    }

    const timestamp = Date.now();
    const safeFileName = `${timestamp}-${sanitizeFileName(file.name)}`;
    const filePath = path.join(UPLOAD_DIR, safeFileName);

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await fs.writeFile(filePath, buffer);

    const stats = await fs.stat(filePath);

    if (stats.size !== file.size) {
      await fs.unlink(filePath);
      return {
        success: false,
        message: "Houve uma falha na verificação do arquivo enviado",
      };
    }

    revalidatePath("/");

    return {
      success: true,
      message: "Arquivo enviado com sucesso",
      fileName: safeFileName,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Ocorreu um erro desconhecido",
    };
  }
};

// Método de exclusão
const deleteFile = async (fileName: string) => {
  try {
    const filePath = path.join(UPLOAD_DIR, fileName);
    await fs.unlink(filePath);
    revalidatePath("/");
  } catch (error) {
    console.error("Erro ao deletar o arquivo:", error);
  }
};

export { upload, deleteFile };
