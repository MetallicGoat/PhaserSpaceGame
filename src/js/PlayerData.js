class PlayerData {

    static upgrades = [];

    constructor() {
        PlayerData.upgrades.push(new PlayerUpgrade("Auto Target", 0))
        PlayerData.upgrades.push(new PlayerUpgrade("Scanners", 0))
        PlayerData.upgrades.push(new PlayerUpgrade("Multi Shot", 0))
        PlayerData.upgrades.push(new PlayerUpgrade("Multi Spawn", 0))
        PlayerData.upgrades.push(new PlayerUpgrade("Damage", 0))
        PlayerData.upgrades.push(new PlayerUpgrade("Efficiency", 0))
        PlayerData.upgrades.push(new PlayerUpgrade("Luck", 0))
    }



}