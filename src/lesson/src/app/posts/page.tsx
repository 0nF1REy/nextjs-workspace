import { ButtonComponent } from "@/components/button/button";
import Link from "next/link";

export interface PostProps {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface ResponseProps {
  posts: PostProps[];
}

export const revalidate = 60;

export default async function PaginaPosts() {
  const response = await fetch("https://dummyjson.com/posts", {
    cache: "force-cache",
    next: {
      revalidate: 60,
    },
  });
  const data: ResponseProps = await response.json();

  async function handleFetchPosts() {
    "use server";

    console.log(data.posts, "CLICOUUUU!!!!");
  }

  async function handleSearchUsers(formData: FormData) {
    "use server";

    const userId = formData.get("userId");

    const response = await fetch(`https://dummyjson.com/posts/user/${userId}`);

    const data: ResponseProps = await response.json();

    console.log(data);
  }

  return (
    <main className="min-h-screen bg-blue-100 px-6 py-10">
      <section className="max-w-5xl mx-auto">
        {/* Cabeçalho */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-[#2d3e50] mb-3">
            Todos os Posts
          </h1>
          <p className="text-lg text-gray-600">
            Explore as publicações mais recentes da nossa comunidade
          </p>
        </header>
        {/* Grade de Posts */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-[#d6e9f8]"
            >
              <h2 className="text-xl font-semibold text-[#1e3a56] mb-3 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {post.body}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Usuário: {post.userId}</span>
                <Link
                  href={`/posts/${post.id}`}
                  className="text-[#4a90e2] hover:text-[#2c6fb2] font-medium"
                >
                  Acessar detalhes →
                </Link>
              </div>
            </article>
          ))}
          <ButtonComponent />

          <form
            className="flex flex-col md:flex-row bg-white p-4 rounded-xl shadow-md"
            action={handleSearchUsers}
          >
            <input
              type="text"
              placeholder="ID do usuário"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-[#4a90e2]"
              name="userId"
            />
            <button
              type="submit"
              className="bg-[#4a90e2] hover:bg-[#2c6fb2] text-white font-medium py-2 rounded-md shadow hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:ring-offset-2"
            >
              Buscar usuário
            </button>
          </form>

          <button
            className="bg-[#4a90e2] hover:bg-[#2c6fb2] text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:ring-offset-2"
            onClick={handleFetchPosts}
          >
            Buscar posts
          </button>
        </div>
      </section>
    </main>
  );
}
