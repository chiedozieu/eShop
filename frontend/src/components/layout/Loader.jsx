import React from "react"; 
import { Player } from '@lottiefiles/react-lottie-player'; 
import animationData from "../../assets/animations/Animation - 1725548360957.json";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: '300px', width: '300px' }}
      />
    </div>
  );
}

export default Loader;
