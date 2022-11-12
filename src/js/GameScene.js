class GameScene extends Phaser.Scene {
  constructor() {
    super("playGame");
    GameData.registerScene(this);
  }

  create() {
    this.loadAnimations();

    this.gameBoxWidth = config.width * (3/4);
    this.background = this.add.tileSprite(0, 0, this.gameBoxWidth, config.height, "background");
    this.background.setScale(2);

    this.screenText = this.add.text(30, 20, GameData.resources.toString(), {
      font: "25px Arial",
      fill: "yellow"
    }).setDepth(10).setScale(3);

    this.player = new PlayerShip({scene:this, x:this.gameBoxWidth/2, y:config.height*.8});
    this.input.on('gameobjectdown', this.destroyShip, this);

    this.upgradesMenu = new UpgradesMenu({scene: this, x: this.gameBoxWidth, y: 0, width: config.width - this.gameBoxWidth, height: config.height});
  }

  update() {
    this.player.runUpdate();
    const allShips = this.children.list.filter(sprite => (sprite instanceof TargetResource));

    // Auto fire test
    if(allShips.length > 0 && Phaser.Math.Between(0, 100) > 99){
      this.player.destroyRandom(allShips);
    }

    if(allShips.length < 10000 && Phaser.Math.Between(0, 100) > 100 - GameData.scannersUpgrade.getCurrentLevel()){
      new TargetResource({scene:this, x:Phaser.Math.Between(0, this.gameBoxWidth), y:-20, scale: config.scale});
    }

    allShips.forEach(ship => {
      ship.runUpdate();
    })

    this.background.tilePositionY -= 0.5;

  }

  updateProgress() {
    this.screenText.setText(GameData.resources.toString());
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
