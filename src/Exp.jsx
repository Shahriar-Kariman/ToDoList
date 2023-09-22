/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */

import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import Background from './Background'

export default function Exp(){
    
    return(
        <Canvas className='exp'>
            <AdaptiveDpr pixelated />
            <Background />
        </Canvas>
    )
}