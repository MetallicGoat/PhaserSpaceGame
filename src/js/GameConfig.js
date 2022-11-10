let width = 425 * 4;
let height = 272 * 4;

const config = {
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT
    },

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