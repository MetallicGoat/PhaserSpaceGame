let texture = [{texture: "ship", animation: "ship1_anim"}, /*{texture: "ship2", animation: "ship2_anim"}, */ {texture: "ship3", animation: "ship3_anim"}];

class TargetResource extends Phaser.GameObjects.Sprite {
    constructor(config) {
        const shipType = Phaser.Math.Between(0, 1);

        super(config.scene, config.x, config.y, texture[shipType].texture);
        config.scene.add.existing(this);

        this.depth = 0;
        this.scene = config.scene;
        this.speed = Phaser.Math.Between(1, 10);
        this.exploding = false;
        this.setScale(3);
        this.setInteractive();
        this.play(texture[shipType].animation);
        this.on('animationcomplete', this.kill, this)
    }

    kill(){
        this.destroy();
    }

    explode(){
        this.exploding = true;
        this.setTexture("explosion");
        this.play("explode");
        this.scene.addResource(1);
    }
    runUpdate(){
        this.moveShip();
    }

    moveShip() {
        this.y += this.speed;

        if (this.y > config.height + this.height) {
            this.destroy();

            if(this.line != null)
                this.line.destroy();
        }
    }
}