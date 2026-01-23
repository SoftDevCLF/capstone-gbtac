import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1C232C] text-white py-4 px-6 mt-12">
      <div className="flex items-center justify-between">
        {/* Left - Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="hover:opacity-80">
            FB
          </a>
          <a href="#" className="hover:opacity-80">
            IG
          </a>
          <a href="#" className="hover:opacity-80">
            X
          </a>
        </div>

        <p className="text-sm text-center grow">
          Green Building Technology Access Centre - SAIT
        </p>

        {/* Right - Logo */}
        <Image src="/sait-logo.png" alt="SAIT Logo" height={40} width={40} />
      </div>
    </footer>
  );
}
