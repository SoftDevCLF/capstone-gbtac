import Link from "next/link";

export default function SecondNavbar({
  displayHome = true,
  displayAbout = true,
  displayDashboards = false,
  displayReports = false,
  displayAccountMngmt = false,
  displayDashboardMngmt = false,
}) {
  return (
    <nav
      className="
        w-full bg-[#A6192E] text-white
        sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32
        py-4
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* gap-x-8 FIXES spacing */}
        <ul className="flex items-center gap-x-8 text-16">
          {displayHome && (
            <li>
              <Link href="/" className="hover:opacity-70 transition">
                Home
              </Link>
            </li>
          )}

          {displayAbout && (
            <li>
              <Link href="/about" className="hover:opacity-70 transition">
                About
              </Link>
            </li>
          )}

          {displayDashboards && (
            <li className="relative group">
              <span className="cursor-pointer hover:opacity-70 transition">
                Graphs
              </span>

              {/* hover buffer */}
              <div className="absolute left-0 top-full h-2 w-full" />

              <ul
                className="
                  absolute left-0 top-full mt-2 w-44
                  bg-white text-black shadow-lg
                  opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible
                  transition duration-150
                "
              >
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Water Level
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Energy
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Ambient Temperature
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Wall Temperature
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Natural gas
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Customizable graphs
                  </a>
                </li>
              </ul>
            </li>
          )}

          {displayReports && (
            <li className="relative group">
              <span className="cursor-pointer hover:opacity-70 transition">
                Reports
              </span>

              <div className="absolute left-0 top-full h-2 w-full" />

              <ul
                className="
                  absolute left-0 top-full mt-2 w-44
                  bg-white text-black shadow-lg
                  opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible
                  transition duration-150
                "
              >
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Monthly
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Annual
                  </a>
                </li>
              </ul>
            </li>
          )}

          {displayAccountMngmt && (
            <li>
              <a href="#" className="hover:opacity-70 transition">
                Account Management
              </a>
            </li>
          )}
          {displayDashboardMngmt && (
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Dashboard Management
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
