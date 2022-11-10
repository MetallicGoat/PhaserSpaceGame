
let destroyAmount = 0;
let screenText;

class GameScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.loadAnimations();
    this.loadData();
    this.enableAutoSave();

    this.gameBoxWidth = config.width * (3/4);

    this.background = this.add.tileSprite(0, 0, this.gameBoxWidth, config.height, "background");
    this.background.setScale(2);

    screenText = this.add.text(30, 20, destroyAmount.toString(), {
      font: "25px Arial",
      fill: "yellow"
    }).setDepth(10).setScale(3);

    this.player = new PlayerShip({scene:this, x:this.gameBoxWidth/2, y:config.height*.8});
    this.input.on('gameobjectdown', this.destroyShip, this);

    this.upgradesMenu = new UpgradesMenu({scene: this, x: this.gameBoxWidth, y: 0, width: config.width - this.gameBoxWidth, height: config.height});
    //this.add.rectangle(this.gameBoxWidth, 0, config.width - this.gameBoxWidth, config.height,0x9966ff).setOrigin(0, 0).setDepth(10);
    //this.add.container(this.gameBoxWidth, 0).add(new Phaser.GameObjects.Rectangle(this, 0, 0, config.width - this.gameBoxWidth, config.height, 0x9966ff).setOrigin(0, 0));
    //this.add.c;
    //new Phaser.GameObjects.Rectangle(this, 0, 0, config.width - this.gameBoxWidth, config.height, 0x9966ff);

    // POWER UPS
    /*
    this.physics.world.setBoundsCollision();

    this.powerUps = this.physics.add.group();

    // multiple objects
    const maxObjects = 4;
    for (let i = 0; i <= maxObjects; i++) {
      const powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
       powerUp.setRandomPosition(0, 0, gameConfig.config.width, gameConfig.config.height);

      // set random animation
      if (Math.random() > 0.5) {
        powerUp.play("red");
      } else {
        powerUp.play("gray");
      }

      // setVelocity
      powerUp.setVelocity(100, 100);
      powerUp.setCollideWorldBounds(true);
     powerUp.setBounce(1);

    }

     */
    /*
    allSprites.forEach(sprite => {
      if(sprite instanceof TargetResource){
        console.log("yay");
      }

      sprite.on('animationcomplete', test => {
        // console.log("Animation complete");
        // console.log(test);
        this.resetShipPos(sprite);
      })
    })

     */
  }

  loadData() {
    const resources = localStorage.getItem("resources");

    if(resources != null)
      destroyAmount = parseInt(resources);
  }

  enableAutoSave() {
    this.autosaveTimer = setInterval(function() {
      console.log("Autosaving...");
      localStorage.setItem("resources", destroyAmount.toString());
    }, 5000);
  }


  update() {
    this.player.runUpdate();
    const allShips = this.children.list.filter(sprite => (sprite instanceof TargetResource));

    // Auto fire test
    if(allShips.length > 0 && Phaser.Math.Between(0, 100) > 99){
      this.player.destroyRandom(allShips);
    }

    if(allShips.length < 10000 && Phaser.Math.Between(0, 100) > 98){
      new TargetResource({scene:this, x:Phaser.Math.Between(0, this.gameBoxWidth), y:-20, scale: config.scale});
    }

    allShips.forEach(ship => {
      ship.runUpdate();
    })

    this.background.tilePositionY -= 0.5;

  }

  addResource(amount){
    destroyAmount += amount;
    screenText.setText(destroyAmount);
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

    /*
    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });
     */
  }
}
