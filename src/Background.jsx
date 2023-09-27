/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useThree } from '@react-three/fiber'
import { useGLTF, PresentationControls, useAnimations, Stars } from '@react-three/drei'
import { useEffect } from 'react'
import Container from './Container'

export default function Background(){
    
    // const dirLight = useRef();
    // useHelper(dirLight, DirectionalLightHelper, "red");

    const {camera,gl} = useThree()
    camera.position.y = 0.3
    camera.position.x = 0.16
    // console.log(camera.position)

    const background = useGLTF('./src/assets/cartoon_lowpoly_earth_planet_2_uvw_textured/scene.gltf')
    // console.log(background)
    
    const animations = useAnimations(background.animations,background.scene)
    console.log(background.scene)
    useEffect(()=>{
        const action = animations.actions.Main
        action.play()
    })
    
    return(
        <>
            <Container />
            {/* This is the part you should put suspense and the loader */}
            <pointLight position={[0,1,1]} intensity={1} />
            <ambientLight intensity={2} />
            <directionalLight intensity={2} />
            <PresentationControls 
            snap 
            global 
            zoom={0.8} 
            rotation={[0, -Math.PI/2, 0]} 
            polar={[0, Math.PI]} 
            azimuth={[-Math.PI / 4, Math.PI / 4]}>
                <primitive 
                object={background.scene} 
                scale={0.02} 
                rotation={[0,1.8,0]} />
                <Stars 
                radius={100} 
                depth={50} 
                count={5000} 
                factor={4} 
                saturation={0} 
                fade 
                speed={1} />
            </PresentationControls>
        </>
    )
}