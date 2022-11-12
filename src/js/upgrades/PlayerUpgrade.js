class PlayerUpgrade {
    constructor(upgradeName, startLevel) {
        this.upgradeName = upgradeName;
        this.currentLevel = startLevel;
    }

    getName(){
        return this.upgradeName;
    }

    buildButton(scene, width, yOffset){
        const container = new Phaser.GameObjects.Container(scene, width/2, yOffset);

        const buttonWidth = width * (6/7);
        const rect = new Phaser.GameObjects.Rectangle(scene, 0, 0, buttonWidth, 90, 0x9966FF);

        container.add(rect);

        this.buttonText = new Phaser.GameObjects.Text(scene, 0, 0, "Loading...", {fontSize: 30}).setOrigin(.5).setPosition(0, -13);
        container.add(this.buttonText);
        container.add(new Phaser.GameObjects.Text(scene, 0, 0, "Cost: 1000", {fontSize: 22}).setOrigin(.5).setPosition(0, 22));

        // Use logic
        {
            // Otherwise hover wont work
            rect.setInteractive({ useHandCursor: true })

            // Click
            rect.on("pointerdown", () => {
                if(this.canAfford()) {
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

    canAfford() {
        return true;
    }

    doUpgrade() {
        this.currentLevel += 1;
        this.updateButtonText();
    }

    updateButtonText(){
        this.buttonText.setText(this.upgradeName + " - " + this.currentLevel);
    }

    getCurrentLevel() {
        return this.currentLevel;
    }
}