import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-100 px-6 text-center">
      <h1 className="text-7xl font-extrabold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">
        Página Não Encontrada!
      </h2>
      <p className="text-gray-600 mb-6 max-w-lg">
        A página que você está procurando pode ter sido removida ou está
        temporariamente indisponível. Verifique a URL ou volte para a página
        inicial.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#4a90e2] text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-green-700 transition"
      >
        Voltar para a home
      </Link>
    </main>
  );
}
