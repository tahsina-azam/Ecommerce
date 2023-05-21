import { LottieAnimationType, LottieOptions } from "@/lib/lotties";
import Lottie from "react-lottie";

type Props = {
  type: LottieAnimationType;
  height?: number;
  width?: number;
};

const LottieAnimation = ({ type, height = 400, width = 400 }: Props) => {
  const options = LottieOptions[type];

  return <Lottie options={options} height={height} width={width} />;
};

export default LottieAnimation;
