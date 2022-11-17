class LoadScene extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){

    // localStorage.getItem("");

    this.load.image("background", "src/assets/images/img.png");

    this.load.spritesheet("ship", "src/assets/spritesheets/ship.png",{
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet("ship2", "src/assets/spritesheets/ship2.png",{
      frameWidth: 32,
      frameHeight: 16
    });

    this.load.spritesheet("ship3", "src/assets/spritesheets/ship3.png",{
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("explosion", "src/assets/spritesheets/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet("power-up", "src/assets/spritesheets/power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    });
  }

  create() {
    this.add.text(20, 20, "Loading gameConfig...");
    this.scene.start("playGame");
  }
}
