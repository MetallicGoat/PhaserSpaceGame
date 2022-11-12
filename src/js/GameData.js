class GameData {

    // External use
    static resources = 0;

    static allUpgrades = [];
    static autoTargetUpgrade;
    static scannersUpgrade;
    static multiShotUpgrade;
    static multiSpawnUpgrade;
    static damageUpgrade;
    static efficiencyUpgrade;
    static luckUpgrade;

    static useResource(amount){
        GameData.resources -= amount;
        this.scene.updateProgress();
    }

    static addResource(amount){
        GameData.resources += amount;
        this.scene.updateProgress();
    }

    // Internal use
    constructor() {
        {
            const resources = localStorage.getItem("resources");

            if (resources != null)
                GameData.resources = parseInt(resources);
        }

        GameData.autoTargetUpgrade = this.loadUpgrade("auto-target", "Auto Target");
        GameData.scannersUpgrade = this.loadUpgrade("scanners", "Scanners");
        GameData.multiShotUpgrade = this.loadUpgrade("multi-shot", "Multi Shot");
        GameData.multiSpawnUpgrade = this.loadUpgrade("multi-spawn", "Multi Spawn");
        GameData.damageUpgrade = this.loadUpgrade("damage", "Damage");
        GameData.efficiencyUpgrade = this.loadUpgrade("efficiency", "Efficiency");
        GameData.luckUpgrade = this.loadUpgrade("luck", "Luck");

        this.enableAutoSave()
    }

    // TODO move into constructor?
    static registerScene(scene) {
        if (this.scene == null) {
            this.scene = scene;
        }
    }

    loadUpgrade(upgradeId, upgradeName){
        const upgradeLevelString = localStorage.getItem(upgradeId);
        const upgradeLevel = upgradeLevelString != null ? parseInt(upgradeLevelString) : 0;

        const upgrade = new PlayerUpgrade(upgradeName, upgradeLevel);
        GameData.allUpgrades.push(upgrade);
        return upgrade;
    }

    enableAutoSave() {
        this.autosaveTimer = setInterval(() => {
            console.log("Autosaving...");

            // Save currency
            localStorage.setItem("resources", GameData.resources.toString());
        }, 5000);
    }
}