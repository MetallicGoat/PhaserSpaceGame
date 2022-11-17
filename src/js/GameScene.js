class GameScene extends Phaser.Scene {
  constructor() {
    super("playGame");
    GameManager.registerScene(this);
  }

  create() {
    this.loadAnimations();
    GameManager.load(this);

    this.gameBoxWidth = config.width * (3/4);
    this.background = this.add.tileSprite(0, 0, this.gameBoxWidth, config.height, "background");
    this.background.setScale(2);

    this.screenText = this.add.text(30, 20, GameManager.resources.toString(), {
      font: "25px Arial",
      fill: "yellow"
    }).setDepth(10).setScale(3);

    this.player = new PlayerShip({scene:this, x:this.gameBoxWidth/2, y:config.height*.8});
    GameManager.playerShip = this.player;

    this.input.on('gameobjectdown', this.destroyShip, this);

    this.upgradesMenu = new UpgradesMenu({scene: this, x: this.gameBoxWidth, y: 0, width: config.width - this.gameBoxWidth, height: config.height});
  }

  update() {
    this.background.tilePositionY -= .5;

    GameManager.activeTargets.forEach(ship => {
      ship.moveShip();
    });
  }

  updateProgress() {
    this.screenText.setText(GameManager.resources.toString());
  }

  destroyShip(pointer, gameObject) {
    if(gameObject instanceof TargetResource)
      this.player.fireWeapon(gameObject);
  }

  loadAnimations(){
    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 1,
    });
  }
}
