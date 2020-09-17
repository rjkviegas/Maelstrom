import React from 'react';
import Fight from "../fight/fight";
import Rename from "../rename/rename.js"
import PlayerHealthBar from '../healthbar/healthbar'
import enemyHealthbar from '../healthbar/enemyHealthbar'

export default function Menu() {
  return (
    <div>
        <PlayerHealthBar/>
        <Rename/>
        <Fight/>
    </div>
  )

}