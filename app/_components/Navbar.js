export default function Navbar() {
  return (
    <nav className="flex w-full bg-[#A6192E] text-white sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-3">
      <ul className="flex h-full">
        <li className="flex h-full">
          <a
            href="#"
            className="h-full flex items-center px-4 border-x border-white/40 text-white hover:opacity-50 transition"
          >
            Home
          </a>
        </li>
      </ul>
    </nav>
  );
}
