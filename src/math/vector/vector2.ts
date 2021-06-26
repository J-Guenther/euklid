import {clamp} from "../basis/functions";
import {EPSILON} from "../basis/constants";

export class Vector2 {
    x: number;
    y: number;

    constructor(vector: Vector2);
    constructor(arrayXY: []);
    constructor(x: number, y: number);
    constructor(xOrVectorOrArray: any, y?: number) {
        if (xOrVectorOrArray && typeof xOrVectorOrArray == 'number'){
            this.x = xOrVectorOrArray;
            this.y = y;
        } else if (xOrVectorOrArray && typeof xOrVectorOrArray == 'object') {
            this.x = xOrVectorOrArray.x;
            this.y = xOrVectorOrArray.y;
        } else if (Array.isArray(xOrVectorOrArray)) {
            this.x = xOrVectorOrArray[0];
            this.y = xOrVectorOrArray[1];
        } else {
            console.error('Constructor only exists for Vector2, Array [x,y] and (x, y). Got:', xOrVectorOrArray);
        }
    }

    add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    addToSelf(other: Vector2): void {
        this.x += other.x
        this.y += other.y;
    }

    addScalar(scalar: number): Vector2 {
        return new Vector2(this.x + scalar, this.y + scalar);
    }

    addScalarToSelf(scalar: number): void {
        this.x += scalar
        this.y += scalar;
    }

    subtract(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    subtractFromSelf(other: Vector2): void {
        this.x -= other.x
        this.y -= other.y;
    }

    subtractScalar(scalar: number): Vector2 {
        return new Vector2(this.x - scalar, this.y - scalar);
    }

    subtractScalarFromSelf(scalar: number): void {
        this.x -= scalar
        this.y -= scalar;
    }

    multiply(other: Vector2): Vector2 {
        return new Vector2(this.x * other.x, this.y * other.y);
    }

    multiplySelf(other: Vector2): void {
        this.x *= other.x
        this.y *= other.y;
    }

    multiplyScalar(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    multiplyScalarSelf(scalar: number): void {
        this.x *= scalar
        this.y *= scalar;
    }

    divide(other: Vector2): Vector2 {
        return new Vector2(this.x / other.x, this.y / other.y);
    }

    divideSelf(other: Vector2): void {
        this.x /= other.x
        this.y /= other.y;
    }

    divideScalar(scalar: number): Vector2 {
        return new Vector2(this.x / scalar, this.y / scalar);
    }

    divideScalarSelf(scalar: number): void {
        this.x /= scalar
        this.y /= scalar;
    }

    modulo(other: Vector2): Vector2 {
        return new Vector2(this.x % other.x, this.y % other.y);
    }

    moduloSelf(other: Vector2): void {
        this.x %= other.x
        this.y %= other.y;
    }

    equals(other: Vector2): boolean {
        return this.x === other.x && this.y === other.y;
    }

    notEquals(other: Vector2): boolean {
        return this.x !== other.x || this.y !== other.y;
    }

    angle(): number {
        return Math.atan2(this.y, this.x);
    }

    angleTo(other: Vector2): number {
        return Math.atan2(this.cross(other), this.dot(other));
    }

    angleToPoint(other: Vector2): number {
        return Math.atan2(this.y - other.y, this.x - other.x);
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    lengthSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    normalize(): void {
        let l = this.x * this.x + this.y * this.y;
        if (l != 0) {
            l = Math.sqrt(l);
            this.x /= l;
            this.y /= l;
        }
    }

    normalized(): Vector2 {
        const v = this;
        v.normalize();
        return v;
    }

    distanceTo(other: Vector2): number {
        return Math.sqrt((this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y));
    }

    distanceSquaredTo(other: Vector2): number {
        return (this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y);
    }

    dot(other: Vector2): number {
        return this.x * other.x + this.y * other.y;
    }

    cross(other: Vector2): number {
        return this.x * other.y - this.y * other.x;
    }

    rotate(by: number): Vector2 {
        const sin = Math.sin(by);
        const cos = Math.cos(by);
        return new Vector2(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
    }

    rotateSelf(by: number): void {
        const sin = Math.sin(by);
        const cos = Math.cos(by);
        this.x = this.x * cos - this.y * sin;
        this.y = this.x * sin + this.y * cos;
    }

    project(to: Vector2): Vector2 {
        return to.multiplyScalar(this.dot(to) / to.lengthSquared());
    }

    clamp(min: Vector2, max: Vector2): Vector2 {
        return new Vector2(clamp(this.x, min.x, max.x), clamp(this.y, min.y, max.y));
    }

    limitLength(length: number): Vector2 {
        const l = this.length();
        const v = this;
        if (l > 0 && length < 1) {
            v.divideScalarSelf(l);
            v.multiplyScalarSelf( length);
        }
        return v;
    }

    moveToward(to: Vector2, delta: number): Vector2 {
        const v = this;
        const vd = to.subtract(v);
        const len = vd.length();
        return len <= delta || len < EPSILON ? to : v.add(vd).divideScalar(len).multiplyScalar(delta);
    }

    slide(normalized: Vector2): Vector2 {
        return this.subtract(normalized).multiplyScalar(this.dot(normalized));
    }

    toString(): string {
        return "(" + this.x + ", " + this.y + ")";
    }

    toArray(): [x: number, y: number] {
        return [this.x, this.y];
    }

    copy(): Vector2 {
        return new Vector2(this);
    }
}
