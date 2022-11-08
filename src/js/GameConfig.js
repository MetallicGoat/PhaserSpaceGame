let scale = 3;
let width = 256 * scale;
let height = 272 * scale;

const config = {
    scale: scale,
    width: width,
    height: height,
    backgroundColor: 0x000000,
    scene: [LoadScene, GameScene],
    pixelArt: true,

    // set the physics to arcade
    // TODO why is this necessary?
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
};

const gameConfig = new Phaser.Game(config);