const weaponsFiring = new Map();

class PlayerShip extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, "ship2");
        config.scene.add.existing(this);

        this.depth = 10;
        this.scene = config.scene;
        this.flipY = true;
        this.setScale(config.scale);
        this.setInteractive();
        this.play("ship2_anim");
    }


    fireWeapon(target){
        // Already shooting there
        if(weaponsFiring.has(target) || target.exploding)
            return;

        const weapon = this.scene.add.line(5, 5, this.x, this.y, target.x, target.y, 0xff0000).setOrigin(0, 0).setLineWidth(5).setDepth(5);
        weaponsFiring.set(target, weapon);

        setTimeout(() => {
            weaponsFiring.delete(target);
            weapon.destroy();

            // Could have let screen while shooting
            if(target.active) {
                target.explode();
            }
        }, 700)

    }

    runUpdate(){
        // Update weapon positions
        for (const [target, weapon] of weaponsFiring.entries()) {
            if(target.active && weapon.active){
                weapon.setTo(this.x, this.y, target.x, target.y);
            }
        }
    }
}