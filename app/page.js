import SecondaryNav from "./_components/SecondaryNav";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <SecondaryNav />
      <Navbar />
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        main
      </main>
      <Footer />
    </div>
  );
}
