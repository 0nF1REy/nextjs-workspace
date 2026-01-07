import Link from "next/link";

export function HeaderComponent() {
  return (
    <header className="bg-gray-900 text-gray-300">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-white">
            Lesson<span className="text-green-500"> Next JS.</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="hidden md:flex space-x-8">
            <li>
              <Link href="/posts" className="hover:text-white transition">
                Posts
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-white transition">
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>

          {/* CTA Button */}
          <a
            href="#"
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition font-medium text-sm"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </header>
  );
}
