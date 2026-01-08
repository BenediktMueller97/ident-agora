export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-indigo-600">
            Ident Agora
          </a>
        </div>
        <nav className="flex gap-6">
          <a
            href="/"
            className="text-gray-600 hover:text-indigo-600 font-medium transition"
          >
            Home
          </a>
          <a
            href="/register"
            className="text-gray-600 hover:text-indigo-600 font-medium transition"
          >
            Register
          </a>
          <a
            href="/login"
            className="text-gray-600 hover:text-indigo-600 font-medium transition"
          >
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}
