'use client'

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

interface ModelProps {
  url: string;
}

export function Model({ url }: ModelProps) {
  const group = useRef()
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, group)
  const { camera } = useThree()

  useEffect(() => {
    // Play all animations
    Object.values(actions).forEach(action => {
      if (action) {
        action.play()
      }
    })

    // Adjust camera position
    camera.position.set(0, 0, 5)
    camera.lookAt(0, 0, 0)
  }, [actions, camera])

  // Scale the model to fit the container
  scene.scale.set(2, 2, 2)

  return <primitive object={scene} ref={group} />
}