import { Bullet } from './Bullet.js'

export class BulletsFactory {
    constructor(config, position) {
        return new Bullet(config, position)
    }
}