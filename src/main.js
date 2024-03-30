import Phaser from "phaser";

import Level from "./scenes/Level";
import UI from "./scenes/UI";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1920,
      height: 1080,
    },
  },
  physics: {
    default: "matter",
    enableSleeping: true,
    matter: {
      gravity: { y: 0, x: 0 },
      debug: true,
    },
  },
  scene: [Level, UI],
};

export default new Phaser.Game(config);
