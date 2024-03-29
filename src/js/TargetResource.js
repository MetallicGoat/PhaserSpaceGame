let texture = [{texture: "ship", animation: "ship1_anim"}, /*{texture: "ship2", animation: "ship2_anim"}, */ {texture: "ship3", animation: "ship3_anim"}];

class TargetResource extends Phaser.GameObjects.Sprite {
    constructor(config) {
        const shipType = texture[Phaser.Math.Between(0, texture.length - 1)];

        super(config.scene, config.x, config.y, shipType.texture);
        config.scene.add.existing(this);
        GameManager.activeTargets.push(this);

        this.depth = 0;
        this.scene = config.scene;
        this.exploding = false;
        this.setScale(3);
        this.setInteractive({ useHandCursor: true });
        this.play(shipType.animation);
        this.on('animationcomplete', this.kill, this)
        this.buildMoves(Phaser.Math.Between(2000, 16000));
    }

    buildMoves(timeAlive){
        const amountOfMoves = (timeAlive / 20);
        this.moveAmount = (config.height + this.height) / amountOfMoves;
    }

    addTarget(){
        this.target = this.scene.add.image(this.x, this.y, 'target').setScale(.9).setDepth(5);
    }

    killTarget(){
        if(this.target != null)
            this.target.destroy();
    }

    kill(){
        this.killTarget();
        this.destroy();

        // Remove ship from array
        const pos = GameManager.activeTargets.indexOf(this);
        GameManager.activeTargets.splice(pos, 1);
    }

    explode(){
        this.exploding = true;
        this.killTarget();
        this.setTexture("explosion");
        this.play("explode");
        GameManager.addResource(1);
    }

    moveShip() {
        this.y += this.moveAmount;

        if(this.target != null)
            this.target.y = this.y;

        if (this.y > config.height + this.height) {
            this.kill();

            if(this.line != null)
                this.line.destroy();
        }
    }
}