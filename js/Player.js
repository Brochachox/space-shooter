export class Player {
    #id;
    #config;
    #coordX;
    #coordY;
    #health;
    #speed;
    #gun;
    #damage;
    constructor(config, position = [0, 0], gun = null) {
        this.#id = `${new Date().getTime()}${Math.random()}`.replace('.', '');
        this.#config = config;
        this.#coordX = position[0];
        this.#coordY = position[1];
        this.#health = this.#config.health;
        this.#speed = config.speed;
        this.#gun = gun;
        this.#damage = this.#config.damage;
    }
    move(vector) {
        this.#coordX += vector[0] * this.#speed;
        this.#coordY += vector[1] * this.#speed;
    }
    setSpeed(speed) {
        this.#speed = speed;
    }
    getCoords() {
        return [this.#coordX, this.#coordY];
    }
    getWidth() {
        return this.#config.width;
    }
    getHeight() {
        return this.#config.height;
    }
    getHitbox() {
        return this.#config.hitbox;
    }
    changeHealth(delta) {
        this.#health += delta;
        if (this.#health >= this.#config.health) {
            this.#health = this.#config.health
        }

    }
    getDamage() {
        return this.#damage;
    }
    getHealth() {
        return this.#health;
    }
    getHitbox() {
        return this.#config.hitbox
    }
    fire() {
        return this.#gun?.fire([this.#coordX + this.getWidth() / 2, this.#coordY]) ?? [];
    }
    changeGun(gun) {
        this.#gun = gun;
    }
    gunIsEmpty() {
        return this.#gun.isEmpty();
    }
    getBackground() {
        return this.#config.background
    }
    getId() {
        return this.#id;
    }
    getObjectType() {
        return 'player';
    }
    getGunAmmoCount() {
        return this.#gun.getAmmoCount()
    }
}

