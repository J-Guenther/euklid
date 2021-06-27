import * as chai from 'chai';
import {Vector2} from "../../../src";
import {EarClipping} from "../../../src/math/triangulate/ear-clipping";

const expect = chai.expect;
describe('EarClipping', () => {
    it('should triangulate a polygon by earclipping', function () {

        const pA = new Vector2(2,4);
        const pB = new Vector2(5,1);
        const pC = new Vector2(8,3);
        const pD = new Vector2(10,2);
        const pE = new Vector2(11,5);
        const pF = new Vector2(9.5,4.5);
        const pG = new Vector2(8.5,7);
        const pH = new Vector2(6,3.5);
        const pI = new Vector2(4,4.5);
        const pJ = new Vector2(3.5,7);

        const polygon: Vector2[] = [
            pA, pB, pC, pD, pE, pF, pG, pH, pI, pJ
        ];

        EarClipping.triangulate(polygon);

        expect(new Vector2(1,2).add(new Vector2(1,1))).to.eql(new Vector2(2,3));
    });
});
