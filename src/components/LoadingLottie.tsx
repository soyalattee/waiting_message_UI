import { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../jsons/Animation.json";
export default function LoadingLottie() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={isPlaying}
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
}
