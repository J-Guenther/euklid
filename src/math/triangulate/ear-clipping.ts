import {Vector2} from "../vector/vector2";
import {DoublyLinkedList} from '@datastructures-js/doubly-linked-list';
import {mod} from "../basis/functions";

export class EarClipping {
    static vertices: DoublyLinkedList;
    static ears: DoublyLinkedList<Vector2>;
    static convex: DoublyLinkedList<Vector2>;
    static reflex: DoublyLinkedList<Vector2>;


    static triangulate(polygon: Vector2[]): Vector2[] {
        this.vertices = new DoublyLinkedList<Vector2>();
        this.ears = new DoublyLinkedList<Vector2>();
        this.convex = new DoublyLinkedList<Vector2>();
        this.reflex = new DoublyLinkedList<Vector2>();


        polygon.forEach(vertex => this.vertices.insertLast(vertex));
        this.vertices.forEach(vertex => {
            const p1 = vertex.getValue();
            const p0 = vertex.getPrev() ? vertex.getPrev().getValue() : this.vertices.tail().getValue();
            const p2 = vertex.getNext() ? vertex.getNext().getValue() : this.vertices.head().getValue();
            if (this.isP1Convex(p1, p0, p2)) {
                this.convex.insertLast(p1);
            } else {
                this.reflex.insertLast(p1);
            }
        });

        this.vertices.forEach(vertex => {
            const p1 = vertex.getValue();
            const p0 = vertex.getPrev() ? vertex.getPrev().getValue() : this.vertices.tail().getValue();
            const p2 = vertex.getNext() ? vertex.getNext().getValue() : this.vertices.head().getValue();
            if (this.isP1Ear(p1, p0, p2)) {
                this.ears.insertLast(p1);
            }
        });

        const result = [];
        EarClipping.earClip([]);

        return null
    }

    static earClip(triangles) {
        if (this.ears.count() > 0) {
            let vertex1 = this.vertices.find((node, position) => node.getValue() === this.ears.head().getValue());
            if (vertex1) {
                let vertex0 = vertex1.getPrev() ? vertex1.getPrev() : this.vertices.tail();
                let vertex2 = vertex1.getNext() ? vertex1.getNext() : this.vertices.head();
                let p1 = vertex1.getValue();
                let p0 = vertex0.getValue();
                let p2 = vertex2.getValue();
                triangles.push([p0, p1, p2]);

                this.vertices.remove(vertex1);
                this.ears.remove(vertex1);

                vertex1 = vertex0;
                vertex0 = vertex1.getPrev() ? vertex1.getPrev() : this.vertices.tail();
                vertex2 = vertex1.getNext() ? vertex1.getNext() : this.vertices.head();
                p1 = vertex1.getValue();
                p0 = vertex0.getValue();
                p2 = vertex2.getValue();

                const isConvex = this.convex.find((node, position) => node.getValue() === p1);
                if (isConvex) {
                    if (!this.isP1Convex(p1, p0, p2)) {
                        this.convex.remove(p1);

                    }
                }

            }

        }
    }

    static isP1Ear(p1, p0, p2): boolean {
        let isEar = true;
        this.reflex.forEach(reflex => {
            const reflexValue = reflex.getValue();
            if (reflexValue.equals(p1)) {
                isEar = false;
                return;
            }
            if (reflexValue.equals(p0) || reflexValue.equals(p2)) {
                return;
            }
            if (EarClipping.insideTriangle(reflexValue, p0, p1, p2)) {
                isEar = false;
                return
            }
        });
        return isEar && this.convex;
    }

    // if false then it is reflex
    static isP1Convex(p1, p0, p2): boolean {
        const p1p0 = p0.subtract(p1);
        const p1p2 = p2.subtract(p1);
        let angle = p1p2.angleTo(p1p0);
        if (angle < 0) {
            angle += 2 * Math.PI;
        }
        return angle < Math.PI;
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
