import Mushroom from './mushroom.js'
import { STARTING_HITPOINTS as MUSHROOM_DEFAULT_HP } from './mushroom.js'
const mushroom = new Mushroom()

describe("Mushroom", function() {

    it("has a name", function() {
        expect(mushroom.name).toEqual('Mushroom')
    });

    it("has hp", function() {
        expect(mushroom.hp).toEqual(MUSHROOM_DEFAULT_HP);
    });

    it("has a starting max hp reference", function() {
        expect(mushroom.MAX_HP).toEqual(MUSHROOM_DEFAULT_HP);
    });

    it("its attacking property is false", function() {
        expect(mushroom.is_attacking).toEqual(false);
    });
})