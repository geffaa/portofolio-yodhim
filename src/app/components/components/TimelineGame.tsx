"use client"

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const timelineData = [
  {
    id: 1,
    name: "Early Years",
    date: "1990-1995",
    description: "Born and raised in a small town, showing early interest in technology.",
    position: new THREE.Vector3(-20, 0, -5)
  },
  {
    id: 2,
    name: "School Days",
    date: "1995-2008",
    description: "Excelled in mathematics and science, participated in coding competitions.",
    position: new THREE.Vector3(-10, 0, -5)
  },
  {
    id: 3,
    name: "University",
    date: "2008-2012",
    description: "Studied Computer Science, focused on AI and Machine Learning.",
    position: new THREE.Vector3(0, 0, -5)
  },
  {
    id: 4,
    name: "First Job",
    date: "2012-2016",
    description: "Worked as a junior developer at a tech startup, gained valuable experience.",
    position: new THREE.Vector3(10, 0, -5)
  },
  {
    id: 5,
    name: "Current Role",
    date: "2016-Present",
    description: "Senior Software Engineer specializing in full-stack development and cloud architecture.",
    position: new THREE.Vector3(20, 0, -5)
  }
];

const TimelineGame: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<typeof timelineData[0] | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Timeline frames
    const frames: THREE.Mesh[] = [];
    timelineData.forEach((milestone) => {
      const frameGeometry = new THREE.BoxGeometry(3, 4, 0.1);
      const frameMaterial = new THREE.MeshPhongMaterial({ color: 0xDDDDDD });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.position.copy(milestone.position);
      scene.add(frame);
      frames.push(frame);

      // Frame lighting
      const frameLight = new THREE.PointLight(0x64FFDA, 1, 5);
      frameLight.position.copy(milestone.position);
      frameLight.position.z += 1; // Move light slightly in front of the frame
      scene.add(frameLight);

      // Add text to frame
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 256;
      if (context) {
        context.fillStyle = 'white';
        context.font = 'bold 24px Arial';
        context.textAlign = 'center';
        context.fillText(milestone.name, 128, 64);
        context.font = '18px Arial';
        context.fillText(milestone.date, 128, 96);
      }
      const texture = new THREE.CanvasTexture(canvas);
      const textMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      const textGeometry = new THREE.PlaneGeometry(2.8, 3.8);
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.copy(milestone.position);
      textMesh.position.z += 0.06;
      scene.add(textMesh);
    });

    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    // WASD controls
    const moveSpeed = 0.1;
    const keyState: { [key: string]: boolean } = {};

    window.addEventListener('keydown', (e) => { keyState[e.code] = true; });
    window.addEventListener('keyup', (e) => { keyState[e.code] = false; });

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('click', onMouseClick);

    function onMouseClick(event: MouseEvent) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(frames);

      if (intersects.length > 0) {
        const index = frames.indexOf(intersects[0].object as THREE.Mesh);
        setSelectedMilestone(timelineData[index]);
      }
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // WASD movement
      if (keyState['KeyW']) camera.position.z -= moveSpeed;
      if (keyState['KeyS']) camera.position.z += moveSpeed;
      if (keyState['KeyA']) camera.position.x -= moveSpeed;
      if (keyState['KeyD']) camera.position.x += moveSpeed;

      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', onMouseClick);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={mountRef} className="absolute inset-0" />
      {selectedMilestone && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4">
          <h2 className="text-2xl font-bold">{selectedMilestone.name}</h2>
          <p className="text-sm text-gray-300">{selectedMilestone.date}</p>
          <p className="mt-2">{selectedMilestone.description}</p>
        </div>
      )}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded">
        <p>Use W, A, S, D keys to move the camera</p>
        <p>Click on frames to view details</p>
      </div>
    </div>
  );
};

export default TimelineGame;