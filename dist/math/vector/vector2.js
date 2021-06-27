"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
const functions_1 = require("../basis/functions");
const constants_1 = require("../basis/constants");
class Vector2 {
    constructor(xOrVectorOrArray, y) {
        if ((xOrVectorOrArray || xOrVectorOrArray === 0) && typeof xOrVectorOrArray == 'number') {
            this.x = xOrVectorOrArray;
            this.y = y;
        }
        else if (xOrVectorOrArray && typeof xOrVectorOrArray == 'object') {
            this.x = xOrVectorOrArray.x;
            this.y = xOrVectorOrArray.y;
        }
        else if (Array.isArray(xOrVectorOrArray)) {
            this.x = xOrVectorOrArray[0];
            this.y = xOrVectorOrArray[1];
        }
        else {
            console.error('Constructor only exists for Vector2, Array [x,y] and (x, y). Got:', xOrVectorOrArray);
        }
    }
    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    addToSelf(other) {
        this.x += other.x;
        this.y += other.y;
    }
    addScalar(scalar) {
        return new Vector2(this.x + scalar, this.y + scalar);
    }
    addScalarToSelf(scalar) {
        this.x += scalar;
        this.y += scalar;
    }
    subtract(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    subtractFromSelf(other) {
        this.x -= other.x;
        this.y -= other.y;
    }
    subtractScalar(scalar) {
        return new Vector2(this.x - scalar, this.y - scalar);
    }
    subtractScalarFromSelf(scalar) {
        this.x -= scalar;
        this.y -= scalar;
    }
    multiply(other) {
        return new Vector2(this.x * other.x, this.y * other.y);
    }
    multiplySelf(other) {
        this.x *= other.x;
        this.y *= other.y;
    }
    multiplyScalar(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }
    multiplyScalarSelf(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }
    divide(other) {
        return new Vector2(this.x / other.x, this.y / other.y);
    }
    divideSelf(other) {
        this.x /= other.x;
        this.y /= other.y;
    }
    divideScalar(scalar) {
        return new Vector2(this.x / scalar, this.y / scalar);
    }
    divideScalarSelf(scalar) {
        this.x /= scalar;
        this.y /= scalar;
    }
    modulo(other) {
        return new Vector2(this.x % other.x, this.y % other.y);
    }
    moduloSelf(other) {
        this.x %= other.x;
        this.y %= other.y;
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
    notEquals(other) {
        return this.x !== other.x || this.y !== other.y;
    }
    angle() {
        return Math.atan2(this.y, this.x);
    }
    angleTo(other) {
        return Math.atan2(this.cross(other), this.dot(other));
    }
    angleToPoint(other) {
        return Math.atan2(this.y - other.y, this.x - other.x);
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    normalize() {
        let l = this.x * this.x + this.y * this.y;
        if (l != 0) {
            l = Math.sqrt(l);
            this.x /= l;
            this.y /= l;
        }
    }
    normalized() {
        const v = this;
        v.normalize();
        return v;
    }
    distanceTo(other) {
        return Math.sqrt((this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y));
    }
    distanceSquaredTo(other) {
        return (this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y);
    }
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
    cross(other) {
        return this.x * other.y - this.y * other.x;
    }
    rotate(by) {
        const sin = Math.sin(by);
        const cos = Math.cos(by);
        return new Vector2(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
    }
    rotateSelf(by) {
        const sin = Math.sin(by);
        const cos = Math.cos(by);
        const x = this.x;
        const y = this.y;
        this.x = x * cos - y * sin;
        this.y = x * sin + y * cos;
    }
    project(to) {
        return to.multiplyScalar(this.dot(to) / to.lengthSquared());
    }
    clamp(min, max) {
        return new Vector2(functions_1.clamp(this.x, min.x, max.x), functions_1.clamp(this.y, min.y, max.y));
    }
    limitLength(length) {
        const l = this.length();
        const v = this;
        if (l > 0 && length < l) {
            v.divideScalarSelf(l);
            v.multiplyScalarSelf(length);
        }
        return v;
    }
    moveToward(to, delta) {
        const v = this;
        const vd = to.subtract(v);
        const len = vd.length();
        return len <= delta || len < constants_1.EPSILON ? to : vd.divideScalar(len).multiplyScalar(delta).add(v);
        // return v;
    }
    slide(normalized) {
        const v = normalized.multiplyScalar(this.dot(normalized));
        return this.subtract(v);
    }
    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
    toArray() {
        return [this.x, this.y];
    }
    copy() {
        return new Vector2(this);
    }
}
exports.Vector2 = Vector2;
