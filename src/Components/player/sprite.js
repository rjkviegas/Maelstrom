import React from 'react';
import Spritesheet from 'react-responsive-spritesheet'

export function Sprite() {
    return (
        <Spritesheet
          image={`assets/characterSprites/EvilWizard/Idle.png`}
          widthFrame={250}
          heightFrame={250}
          steps={8}
          fps={20}
          loop={true}
          isResponsive={true}
        />
      );
}