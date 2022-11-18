export class Bullet {
    #id;
    #radius;
    #coordX;
    #coordY;
    #vector;
    #health;
    #damage;
    #speed;
    constructor(radius, vector, position, speed, health, damage) {
        this.#id = `${new Date().getTime()}${Math.random()}`.replace('.', '');
        this.#radius = radius;
        this.#coordX = position[0];
        this.#coordY = position[1] - radius * 2;
        this.#vector = vector;
        this.#speed = speed;
        this.#health = health;
        this.#damage = damage;
    }
    move(vector = null) {
        if (vector !== null) {
            this.#vector = vector;
        }
        this.#coordX += this.#vector[0] * this.#speed;
        this.#coordY += this.#vector[1] * this.#speed;
    }
    changeHealth(delta) {
        this.#health += delta;
        if (this.#health >= this.#health) {
            this.#health = this.#health
        }

    }
    getDamage() {
        return this.#damage;
    }
    getHealth() {
        return this.#health;
    }
    getHitbox() {
        return 'circle'
    }

    getWidth() {
        return this.#radius * 2;
    }
    getHeight() {
        return this.#radius * 2;
    }
    getCoords() {
        return [this.#coordX, this.#coordY];
    }
    getBackground() {
        return '../images/spaceship.png'
    }
    getId() {
        return this.#id;
    }
    getObjectType() {
        return 'bullet';
    }
}