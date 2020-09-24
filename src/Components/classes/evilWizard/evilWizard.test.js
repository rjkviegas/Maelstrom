import EvilWizard from './evilWizard.js'
import { STARTING_HITPOINTS as EVIL_WIZARD_DEFAULT_HP } from './evilWizard.js'
const evilWizard = new EvilWizard()

describe("evilWizard", function() {

    it("has a name", function() {
        expect(evilWizard.name).toEqual('Evil Wizard')
    });

    it("has hp", function() {
        expect(evilWizard.hp).toEqual(EVIL_WIZARD_DEFAULT_HP);
    });

    it("has a starting max hp reference", function() {
        expect(evilWizard.MAX_HP).toEqual(EVIL_WIZARD_DEFAULT_HP);
    });

    it("its attacking property is false", function() {
        expect(evilWizard.is_attacking).toEqual(false);
    });
})