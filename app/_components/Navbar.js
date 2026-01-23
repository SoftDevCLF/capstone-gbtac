import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
export default function Navbar({
  displayHome = true,
  displayAbout = false,
  displayDashboards = true,
  displayReports = false,
  displayAccountMngmt = false,
  displayDashboardMngmt = false,
}) {
  return (
    <div>
      <nav className="flex w-full bg-[#A6192E] text-16 text-white sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-3">
        <ul className="flex h-full">
          {displayHome && (
            <li>
              <a
                href="#"
                className="h-full flex items-center p-2 border-x border-s-[#D4DFF4]/70 text-white hover:opacity-50 transition"
              >
                Home
              </a>
            </li>
          )}
          {displayAbout && (
            <li>
              <a
                href="#"
                className="h-full flex items-center p-2 border-x border-s-[#D4DFF4]/70 text-white hover:opacity-50 transition"
              >
                About
              </a>
            </li>
          )}

          {displayDashboards && (
            <li>
              <Menu className="fixed top-24 w-52 text-right">
                <MenuButton className="h-full flex items-center p-2 border-x border-s-[#D4DFF4]/70 text-white hover:opacity-50 transition ">
                  Dashboards
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                >
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                      Dashboard 1
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                      Dashboard 2
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </li>
          )}
          {/* <a
            href="#"
            className="h-full flex items-center p-16 border-x border-s-[#D4DFF4]/70 text-white hover:opacity-50 transition"
          >
            Dashboards
          </a> */}

          {displayReports && (
            <li>
              <a
                href="#"
                className="h-full flex items-center p-16 border-x border-s-[#D4DFF4]/70 text-white hover:opacity-50 transition"
              >
                Reports
              </a>
            </li>
          )}
          {displayAccountMngmt && (
            <li>
              <a
                href="#"
                className="h-full flex items-center p-16 border-x border-s-[#D4DFF4]/70 text-white hover:opacity-50 transition"
              >
                Account Management
              </a>
            </li>
          )}
          {displayDashboardMngmt && (
            <li>
              <a
                href="#"
                className="h-full flex items-center p-16 border-x border-s-[#D4DFF4]/70 text-white hover:opacity-50 transition"
              >
                Dashboard Management
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}