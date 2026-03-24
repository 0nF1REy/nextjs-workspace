import { Suspense } from "react";
import LegalContent from "./components/LegalContent";

export default function LegalPageLayout() {
  return (
    <div className="flex flex-col min-h-screen mt-16 gap-8 px-4">
      <div className="flex flex-col w-full max-w-5xl mx-auto gap-4 items-start">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center text-gray-800 mb-6 sm:mb-8">
          Informações Legais
        </h1>
        <Suspense fallback={<div>Carregando...</div>}>
          <LegalContent />
        </Suspense>
      </div>
    </div>
  );
}
