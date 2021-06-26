import * as mocha from 'mocha';
import * as chai from 'chai';
import {Vector2} from "../../../src/math/vector/vector2";

const expect = chai.expect;
describe('Vector2D', () => {

    it('should add two vectors together', function () {
        expect(new Vector2(1,1).add(new Vector2(1,1))).to.eql(new Vector2(2,2));
    });
})
