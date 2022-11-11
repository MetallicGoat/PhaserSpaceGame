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
        //const upgrade = new PlayerUpgrade("Test Upgrade");
        let space = 70;

        for(let upgrade of PlayerData.upgrades){
            const button = upgrade.buildButton(this.scene, this.width, space);

            this.add(button);
            space += 70 + 30;
        }
    }
}