class UpgradesMenu extends Phaser.GameObjects.Container {

    constructor(config) {
        super(config.scene, config.x, config.y);
        this.scene.add.existing(this);

        this.width = config.width;
        this.height = config.height;

        this.upgradeBackground = this.add(
            new Phaser.GameObjects.Rectangle(this.scene, 0, 0, config.width, config.height, 0x6666ff).setOrigin(0, 0)
        ).setDepth(10);

        this.buildUpgradeButtons()
    }

    buildUpgradeButtons(){
        // Build menu
        let space = 70
        for(let i = 0; i < 8; i++){
            const rect = new Phaser.GameObjects.Rectangle(this.scene, this.width/2, space, this.width * (5/7), 70, 0x9966FF)
            rect.setInteractive({ useHandCursor: true })
            rect.on("pointerdown", () => {
                rect.setStrokeStyle(4, 0xefc53f);
            });

            rect.on('pointerover', () => rect.setStrokeStyle(4, 0xefc53f))

            rect.on("pointerup", () => {
                rect.setStrokeStyle(0);
            })

            rect.on("pointerout", () => {
                rect.setStrokeStyle(0);
            })

            //rect.on("gameobjectdown", this.runAction, this)

            this.add(rect);
            space += 70 + 30;
        }
    }
    runAction(){
        console.log("click button")
    }
}