import PlasmaDrone from '../../Components/classes/plasmaDrone/plasmaDrone.js'
import { STARTING_HITPOINTS as PLASMA_DRONE_DEFAULT_HP } from '../../Components/classes/plasmaDrone/plasmaDrone.js'

const plasmaDrone = new PlasmaDrone()

describe("plasmaDrone", function() {

    it("has a name", function() {
        expect(plasmaDrone.name).toEqual('Plasma Drone')
    });

    it("has hp", function() {
        expect(plasmaDrone.hp).toEqual(PLASMA_DRONE_DEFAULT_HP);
    });

    it("has a starting max hp reference", function() {
        expect(plasmaDrone.MAX_HP).toEqual(PLASMA_DRONE_DEFAULT_HP);
    });

    it("its attacking property is false", function() {
        expect(plasmaDrone.is_attacking).toEqual(false);
    });
})