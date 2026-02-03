import SecondaryNav from "@/app/_components/SecondaryNav";
import Navbar from "@/app/_components/Navbar";



export default function Page() {
  return (
    <main className="bg-gray-50 min-h-screen">
        <SecondaryNav />
        <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-10  dark:text-black" style={{ fontFamily: "var(--font-titillium)" }}>
          Natural Gas and Electricity Consumption Dashboard
        </h1>
        {/* Additional content can be added here */}
      </div>
    </main>
  );
}