
let destroyAmount = 0;
let screenText;

class GameScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.loadAnimations();

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setScale(config.scale);
    this.background.setOrigin(0, 0);

    screenText = this.add.text(20, 20, destroyAmount.toString(), {
      font: "25px Arial",
      fill: "yellow"
    }).setDepth(10);

    this.player = new PlayerShip({scene:this, x:config.width/2, y:config.height*.8, scale: config.scale * 1.5});
    this.input.on('gameobjectdown', this.destroyShip, this);


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

  update() {
    this.player.runUpdate();
    const allShips = this.children.list.filter(x => x instanceof TargetResource);

    // Auto fire test
    if(allShips.length !== 0 && Phaser.Math.Between(0, 100) > 99){
      this.destroyShip(null, allShips[Math.floor(Math.random()*allShips.length)]);
    }

    if(allShips.length < 10000 && Phaser.Math.Between(0, 100) > 98){
      new TargetResource({scene:this, x:Phaser.Math.Between(0, gameConfig.config.width), y:-20, scale: config.scale});
    }

    allShips.forEach(ship => {
      ship.runUpdate();
    })

    this.background.tilePositionY -= 0.5;

  }

  destroyShip(pointer, gameObject) {
    if(gameObject instanceof TargetResource) {
      this.player.fireWeapon(gameObject);
      destroyAmount++;
      screenText.setText(destroyAmount);
    }
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
