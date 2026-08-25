import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Color } from "three";
import type { Group, Mesh, MeshStandardMaterial } from "three";

const TowerModel = () => {
  const { scene } = useGLTF("/models/neurora_tower_v2.glb");
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as Mesh;

      if (!mesh.isMesh) return;

      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];

      materials.forEach((material) => {
        const mat = material as MeshStandardMaterial;

        if (!mat.color) return;

        const name = `${mat.name || ""} ${mesh.name || ""}`.toLowerCase();

        mat.needsUpdate = true;

        if (name.includes("glass") || name.includes("window")) {
          mat.color.set("#07111f");
          mat.metalness = 0.9;
          mat.roughness = 0.18;
        } else if (name.includes("gold")) {
          mat.color.set("#d4af37");
          mat.emissive = new Color("#6f5411");
          mat.emissiveIntensity = 0.55;
          mat.metalness = 0.55;
          mat.roughness = 0.25;
        } else if (name.includes("black") || name.includes("podium")) {
          mat.color.set("#05070D");
          mat.metalness = 0.35;
          mat.roughness = 0.45;
        } else if (name.includes("green") || name.includes("palm")) {
          mat.color.set("#1f3d2b");
          mat.metalness = 0.05;
          mat.roughness = 0.75;
        } else if (name.includes("stone") || name.includes("white") || name.includes("facade")) {
          mat.color.set("#6f7479");
          mat.metalness = 0.18;
          mat.roughness = 0.62;
        } else {
          mat.color.set("#5f666d");
          mat.metalness = 0.18;
          mat.roughness = 0.6;
        }
      });
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = -0.18 + Math.sin(clock.elapsedTime * 0.22) * 0.04;
    groupRef.current.position.y = -6.55 + Math.sin(clock.elapsedTime * 0.18) * 0.015;
  });

  return (
    <Float speed={0.35} rotationIntensity={0.03} floatIntensity={0.04}>
      <group ref={groupRef}>
        <primitive
          object={scene}
          scale={1.30}
          position={[0, 0, -1.2]}
          rotation={[0, 0, 0]}
        />
      </group>
    </Float>
  );
};

const NeuroraTower = () => {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none opacity-55">
      <Canvas camera={{ position: [0, 2.1, 10.5], fov: 34 }}>
        <ambientLight intensity={0.18} />
        <directionalLight position={[5, 8, 6]} intensity={1.4} />
        <pointLight position={[-4, 3, 5]} intensity={2.5} color="#d4af37" />
        <pointLight position={[4, 2, 3]} intensity={0.8} color="#ffffff" />

        <TowerModel />
      </Canvas>
    </div>
  );
};

useGLTF.preload("/models/neurora_tower_v2.glb");

export default NeuroraTower;