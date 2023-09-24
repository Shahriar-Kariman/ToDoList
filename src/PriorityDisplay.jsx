/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Ice from './assets/ice.jpg';
import Candel from './assets/candle.jpg';
import Fire from './assets/fire.jpg';
import Fireworks from './assets/fireworks.jpg';
import Explosion from './assets/explosion.jpg';
import { useState } from 'react';

export default function PriorityDisplay({priority}){
    const images = [Ice,Candel,Fire,Fireworks,Explosion];
    const [p,setP] = useState(priority);
    return (
        <img
        className='priority-img'
        src={images[p]}
        style={
            {
                height:'100%',
                width: '146px'
            }
        }
        alt='Task Priority'
        />
    );
}