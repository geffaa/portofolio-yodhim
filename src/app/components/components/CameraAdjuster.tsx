import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

const CameraAdjuster = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 2, 4);
    camera.lookAt(0, 1, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
};

export default CameraAdjuster;