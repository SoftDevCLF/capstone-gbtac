import Image from "next/image";
export default function Footer() {
  return (
    <div className="w-full bg-[#6D2077] border-t border-[#6D2077] flex flex-row justify-between items-center gap-5 px-4 py-3 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <div className="text-[#F1FAF5] text-xs md:text-lg">
        <p>{new Date().getFullYear()}. Capstone Project for GBTAC, SAIT.</p>
      </div>
      <div className="relative w-[60px] sm:w-[65px] md:w-[70px] lg:w-[75px] h-[42px]">
        <Image
          src="/collegiate_logo_white2.png"
          alt="Logo"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
