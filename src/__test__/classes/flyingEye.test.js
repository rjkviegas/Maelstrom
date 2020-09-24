import FlyingEye, { STARTING_HITPOINTS } from '../../Components/classes/flyingEye/flyingEye.js'

const flyingEye = new FlyingEye();

describe("FlyingEye", function() {

    it("has a name", function() {
        expect(flyingEye.name).toEqual('Flying Eye')
    });

    it("has hp", function() {
        expect(flyingEye.hp).toEqual(STARTING_HITPOINTS);
    });

    it("has a starting max hp reference", function() {
        expect(flyingEye.MAX_HP).toEqual(STARTING_HITPOINTS);
    });

    it("its attacking property is false", function() {
        expect(flyingEye.is_attacking).toEqual(false);
    });
})