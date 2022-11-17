class PlayerUpgrade {
    constructor(upgradeName, upgradeId, startLevel) {
        this.upgradeName = upgradeName;
        this.upgradeId = upgradeId;
        this.currentLevel = startLevel;
    }

    getName() {
        return this.upgradeName;
    }

    getId() {
        return this.upgradeId;
    }

    buildButton(scene, width, yOffset){
        const container = new Phaser.GameObjects.Container(scene, width/2, yOffset);

        const buttonWidth = width * (6/7);
        const rect = new Phaser.GameObjects.Rectangle(scene, 0, 0, buttonWidth, 90, 0x9966FF);

        container.add(rect);

        this.buttonNameText = new Phaser.GameObjects.Text(scene, 0, 0, "Loading...", {fontSize: 30}).setOrigin(.5).setPosition(0, -13);
        container.add(this.buttonNameText);
        this.buttonCostText = new Phaser.GameObjects.Text(scene, 0, 0, "Loading...", {fontSize: 22}).setOrigin(.5).setPosition(0, 22)
        container.add(this.buttonCostText);

        // Use logic
        {
            // Otherwise hover wont work
            rect.setInteractive({ useHandCursor: true })

            // Click
            rect.on("pointerdown", () => {
                if(this.canBuy()) {
                    rect.setFillStyle(0x6444aa);
                    this.doUpgrade();
                }
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

        this.updateButtonText();
        return container;
    }

    canBuy() {
        return (GameManager.resources - this.getCost()) >= 0;
    }

    doUpgrade() {
        if(this.canBuy()) {
            this.currentLevel += 1;
            GameManager.resources -= this.getCost();

            // Update display Info
            GameManager.updateSceneProgress();
            this.updateButtonText();
        }
    }

    updateButtonText(){
        this.buttonNameText.setText(this.upgradeName + " - " + this.currentLevel);
        this.buttonCostText.setText("Cost: " + this.getCost());
    }

    getCurrentLevel() {
        return this.currentLevel;
    }

    getCost() {
        return Math.floor(5 * Math.pow(1.25, this.currentLevel + 1));
    }
}