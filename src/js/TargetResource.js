let texture = [{texture: "ship", animation: "ship1_anim"}, /*{texture: "ship2", animation: "ship2_anim"}, */ {texture: "ship3", animation: "ship3_anim"}];

class TargetResource extends Phaser.GameObjects.Sprite {
    constructor(config) {
        const shipType = Phaser.Math.Between(0, 1);

        super(config.scene, config.x, config.y, texture[shipType].texture);
        config.scene.add.existing(this);
        GameManager.activeTargets.push(this);

        this.depth = 0;
        this.scene = config.scene;
        this.speed = Phaser.Math.Between(1, 6);
        this.exploding = false;
        this.setScale(3);
        this.setInteractive({ useHandCursor: true });
        this.play(texture[shipType].animation);
        this.on('animationcomplete', this.kill, this)
    }

    kill(){
        this.destroy();

        // Remove ship from array
        const pos = GameManager.activeTargets.indexOf(this);
        GameManager.activeTargets.splice(pos, 1);
    }

    explode(){
        this.exploding = true;
        this.setTexture("explosion");
        this.play("explode");
        GameManager.addResource(1);
    }

    moveShip() {
        this.y += this.speed;

        if (this.y > config.height + this.height) {
            this.kill();

            if(this.line != null)
                this.line.destroy();
        }
    }
}