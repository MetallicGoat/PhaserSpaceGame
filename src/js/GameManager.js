class GameManager {

    // External use
    static version = "0.0.1";

    static gameScene;

    static resources = 0;

    static allUpgrades = [];
    static autoTargetUpgrade;
    static scannersUpgrade;
    static multiShotUpgrade;
    static multiSpawnUpgrade;
    static damageUpgrade;
    static efficiencyUpgrade;
    static luckUpgrade;

    static playerShip;
    static activeTargets = [];

    static updateSceneProgress() {
        GameManager.gameScene.updateProgress();
    }

    static useResource(amount) {
        GameManager.resources -= amount;
        GameManager.updateSceneProgress();
    }

    static addResource(amount) {
        GameManager.resources += amount;
        GameManager.updateSceneProgress();
    }

    // Internal use
    static load(gameScene) {

        // Declare game scene
        GameManager.gameScene = gameScene;

        // Load saved data
        {
            const resources = localStorage.getItem("resources");

            if (resources != null)
                GameManager.resources = parseInt(resources);
        }

        GameManager.autoTargetUpgrade = this.loadUpgrade("auto-target", "Auto Target");
        GameManager.scannersUpgrade = this.loadUpgrade("scanners", "Scanners");
        GameManager.multiShotUpgrade = this.loadUpgrade("multi-shot", "Multi Shot");
        GameManager.multiSpawnUpgrade = this.loadUpgrade("multi-spawn", "Multi Spawn");
        GameManager.damageUpgrade = this.loadUpgrade("damage", "Damage");
        GameManager.efficiencyUpgrade = this.loadUpgrade("efficiency", "Efficiency");
        GameManager.luckUpgrade = this.loadUpgrade("luck", "Luck");


        GameManager.startAutoSaveTimer();
        GameManager.startGameTicker();
    }

    // TODO move into constructor?
    static registerScene(scene) {
        if (this.scene == null) {
            this.scene = scene;
        }
    }

    static loadUpgrade(upgradeId, upgradeName) {
        const upgradeLevelString = localStorage.getItem(upgradeId);
        const upgradeLevel = upgradeLevelString != null ? parseInt(upgradeLevelString) : 0;

        const upgrade = new PlayerUpgrade(upgradeName, upgradeId, upgradeLevel);
        GameManager.allUpgrades.push(upgrade);
        return upgrade;
    }

    static startAutoSaveTimer() {
        this.autosaveTimer = setInterval(() => {
            console.log("Autosaving...");

            // Save currency
            localStorage.setItem("resources", GameManager.resources.toString());

            // Save Upgrades
            GameManager.allUpgrades.forEach(upgrade => localStorage.setItem(upgrade.getId(), upgrade.getCurrentLevel()));

        }, 5000);
    }

    static startGameTicker() {
        this.gameTicker = setInterval(() => {

            if(GameManager.gameScene != null) {

                GameManager.playerShip.runUpdate();

                // Auto fire test
                if (GameManager.activeTargets.length > 0 && Phaser.Math.Between(0, 100) > 99) {
                    GameManager.playerShip.destroyRandom(GameManager.activeTargets);
                }

                if (GameManager.activeTargets.length < 10000 && Phaser.Math.Between(0, 100) > 99 - GameManager.scannersUpgrade.getCurrentLevel()) {
                    new TargetResource({
                        scene: GameManager.gameScene,
                        x: Phaser.Math.Between(0, GameManager.gameScene.gameBoxWidth),
                        y: -20,
                        scale: config.scale
                    });
                }
            }
        }, 20);
    }
}