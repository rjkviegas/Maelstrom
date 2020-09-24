import Goblin from './goblin.js'
import { STARTING_HITPOINTS as GOBLIN_DEFAULT_HP } from './goblin.js'
const goblin = new Goblin()

describe("Goblin", function() {

    it("has a name", function() {
        expect(goblin.name).toEqual('Goblin')
    });

    it("has hp", function() {
        expect(goblin.hp).toEqual(GOBLIN_DEFAULT_HP);
    });

    it("has a starting max hp reference", function() {
        expect(goblin.MAX_HP).toEqual(GOBLIN_DEFAULT_HP);
    });

    it("its attacking property is false", function() {
        expect(goblin.is_attacking).toEqual(false);
    });
})