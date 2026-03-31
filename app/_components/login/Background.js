import Image from "next/image";

export default function Background() {
  return (
    <Image
      alt="GBTAC Building"
      src="/login/IMG_1439.jpg"
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: "cover",
      }}
    />
  );
}
