import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: string;
}

const timelineData: TimelineEvent[] = [
  {
    date: "2018-09",
    title: "Started Computer Science Degree",
    description: "Enrolled at University of Technology, majoring in Computer Science with focus on Software Engineering.",
    icon: "🎓"
  },
  {
    date: "2019-06",
    title: "First Coding Internship",
    description: "Summer internship at TechCorp, working on front-end development using React.",
    icon: "💼"
  },
  {
    date: "2020-01",
    title: "Hackathon Winner",
    description: "Led team to first place in University Hackathon, developing an AI-powered scheduling app.",
    icon: "🏆"
  },
  {
    date: "2021-05",
    title: "Research Assistant",
    description: "Assisted in machine learning research, co-authoring a paper on neural network optimization.",
    icon: "🔬"
  },
  {
    date: "2022-06",
    title: "Graduated with Honors",
    description: "Completed B.Sc. in Computer Science with First Class Honors.",
    icon: "🎉"
  },
  {
    date: "2022-08",
    title: "Software Engineer at InnovateTech",
    description: "Joined as a full-stack developer, working on scalable cloud solutions.",
    icon: "💻"
  },
  {
    date: "2023-11",
    title: "Open Source Contributor",
    description: "Became a key contributor to a popular open-source framework, focusing on performance optimization.",
    icon: "🌐"
  },
  {
    date: "2024-03",
    title: "Senior Software Engineer",
    description: "Promoted to senior role, leading a team in developing next-gen AI-integrated applications.",
    icon: "🚀"
  }
];

const InteractiveResumeTimeline: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeEvent, setActiveEvent] = useState<TimelineEvent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!mountRef.current) {
      console.error("Mount ref is not available");
      return;
    }

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let timeline: THREE.Line;

    try {
      // Scene setup
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x1a1a1a);

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 5, 15);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      // Controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxPolarAngle = Math.PI / 2;
      controls.minPolarAngle = Math.PI / 3;
      controls.enableZoom = false;

      // Timeline creation
      const timelineGroup = new THREE.Group();
      scene.add(timelineGroup);

      // Create timeline path
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-7, 0, 0),
        new THREE.Vector3(-3, 2, -3),
        new THREE.Vector3(0, 0, -5),
        new THREE.Vector3(3, -2, -3),
        new THREE.Vector3(7, 0, 0),
      ]);

      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
      timeline = new THREE.Line(geometry, material);
      timelineGroup.add(timeline);

      timelineData.forEach((event, index) => {
        const t = index / (timelineData.length - 1);
        const position = curve.getPoint(t);
        const eventGroup = createEventObject(event, position);
        timelineGroup.add(eventGroup);
      });

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // Resize handler
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      // Raycaster for interactivity
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const onMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
          const selectedObject = intersects[0].object;
          if (selectedObject.userData.event) {
            setActiveEvent(selectedObject.userData.event);
            gsap.to(selectedObject.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.3 });
          } else {
            setActiveEvent(null);
          }
        } else {
          setActiveEvent(null);
        }
      };
      window.addEventListener('mousemove', onMouseMove);

      // Timeline progress animation
      gsap.to({}, {
        duration: 10,
        onUpdate: () => {
          const progress = gsap.utils.wrap(0, 1, gsap.ticker.time / 10);
          setProgress(progress);
          const position = curve.getPoint(progress);
          camera.position.copy(position).add(new THREE.Vector3(0, 5, 15));
          camera.lookAt(position);
        },
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', onMouseMove);
        mountRef.current?.removeChild(renderer.domElement);
      };
    } catch (err) {
      console.error("Error in Three.js setup:", err);
      setError("Failed to initialize 3D scene");
    }
  }, []);

  const createEventObject = (event: TimelineEvent, position: THREE.Vector3) => {
    const group = new THREE.Group();

    // Event node
    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(position);
    sphere.userData = { event };
    group.add(sphere);

    // Icon
    const iconCanvas = document.createElement('canvas');
    const iconContext = iconCanvas.getContext('2d');
    if (iconContext) {
      iconCanvas.width = 64;
      iconCanvas.height = 64;
      iconContext.font = '48px Arial';
      iconContext.fillText(event.icon, 8, 48);
      const iconTexture = new THREE.CanvasTexture(iconCanvas);
      const iconMaterial = new THREE.SpriteMaterial({ map: iconTexture });
      const iconSprite = new THREE.Sprite(iconMaterial);
      iconSprite.scale.set(1, 1, 1);
      iconSprite.position.copy(position).add(new THREE.Vector3(0, 0.5, 0));
      group.add(iconSprite);
    }

    return group;
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="relative w-full h-screen">
      <div ref={mountRef} className="w-full h-full" />
      {activeEvent && (
        <div className="absolute bottom-4 left-4 bg-gray-800 text-white p-4 rounded-lg max-w-md transition-all duration-300 ease-in-out transform hover:scale-105">
          <h3 className="text-xl font-bold">{activeEvent.title}</h3>
          <p className="text-sm mt-2">{activeEvent.date}</p>
          <p className="mt-2">{activeEvent.description}</p>
        </div>
      )}
      <div className="absolute top-4 left-4 bg-gray-800 text-white p-2 rounded-lg">
        <p>Progress: {Math.round(progress * 100)}%</p>
      </div>
      <div className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-lg">
        <p>Hover over events to learn more!</p>
      </div>
    </div>
  );
};

export default InteractiveResumeTimeline;