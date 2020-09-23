import Bandit from './bandit.js';

const bandito = new Bandit()

describe("Bandit", function() {

    it("has a name", function() {
        expect(bandito.name).toEqual("Opponent_Placeholder");
    });

    it("has hp", function() {
        expect(bandito.hp).toEqual(125);
    });

    it("has a starting max hp reference", function() {
        expect(bandito.MAX_HP).toEqual(125);
    });

    it("its attacking property is false", function() {
        expect(bandito.is_attacking).toEqual(false);
    });

});