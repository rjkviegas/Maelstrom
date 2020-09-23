import Bandit from "./bandit/bandit.js";
import EvilWizard from "./evilWizard/evilWizard.js";
import FlyingEye from "./flyingEye/flyingEye.js";
import King from "./king/king.js";
import Mushroom from "./mushroom/mushroom.js";
import PlasmaDrone from "./plasmaDrone/plasmaDrone.js";
import Slime from "./slime/slime.js";


let ALL_POTENTIAL_OPPONENTS = []
ALL_POTENTIAL_OPPONENTS.push(PlasmaDrone)

export default function generateRandomOpponent(){
    for (let i = ALL_POTENTIAL_OPPONENTS.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ALL_POTENTIAL_OPPONENTS[i], ALL_POTENTIAL_OPPONENTS[j]] = [ALL_POTENTIAL_OPPONENTS[j], ALL_POTENTIAL_OPPONENTS[i]];
    }
    return (new ALL_POTENTIAL_OPPONENTS[0]())
}

