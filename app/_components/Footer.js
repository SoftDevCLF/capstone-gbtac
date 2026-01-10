import Image from "next/image";
export default function Footer() {
  return (
    <div className="w-full bg-[#6D2077] border-t border-[#6D2077] py-4">
      <p className="text-right text-[#F1FAF5] ">
        {new Date().getFullYear()}. Capstone Project for GBTAC, SAIT.
      </p>
      <div>
        {" "}
        <Image
          src="/sait_extended_horizontal_reverse.png"
          alt="Logo"
          width={80}
          height={80}
        />
      </div>
    </div>
  );
}
