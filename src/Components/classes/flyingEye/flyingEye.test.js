import FlyingEye from './flyingEye.js'
import { STARTING_HITPOINTS as FLYING_EYE_DEFAULT_HP } from './flyingEye.js'
const flyingEye = new FlyingEye()

describe("FlyingEye", function() {

    it("has a name", function() {
        expect(flyingEye.name).toEqual('Flying Eye')
    });

    it("has hp", function() {
        expect(flyingEye.hp).toEqual(FLYING_EYE_DEFAULT_HP);
    });

    it("has a starting max hp reference", function() {
        expect(flyingEye.MAX_HP).toEqual(FLYING_EYE_DEFAULT_HP);
    });

    it("its attacking property is false", function() {
        expect(flyingEye.is_attacking).toEqual(false);
    });
})