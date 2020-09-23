import King from './king.js'

const king = new King()

describe("King", function() {

    it("has a name", function() {
        expect(king.name).toEqual('Opponent_Placeholder')
    });

    it("has hp", function() {
        expect(king.hp).toEqual(185);
    });

    it("has a starting max hp reference", function() {
        expect(king.MAX_HP).toEqual(185);
    });

    it("its attacking property is false", function() {
        expect(king.is_attacking).toEqual(false);
    });
})