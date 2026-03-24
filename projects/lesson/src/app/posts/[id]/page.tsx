import Link from "next/link";
import { PostInfoComponent } from "./_components/post";
import { Suspense } from "react";

export default async function DetailPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Detalhes do post: <span className="text-green-700">{id}</span>
      </h1>

      <Suspense
        fallback={
          <div className="text-gray-500 py-4">Carregando…</div>
        }
      >
        <PostInfoComponent id={id} />
      </Suspense>

      <div className="mt-6">
        <Link
          href="/posts"
          className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          Voltar para a lista de posts
        </Link>
      </div>
    </div>
  );
}
