//Page for Customizable Graph Section
import SecondaryNav from "@/app/_components/SecondaryNav";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import GraphControl from "./components/GraphControl";
import SensorSearch from "./components/SensorSearch";
import SelectedSensors from "./components/SelectedSensors";
import GraphContainer from "./components/GraphContainer";

export default function Page() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <SecondaryNav />
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-10 dark:text-black"
          style={{ fontFamily: "var(--font-titillium)" }}>
          Create Custom Chart
        </h1>
        <GraphControl />
        <div className="flex gap-4">
          <SensorSearch />
          <SelectedSensors />
        </div>
        <GraphContainer />
      </div>
      <Footer />
    </main>
  );
}
