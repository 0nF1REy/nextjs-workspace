"use client";
import { ALLOWED_TYPES, MAX_FILE_SIZE } from "@/app/constants";
import { formatFileSize } from "@/app/utils";
import { upload } from "../actions";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const Form = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setErrorMessage(null);
  };

  const handleUpload = async (formData: FormData) => {
    if (!selectedFile) {
      setErrorMessage("Por favor, selecione um arquivo antes de enviar.");
      return;
    }

    setIsUploading(true);

    try {
      const result = await upload(formData);

      if (!result.success) {
        setErrorMessage(result.message);
      } else {
        setErrorMessage(null);
        setSelectedFile(null);
        const input = document.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        if (input) input.value = "";
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 rounded-lg bg-background border border-[#2563eb] shadow-md mb-8 font-sans text-foreground w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
      <form action={handleUpload}>
        <div className="space-y-6">
          <div className="border-2 border-dashed border-[#2563eb] rounded-lg p-6 bg-white bg-opacity-90">
            <input
              name="file"
              type="file"
              accept={Object.keys(ALLOWED_TYPES).join(",")}
              onChange={handleFileChange}
              className="text-foreground file:p-2 file:rounded-lg file:border-0 file:bg-[#2563eb] file:text-white hover:file:bg-[#1d4ed8] cursor-pointer"
            />
            <p className="mt-3 text-sm text-[#2563eb]">
              Tamanho máximo permitido: {formatFileSize(MAX_FILE_SIZE)}
            </p>
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600 font-semibold">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={!selectedFile || isUploading}
            className={`w-full py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
              !selectedFile || isUploading
                ? "bg-gray-400 cursor-not-allowed text-gray-200"
                : "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
            }`}
          >
            <FiUploadCloud size={20} />
            {isUploading ? "Enviando..." : "Enviar Arquivo"}
          </button>
        </div>
      </form>
    </div>
  );
};

export { Form };
