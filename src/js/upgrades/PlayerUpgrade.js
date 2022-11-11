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

        const buttonWidth = width * (5/7);
        const rect = new Phaser.GameObjects.Rectangle(scene, 0, 0, buttonWidth, 70, 0x9966FF);

        container.add(rect);
        container.add(new Phaser.GameObjects.Text(scene, 0, 0, this.upgradeName, {fontSize: 30}).setOrigin(.5));

        // Use logic
        {
            // Otherwise hover wont work
            rect.setInteractive({useHandCursor: true})

            // Click
            rect.on("pointerdown", () => {
                rect.setFillStyle(0x6444aa);
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