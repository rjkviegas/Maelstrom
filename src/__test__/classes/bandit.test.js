import Bandit, { STARTING_HITPOINTS }  from '../../Components/classes/bandit/bandit.js'
const bandito = new Bandit()

describe("Bandit", function() {

    it("has a name", function() {
        expect(bandito.name).toEqual("Bandit");
    });

    it("has hp", function() {
        expect(bandito.hp).toEqual(STARTING_HITPOINTS);
    });

    it("has a starting max hp reference", function() {
        expect(bandito.MAX_HP).toEqual(STARTING_HITPOINTS);
    });

    it("its attacking property is false", function() {
        expect(bandito.is_attacking).toEqual(false);
    });

});