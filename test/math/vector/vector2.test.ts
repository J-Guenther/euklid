import * as mocha from 'mocha';
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
})
