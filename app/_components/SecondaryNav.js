import Image from "next/image";
import Link from "next/link";
export default function SecondaryNav({
  displayLogin = true,
  displayLogout = false,
  displayProfile = false,
}) {
  return (
    <nav className="flex flex-row items-center justify-between w-full bg-white py-3 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <div>
        <Link href="https://www.sait.ca">
          <Image src="/sait-logo.png" alt="SAIT Logo" height={36} width={131} />
        </Link>
      </div>

      <ul className="flex space-x-8 text-white">
        {displayLogin && (
          <li>
            <button
              className="px-6 py-2 bg-[#005EB8] text-white rounded-sm hover:bg-[#004080] font-bold transition"
              // onClick={loginPageNav}
            >
              Login
            </button>
          </li>
        )}
        {displayLogout && (
          <li>
            <button
              // onClick={handleLogout}
              className="px-6 py-2 bg-[#005EB8] text-white rounded-sm hover:bg-[#004080] font-bold transition"
            >
              Logout
            </button>
          </li>
        )}
        {displayProfile && (
          <li className="py-2">
            <Link href="/about" className="hover:opacity-80 transition">
              {employeeName}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}