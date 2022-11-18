import { CollisionChecker } from "./CollisionChecker.js";
export class RectToRectChecker extends CollisionChecker {
    checkCollision(obj1, obj2) {
        if ((obj1.getHitbox() == 'rect') && (obj2.getHitbox() == 'rect')) {
            return (
                obj1.getCoords()[0] < obj2.getCoords()[0] + obj2.getWidth() &&
                obj1.getCoords()[0] + obj1.getWidth() > obj2.getCoords()[0] &&
                obj1.getCoords()[1] < obj2.getCoords()[1] + obj2.getHeight() &&
                obj1.getHeight() + obj1.getCoords()[1] > obj2.getCoords()[1]
            )

        }
        return super.checkCollision(obj1, obj2);
    }
}