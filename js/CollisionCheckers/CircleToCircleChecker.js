import { CollisionChecker } from "./CollisionChecker.js";
export class CircleToCircleChecker extends CollisionChecker {
    checkCollision(obj1, obj2) {
        if ((obj1.getHitbox() == 'circle') && (obj2.getHitbox() == 'circle')) {
            return (

                (((obj1.getCoords()[0] + obj1.getWidth() / 2) - (obj2.getCoords()[0] + obj2.getWidth() / 2)) ** 2
                    + ((obj1.getCoords()[1] + obj1.getHeight() / 2) - (obj2.getCoords()[1] + obj2.getHeight() / 2)) ** 2)
                < (obj1.getWidth() / 2 + obj2.getWidth() / 2) ** 2
            )
        }
        return super.checkCollision(obj1, obj2);
    }
}