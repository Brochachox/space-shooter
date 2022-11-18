export class Enemy {
    #id;
    #config;
    #coordX;
    #coordY;
    #health;
    #speed;
    #vector;
    #gun;
    #damage;
    constructor(config, position = [0, 0], vector = [0, 0], gun = null) {
        this.#id = `${new Date().getTime()}${Math.random()}`.replace('.', '');
        this.#config = config;
        this.#health = this.#config.health;
        this.#coordX = position[0];
        this.#coordY = position[1];
        this.#speed = config.speed;
        this.#gun = gun;
        this.#vector = vector;
        this.#damage = config.damage;
    }
    move(vector = null) {
        if (vector !== null) {
            this.#vector = vector;
        }
        this.#coordX += this.#vector[0] * this.#speed;
        this.#coordY += this.#vector[1] * this.#speed;
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
    fire() {
        this.#gun.fire();
    }
    getHitbox() {
        return this.#config.hitbox
    }
    getBackground() {
        return this.#config.background
    }
    getId() {
        return this.#id;
    }
    getObjectType() {
        return 'enemy';
    }
}

