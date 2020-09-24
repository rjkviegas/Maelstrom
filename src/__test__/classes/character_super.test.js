import Character from '../../Components/classes/character_super/character_super.js'

const referenceCharacter = new Character()

describe("Character Parent Class", function() {

    it("has a name", function() {
        expect(referenceCharacter.name).toEqual('Opponent_Placeholder')
    });

    it("has hp", function() {
        expect(referenceCharacter.hp).toEqual(100);
    });

    it("has a starting max hp reference", function() {
        expect(referenceCharacter.MAX_HP).toEqual(100);
    });

    it("its attacking property is false", function() {
        expect(referenceCharacter.is_attacking).toEqual(false);
    });

    it("can calculate next level", function() {
      referenceCharacter.level = 1;
      expect(referenceCharacter.nextLevel()).toEqual(1)
    });
})