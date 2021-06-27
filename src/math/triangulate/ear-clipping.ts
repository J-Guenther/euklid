import {Vector2} from "../vector/vector2";
import {DoublyLinkedList} from '@datastructures-js/doubly-linked-list';
import {mod} from "../basis/functions";

export class EarClipping {

    static triangulate(polygon: Vector2[]): Vector2[] {
        const vertices = new DoublyLinkedList();
        polygon.forEach(vertex => vertices.insertLast(vertex));
        const ears = new DoublyLinkedList();
        const convex: Vector2[] = [];
        const reflex: Vector2[] = [];

        for (let i = 0; i < polygon.length; i++) {
            // Construct Triangle
            const p0 = polygon[mod(i -1, polygon.length)];
            const p1 = polygon[i % polygon.length];
            const p2 = polygon[(i + 1) % polygon.length];

            // Check if angle of p1 edges are reflex (interior angle is larger than 180 deg)
            // or convex (interior angle is smaller than 180 deg)
            const p1p0 = p1.subtract(p0);
            const p1p2 = p1.subtract(p2);
            const angle = p1p0.angleTo(p1p2); // TODO angle passt noch nicht
            if (angle < Math.PI) {
                convex.push(p1);
            } else if (angle > Math.PI) {
                reflex.push(p1);
            }

            // Check if p1 is an ear
            let isEar = true;
            for (let j = 0; j < reflex.length; j++) {
                if (reflex[j].equals(p0) || reflex[j].equals(p2) || reflex[j].equals(p2)) {
                    continue;
                }
                if (EarClipping.insideTriangle(reflex[j], p0, p1, p2)) {
                    isEar = false;
                    break;
                }
            }
        }
        return null
    }

    // https://stackoverflow.com/a/2049593
    static insideTriangle(pt: Vector2, v1: Vector2, v2: Vector2, v3: Vector2): boolean {
        let d1, d2, d3;
        let has_neg, has_pos;

        d1 = EarClipping.sign(pt, v1, v2);
        d2 = EarClipping.sign(pt, v2, v3);
        d3 = EarClipping.sign(pt, v3, v1);

        has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
        has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

        return !(has_neg && has_pos);
    }

    private static sign(p1: Vector2, p2: Vector2, p3: Vector2): number {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    }

}
