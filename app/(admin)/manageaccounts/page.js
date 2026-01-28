import SecondaryNav from "@/app/_components/SecondaryNav";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import AccountsTable from "./components/AccountsTable";


export default function Page() {
  return (
    <main className="bg-gray-50 min-h-screen">
        <SecondaryNav />
        <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-10  dark:text-black" style={{ fontFamily: "var(--font-titillium)" }}>
          Manage Accounts
        </h1>

        {/* // Import and use the AccountsTable component */}

          <AccountsTable />

  
      </div>
        <Footer />
    </main>

  );
}
