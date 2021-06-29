// import * as mocha from 'mocha';
import * as chai from 'chai';
import {Vector2} from "../../../src";

const expect = chai.expect;
describe('Vector2D', () => {

    it('should add two vectors together and return new vector', function () {
        expect(new Vector2(1,2).add(new Vector2(1,1))).to.eql(new Vector2(2,3));
    });

    it('should add two vectors together', function () {
        const v1 = new Vector2(1,1);
        v1.addToSelf(new Vector2(1,2))
        expect(v1.toString()).to.equals('(2, 3)');
    });

    it('should add scalar to vector and return new vector', function () {
        expect(new Vector2(1,2).addScalar(1)).to.eql(new Vector2(2,3));
    });

    it('should add scalar to vector', function () {
        const v1 = new Vector2(1,2);
        v1.addScalarToSelf(1)
        expect(v1.toString()).to.equals('(2, 3)');
    });

    it('should subtract two vectors and return new vector', function () {
        expect(new Vector2(3,4).subtract(new Vector2(1,1))).to.eql(new Vector2(2,3));
    });

    it('should subtract two vectors', function () {
        const v1 = new Vector2(2,3);
        v1.subtractFromSelf(new Vector2(1,1))
        expect(v1.toString()).to.equals('(1, 2)');
    });

    it('should subtract scalar from vector and return new vector', function () {
        expect(new Vector2(2,3).subtractScalar(1)).to.eql(new Vector2(1,2));
    });

    it('should subtract scalar from vector', function () {
        const v1 = new Vector2(2,3);
        v1.subtractScalarFromSelf(1)
        expect(v1.toString()).to.equals('(1, 2)');
    });

    it('should multiply two vectors together and return new vector', function () {
        expect(new Vector2(1,2).multiply(new Vector2(2,2))).to.eql(new Vector2(2,4));
    });

    it('should multiply two vectors together', function () {
        const v1 = new Vector2(2,3);
        v1.multiplySelf(new Vector2(2,2))
        expect(v1.toString()).to.equals('(4, 6)');
    });

    it('should multiply scalar to vector and return new vector', function () {
        expect(new Vector2(3,2).multiplyScalar(5)).to.eql(new Vector2(15,10));
    });

    it('should multiply scalar to vector', function () {
        const v1 = new Vector2(3,2);
        v1.multiplyScalarSelf(4)
        expect(v1.toString()).to.equals('(12, 8)');
    });

    it('should divide vector by another vector and return new vector', function () {
        expect(new Vector2(12,21).divide(new Vector2(3,7))).to.eql(new Vector2(4,3));
    });

    it('should divide vector by another vector', function () {
        const v1 = new Vector2(12,21);
        v1.divideSelf(new Vector2(3,7))
        expect(v1.toString()).to.equals('(4, 3)');
    });

    it('should divide vector by scalar and return new vector', function () {
        expect(new Vector2(12,21).divideScalar(3)).to.eql(new Vector2(4,7));
    });

    it('should divide vector by scalar', function () {
        const v1 = new Vector2(12,21);
        v1.divideScalarSelf(3)
        expect(v1.toString()).to.equals('(4, 7)');
    });

    it('should modulo vector by another vector and return new vector', function () {
        expect(new Vector2(13,24).modulo(new Vector2(3,7))).to.eql(new Vector2(1,3));
    });

    it('should modulo vector by another vector', function () {
        const v1 = new Vector2(13,24);
        v1.moduloSelf(new Vector2(3,7))
        expect(v1.toString()).to.equals('(1, 3)');
    });

    it('should compare equal vectors and return true', function () {
        expect(new Vector2(12,21).equals(new Vector2(12, 21))).to.equals(true);
    });

    it('should compare none equal vectors and return false', function () {
        expect(new Vector2(12,21).equals(new Vector2(13, 21))).to.equals(false);
    });

    it('should compare equal vectors and return false', function () {
        expect(new Vector2(12,21).notEquals(new Vector2(12, 21))).to.equals(false);
    });

    it('should compare none equal vectors and return true', function () {
        expect(new Vector2(12,21).notEquals(new Vector2(13, 21))).to.equals(true);
    });

    it('should get angle of vector', function () {
        expect(new Vector2(2,2).angle()).to.equals(Math.PI / 180 * 45);
    });

    it('should get angle to other vector', function () {
        expect(new Vector2(2,1).angleTo(new Vector2(1,-2))).to.equals(Math.PI / 180 * -90);
    });

    it('should get angle to point', function () {
        expect(new Vector2(8,8).angleToPoint(new Vector2(8,7))).to.equals(Math.PI / 180 * 90);
    });

    it('should get length of vector', function () {
        expect(new Vector2(3,4).length()).to.equals(5);
    });

    it('should get squared length of vector', function () {
        expect(new Vector2(3,4).lengthSquared()).to.equals(25);
    });

    it('should normalize vector', function () {
        const v = new Vector2(3,4);
        v.normalize();
        expect(v.toString()).to.equals('(0.6, 0.8)');
    });

    it('should normalize vector and return it', function () {
        const v = new Vector2(3,4);
        const v1 = v.normalized();
        expect(v).to.eql(v1);
    });

    it('should rotate vector and return a new vector', function () {
        // y should be 0 but due to PI rounding error is 1.2246467991473532e-16
        expect(new Vector2(2,0).rotate(Math.PI / 180 * 90)).to.eql(new Vector2(1.2246467991473532e-16,2));
    });

    it('should rotate vector', function () {
        const v = new Vector2(2,0);
        v.rotateSelf(Math.PI / 180 * 90);
        // y should be 0 but due to PI rounding error is 1.2246467991473532e-16
        expect(v.toString()).to.eql('(1.2246467991473532e-16, 2)');
    });

    it('should project one vector onto another', function () {
        expect(new Vector2(2,2).project(new Vector2(-3,-2))).to.eql(new Vector2(2.307692307692308,1.5384615384615385));
    });

    it('should clamp vector by min and max vectors', function () {
        expect(new Vector2(2,2).clamp(new Vector2(1,1), new Vector2(1.5,1.5))).to.eql(new Vector2(1.5,1.5));
    });

    it('should limit length of vector', function () {
        expect(new Vector2(2,2).limitLength(1.5)).to.eql(new Vector2(1.0606601717798212,1.0606601717798212));
    });

    it('should move vector toward another vector', function () {
        expect(new Vector2(2,2).moveToward(new Vector2(0, 2), 2)).to.eql(new Vector2(0,2));
    });

    it('should slide vector toward another normalized vector', function () {
        const vNormalized = new Vector2(-2, 2).normalized();
        expect(new Vector2(2,4).slide(vNormalized)).to.eql(new Vector2(3,3));
    });

    it('should return vector as array', function () {
        expect(new Vector2(2,3).toArray()).to.eql([2,3]);
    });

    it('should copy vector', function () {
        expect(new Vector2(2,3).copy()).to.eql(new Vector2(2,3));
    });

    it('should create 90 degree vector', function () {
       const a = new Vector2(3,3);
       const b = new Vector2(6,5);
       //  const a = new Vector2(1219166.2075301523, 6828143.722574848);
       //  const b = new Vector2(1219189.3269723828, 6828155.282295963);
       const ab = b.subtract(a);
       const ab90 = ab.rotate(Math.PI / -2);
       const c = b.slide(ab90.normalized());
       const bc = c.subtract(b);
       console.log(c.add(bc.multiplyScalar(2)));
       console.log(180/Math.PI *  bc.angleTo(ab));
    });
})
