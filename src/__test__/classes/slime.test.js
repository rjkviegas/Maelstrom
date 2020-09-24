import Slime from '../../Components/classes/slime/slime.js'

const slime = new Slime()

describe("Slime", function() {

    it("it has a name", function() {
        expect(slime.name).toEqual("Slime")
    });
    
    it("has hp", function() {
        expect(slime.hp).toEqual(50);
    });

    it("has a starting max hp reference", function() {
        expect(slime.MAX_HP).toEqual(50);
    });

    it("its attacking property is false", function() {
        expect(slime.is_attacking).toEqual(false);
    });

});