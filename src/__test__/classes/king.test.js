import King from '../../Components/classes/king/king.js'
import { STARTING_HITPOINTS as KING_DEFAULT_HP } from '../../Components/classes/king/king.js'

const king = new King()

describe("King", function() {

    it("has a name", function() {
        expect(king.name).toEqual('King Valdir')
    });

    it("has hp", function() {
        expect(king.hp).toEqual(KING_DEFAULT_HP);
    });

    it("has a starting max hp reference", function() {
        expect(king.MAX_HP).toEqual(KING_DEFAULT_HP);
    });

    it("its attacking property is false", function() {
        expect(king.is_attacking).toEqual(false);
    });
})