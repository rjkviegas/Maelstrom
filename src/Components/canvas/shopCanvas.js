import React from 'react';
import Gold from '../gold/gold.js'

const ShopCanvas = () => {
    return (
        <>
            <Gold/>
            <canvas id="shop" data-testid="shop" />
        </>
    )
}

export default ShopCanvas;
