import Image from "next/image";

type Icon = "shopping-cart" | "chevron-left" | "logo";
const makeUrl = (name: string) => `${name}.svg`;

const Svg = ({ icon }: { icon: Icon }) => {
  const src = makeUrl(icon);
  return <Image src={src} alt="" width={600} height={600} />;
};

export default Svg;
