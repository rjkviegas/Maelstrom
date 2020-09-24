import Wizard, { STARTING_GOLD } from '../../Components/classes/wizard/wizard.js'
import { wizardIdle } from '../../Components/classes/wizard/wizard_idle.js'


const player1 = new Wizard()

describe("player initializes", function() {

    it("with attacking at false", function() {
        expect(player1.is_attacking).toEqual(false);
    });
    it("with current avatar as a Wizard", function() {
        expect(player1.current_avatar).toEqual(wizardIdle);
    });
    it("starts money with default", function() {
        expect(player1.money).toEqual(STARTING_GOLD);
    });
    
});