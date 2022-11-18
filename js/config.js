export const gameConfig = {
    worldConfig: {
        width: 1280,
        height: 720,
        background: 'black'
    },
    playerConfig: {
        width: 100,
        height: 100,
        hitbox: 'circle',
        background: '../images/spaceship.png',
        speed: 10,
        health: 1,
        damage: 1
    },
    enemiesConfig: {
        asteroid: {
            width: 50,
            height: 50,
            hitbox: 'circle',
            background: '../images/asteroid.png',
            speed: 0.5,
            health: 1,
            damage: 1
        }
    },
    weaponsConfig: {
        standart: {
            damage: 1,
            reloadTime: 1000
        }
    }
}