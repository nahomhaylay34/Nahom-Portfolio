import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Upload, AlertCircle, RefreshCw, Eye } from "lucide-react";

export default function GraduationModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(true);
  const isUsingFallbackRef = useRef(isUsingFallback);

  // Sync the ref on state changes
  useEffect(() => {
    isUsingFallbackRef.current = isUsingFallback;
  }, [isUsingFallback]);

  // Keep references for animation and updates
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const currentModelRef = useRef<THREE.Object3D | null>(null);
  const fallbackGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Handle local GLB upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadGlbFile(file);
    }
  };

  const loadGlbFile = (file: File) => {
    if (!file.name.endsWith(".glb")) {
      setError("Please upload a valid .glb file.");
      return;
    }

    setLoading(true);
    setError(null);

    const url = URL.createObjectURL(file);
    setModelUrl(url);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      loadGlbFile(file);
    }
  };

  const resetToFallback = () => {
    if (currentModelRef.current && sceneRef.current) {
      sceneRef.current.remove(currentModelRef.current);
      currentModelRef.current = null;
    }
    setModelUrl(null);
    setIsUsingFallback(true);
    setError(null);
  };

  // Setup Three.js Scene ONCE on mount
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 400;
    const height = containerRef.current.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 5);
    cameraRef.current = camera;

    // 3. Renderer with alpha for transparent glass-card matching
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Clear previous canvas
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    // Increased lighting so the 3D model is clearly visible
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Dynamic Electric Blue & Soft Violet spotlights for high-tech HUD look
    const blueLight = new THREE.PointLight(0xadc6ff, 4, 10);
    blueLight.position.set(-3, 2, 2);
    scene.add(blueLight);

    const violetLight = new THREE.PointLight(0xd0bcff, 4, 10);
    violetLight.position.set(3, -2, 2);
    scene.add(violetLight);

    // 5. Ambient particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6;
      positions[i + 1] = (Math.random() - 0.5) * 6 + 1;
      positions[i + 2] = (Math.random() - 0.5) * 6;

      const r = Math.random() > 0.5 ? 173 / 255 : 208 / 255;
      const g = Math.random() > 0.5 ? 198 / 255 : 188 / 255;
      const b = 255 / 255;
      colors[i] = r;
      colors[i + 1] = g;
      colors[i + 2] = b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 6. Build Fallback 3D Graduation Objects
    const fallbackGroup = new THREE.Group();
    fallbackGroupRef.current = fallbackGroup;
    scene.add(fallbackGroup);

    // Stylized Academic Cap
    const capCapGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 4);
    capCapGeo.rotateY(Math.PI / 4);
    const capCapMat = new THREE.MeshStandardMaterial({
      color: 0x1d2027,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.8,
    });
    const capCap = new THREE.Mesh(capCapGeo, capCapMat);
    capCap.position.y = 1.2;
    fallbackGroup.add(capCap);

    const wireframeCap = new THREE.LineSegments(
      new THREE.EdgesGeometry(capCapGeo),
      new THREE.LineBasicMaterial({ color: 0xadc6ff })
    );
    capCap.add(wireframeCap);

    const skullGeo = new THREE.CylinderGeometry(0.4, 0.45, 0.3, 16);
    const skull = new THREE.Mesh(skullGeo, capCapMat);
    skull.position.y = 1.0;
    fallbackGroup.add(skull);

    const wireframeSkull = new THREE.LineSegments(
      new THREE.EdgesGeometry(skullGeo),
      new THREE.LineBasicMaterial({ color: 0xd0bcff })
    );
    skull.add(wireframeSkull);

    const tasselGroup = new THREE.Group();
    const tasselStringGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 1.25, 0),
      new THREE.Vector3(0.7, 1.15, 0),
      new THREE.Vector3(0.75, 0.8, 0),
    ]);
    const tasselLine = new THREE.Line(
      tasselStringGeo,
      new THREE.LineBasicMaterial({ color: 0xffb786 })
    );
    tasselGroup.add(tasselLine);

    const tasselFringeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.15, 8);
    const tasselFringe = new THREE.Mesh(
      tasselFringeGeo,
      new THREE.MeshStandardMaterial({ color: 0xffb786, emissive: 0x723600 })
    );
    tasselFringe.position.set(0.75, 0.72, 0);
    tasselGroup.add(tasselFringe);
    fallbackGroup.add(tasselGroup);

    // Stylized Diploma Roll
    const diplomaGroup = new THREE.Group();
    const paperGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.0, 16);
    paperGeo.rotateZ(Math.PI / 4);
    const paperMat = new THREE.MeshStandardMaterial({
      color: 0xe1e2ec,
      roughness: 0.5,
    });
    const paper = new THREE.Mesh(paperGeo, paperMat);
    diplomaGroup.add(paper);

    const wireframePaper = new THREE.LineSegments(
      new THREE.EdgesGeometry(paperGeo),
      new THREE.LineBasicMaterial({ color: 0xadc6ff })
    );
    paper.add(wireframePaper);

    const ribbonGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.15, 16);
    ribbonGeo.rotateZ(Math.PI / 4);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xd0bcff,
      emissive: 0x3c0091,
    });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    diplomaGroup.add(ribbon);

    diplomaGroup.position.set(0, 0.3, 0);
    fallbackGroup.add(diplomaGroup);

    // Interactive cursor following state
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        mouseY = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      }
    };

    const containerElement = containerRef.current;
    containerElement?.addEventListener("mousemove", handleMouseMove);

    // Add OrbitControls for user interaction (drag to rotate)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.08;
        particlesRef.current.rotation.x = elapsedTime * 0.04;
      }

      // Ensure OrbitControls dampening works
      controls.update();

      if (fallbackGroupRef.current) {
        fallbackGroupRef.current.visible = isUsingFallbackRef.current;
      }

      if (currentModelRef.current) {
        currentModelRef.current.visible = !isUsingFallbackRef.current;
        // Apply cursor-following subtle rotation (while still allowing OrbitControls for camera)
        currentModelRef.current.rotation.y = targetX * 0.6;
        currentModelRef.current.rotation.x = targetY * 0.4;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerElement || !renderer || !camera) return;
      const w = containerElement.clientWidth;
      const h = containerElement.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Automatically trigger loading of the custom design.glb
    setModelUrl("/design.glb");

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      containerElement?.removeEventListener("mousemove", handleMouseMove);
      controls.dispose();
      
      // Clean up Three.js objects
      particleGeo.dispose();
      particleMat.dispose();
      capCapGeo.dispose();
      capCapMat.dispose();
      skullGeo.dispose();
      tasselStringGeo.dispose();
      tasselFringeGeo.dispose();
      tasselFringe.material.dispose();
      paperGeo.dispose();
      paperMat.dispose();
      ribbonGeo.dispose();
      ribbonMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Load custom GLB model when modelUrl changes
  useEffect(() => {
    if (!modelUrl || !sceneRef.current) return;

    setLoading(true);
    setIsUsingFallback(false);

    // Remove previous custom model if exists
    if (currentModelRef.current) {
      sceneRef.current.remove(currentModelRef.current);
      currentModelRef.current = null;
    }

    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        currentModelRef.current = model;

        // Auto center and scale model
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Center position
        model.position.x = -center.x;
        model.position.y = -center.y; // Centered exactly based on bounding box
        model.position.z = -center.z;

        // Scale fit
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
          const scale = 2.0 / maxDim;
          model.scale.set(scale, scale, scale);
        }

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        sceneRef.current?.add(model);
        setLoading(false);
      },
      undefined,
      (err) => {
        console.error(err);
        setError("Failed to parse GLB file. Make sure it is a valid binary glTF (.glb) file.");
        setIsUsingFallback(true);
        setLoading(false);
      }
    );
  }, [modelUrl]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      {/* 3D Canvas Canvas container */}
      <div 
        ref={containerRef} 
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="w-full h-[360px] relative cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden"
      >
        {loading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex flex-col gap-3 items-center justify-center z-20">
            <RefreshCw className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm font-mono text-primary animate-pulse font-medium">COMPILING 3D ASSETS...</p>
          </div>
        )}
      </div>


    </div>
  );
}
