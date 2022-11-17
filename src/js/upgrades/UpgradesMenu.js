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
        // const upgrade = new PlayerUpgrade("Test Upgrade");
        let space = 70;

        for(let upgrade of GameManager.allUpgrades){
            const button = upgrade.buildButton(this.scene, this.width, space);

            this.add(button);
            space += 70 + 50;
        }

        this.add(this.buildMoneyButton(this.scene, this.width, space))
        space += 70 + 20
        this.add(this.buildResetButton(this.scene, this.width, space))
    }

    buildMoneyButton(scene, width, yOffset){
        const container = new Phaser.GameObjects.Container(scene, width/2, yOffset);

        const buttonWidth = width * (6/7);
        const rect = new Phaser.GameObjects.Rectangle(scene, 0, 0, buttonWidth, 70, 0xbf4e4e);

        container.add(rect);

        const buttonNameText = new Phaser.GameObjects.Text(scene, 0, 0, "Give Money", {fontSize: 30}).setOrigin(.5);
        container.add(buttonNameText);

        // Use logic
        {
            // Otherwise hover wont work
            rect.setInteractive({ useHandCursor: true })

            // Click
            rect.on("pointerdown", () => {
                //if(this.canBuy()) {
                rect.setFillStyle(0x6444aa);
                GameManager.addResource(1000);
                //}
            });

            // Hover
            rect.on('pointerover', () => {
                rect.setStrokeStyle(4, 0xefc53f)}
            );

            // Reset
            rect.on("pointerup", () => {
                rect.setFillStyle(0xbf4e4e);
            })

            // Reset
            rect.on("pointerout", () => {
                rect.setStrokeStyle(0);
                rect.setFillStyle(0xbf4e4e);
            })
        }

        return container;
    }


    buildResetButton(scene, width, yOffset){
        const container = new Phaser.GameObjects.Container(scene, width/2, yOffset);

        const buttonWidth = width * (6/7);
        const rect = new Phaser.GameObjects.Rectangle(scene, 0, 0, buttonWidth, 70, 0x9966FF);

        container.add(rect);

        const buttonNameText = new Phaser.GameObjects.Text(scene, 0, 0, "Reset Game", {fontSize: 30}).setOrigin(.5);
        container.add(buttonNameText);

        // Use logic
        {
            // Otherwise hover wont work
            rect.setInteractive({ useHandCursor: true })

            // Click
            rect.on("pointerdown", () => {
                //if(this.canBuy()) {
                rect.setFillStyle(0x6444aa);
                localStorage.clear();
                //}
            });

            // Hover
            rect.on('pointerover', () => {
                rect.setStrokeStyle(4, 0xefc53f)}
            );

            // Reset
            rect.on("pointerup", () => {
                rect.setFillStyle(0x9966FF);
            })

            // Reset
            rect.on("pointerout", () => {
                rect.setStrokeStyle(0);
                rect.setFillStyle(0x9966FF);
            })
        }

        return container;
    }
}