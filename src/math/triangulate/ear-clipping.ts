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

        // Construct convex and reflex list
        for (let i = 0; i < polygon.length; i++) {
            // Construct Triangle
            const p0 = polygon[mod(i - 1, polygon.length)];
            const p1 = polygon[i % polygon.length];
            const p2 = polygon[(i + 1) % polygon.length];

            // Check if angle of p1 edges are reflex (interior angle is larger than 180 deg)
            // or convex (interior angle is smaller than 180 deg)
            const edge1 = p0.subtract(p1);
            const edge2 = p2.subtract(p1);
            let angle = edge2.angleTo(edge1);
            if (angle < 0) {
                angle += 2 * Math.PI;
            }
            if (angle < Math.PI) {
                convex.push(p1);
            } else if (angle > Math.PI) {
                reflex.push(p1);
            }
        }

        for (let i = 0; i < polygon.length; i++) {
            // Construct Triangle
            const p0 = polygon[mod(i - 1, polygon.length)];
            const p1 = polygon[i % polygon.length];
            const p2 = polygon[(i + 1) % polygon.length];

            const p1p0 = p0.subtract(p1);
            const p1p2 = p2.subtract(p1);
            let angle = p1p2.angleTo(p1p0);
            if (angle < 0) {
                angle += 2 * Math.PI;
            }
            let isConvex = false;
            if (angle < Math.PI) {
                isConvex = true;
            } else if (angle > Math.PI) {
                continue;
            }


            // Check if p1 is an ear
            let isEar = true;
            for (let j = 0; j < reflex.length; j++) {
                if (reflex[j].equals(p0) || reflex[j].equals(p1) || reflex[j].equals(p2)) {
                    continue;
                }
                if (EarClipping.insideTriangle(reflex[j], p1, p2, p0)) {
                    isEar = false;
                    break;
                }
            }
            if (isEar && isConvex) {
                ears.insertLast(p1);
            }
        }


        return null
    }

    // https://stackoverflow.com/a/9755252
    static intpoint_inside_trigon(s, a, b, c): boolean {
        const as_x = s.x - a.x;
        const as_y = s.y - a.y;

        const s_ab = (b.x - a.x) * as_y - (b.y - a.y) * as_x > 0;

        if ((c.x - a.x) * as_y - (c.y - a.y) * as_x > 0 == s_ab) return false;

        if ((c.x - b.x) * (s.y - b.y) - (c.y - b.y) * (s.x - b.x) > 0 != s_ab) return false;

        return true;
    }

    static insideTriangle2(Ax: number, Ay: number,
                           Bx: number, By: number,
                           Cx: number, Cy: number,
                           Px: number, Py: number,
                           include_edges: boolean): boolean {
        let ax, ay, bx, by, cx, cy, apx, apy, bpx, bpy, cpx, cpy;
        let cCROSSap, bCROSScp, aCROSSbp;

        ax = Cx - Bx;
        ay = Cy - By;
        bx = Ax - Cx;
        by = Ay - Cy;
        cx = Bx - Ax;
        cy = By - Ay;
        apx = Px - Ax;
        apy = Py - Ay;
        bpx = Px - Bx;
        bpy = Py - By;
        cpx = Px - Cx;
        cpy = Py - Cy;

        aCROSSbp = ax * bpy - ay * bpx;
        cCROSSap = cx * apy - cy * apx;
        bCROSScp = bx * cpy - by * cpx;

        if (include_edges) {
            return ((aCROSSbp > 0.0) && (bCROSScp > 0.0) && (cCROSSap > 0.0));
        } else {
            return ((aCROSSbp >= 0.0) && (bCROSScp >= 0.0) && (cCROSSap >= 0.0));
        }
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
