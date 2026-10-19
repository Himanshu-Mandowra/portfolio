import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * ============================================================================
 * BEGINNER-FRIENDLY THREE.JS BACKGROUND COMPONENT (SCROLL-REACTIVE 3D MODEL)
 * ============================================================================
 * Step-by-step Three.js scene that adapts to Dark, Light, and B&W themes AND
 * smoothly rotates + scales bigger in the background as the user scrolls down:
 * 1. SCENE    -> 3D world container
 * 2. CAMERA   -> PerspectiveCamera
 * 3. RENDERER -> WebGLRenderer with transparent alpha
 * 4. MESHES   -> 3D Umbrella Octagon + Inner Crystal + Gyroscope Ring + Particles
 * 5. SCROLL   -> Smoothly lerps scale (1x -> 2.6x) and 3D rotation on scroll!
 * ============================================================================
 */
function RequiemThreeBackground({ outbreakMode = false, theme = "dark" }) {
  const mountRef = useRef(null);
  const outbreakRef = useRef(outbreakMode);
  const themeRef = useRef(theme);

  useEffect(() => {
    outbreakRef.current = outbreakMode;
  }, [outbreakMode]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // STEP 1: Create Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 8.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // STEP 2: Create 3D Model Group (Umbrella Octagon + Inner Crystal + Gyro Ring)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 2A: Outer 3D Umbrella Octagon Frame
    const octagonGeometry = new THREE.CylinderGeometry(2.1, 2.1, 0.32, 8);
    const octagonMaterial = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const octagonMesh = new THREE.Mesh(octagonGeometry, octagonMaterial);
    octagonMesh.rotation.x = Math.PI / 2;
    coreGroup.add(octagonMesh);

    // 2B: Inner Geodesic Crystal Core
    const innerGeometry = new THREE.IcosahedronGeometry(1.1, 1);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    coreGroup.add(innerMesh);

    // 2C: Outer Orbital Gyroscope Ring
    const ringGeometry = new THREE.TorusGeometry(2.65, 0.03, 12, 48);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    coreGroup.add(ringMesh);

    coreGroup.position.set(2.1, 0.1, -1.5);

    // STEP 3: Create Floating Particles
    const particleCount = 130;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 22;
      positions[i + 1] = (Math.random() - 0.5) * 18;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xef4444,
      size: 0.055,
      transparent: true,
      opacity: 0.42,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // STEP 4: Mouse, Scroll & Resize Listeners
    let mouseX = 0;
    let mouseY = 0;
    let targetScrollProgress = 0;
    let smoothScrollProgress = 0;

    const handleMouseMove = (event) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    };

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      targetScrollProgress = Math.min(1, Math.max(0, scrollTop / maxScroll));
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      handleScroll();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", handleResize);
    handleScroll();

    // STEP 5: Animation Loop (Combines Idle Rotation + Scroll-Driven Scale & Rotation)
    let animationFrameId;
    let elapsedIdleAngle = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const speed = outbreakRef.current ? 3.5 : 1;
      const currentTheme = themeRef.current;

      // Buttery smooth interpolation of scroll progress
      smoothScrollProgress +=
        (targetScrollProgress - smoothScrollProgress) * 0.055;

      elapsedIdleAngle += 0.0022 * speed;

      // Adapt 3D colors to Dark, Light, or B&W theme
      if (currentTheme === "bw") {
        octagonMaterial.color.setHex(0xffffff);
        innerMaterial.color.setHex(0xa3a3a3);
        ringMaterial.color.setHex(0xffffff);
        particleMaterial.color.setHex(0xffffff);
        octagonMaterial.opacity = 0.16 + smoothScrollProgress * 0.1;
      } else if (currentTheme === "light") {
        octagonMaterial.color.setHex(0x2563eb);
        innerMaterial.color.setHex(0x64748b);
        ringMaterial.color.setHex(0x0284c7);
        particleMaterial.color.setHex(0x2563eb);
        octagonMaterial.opacity = 0.13 + smoothScrollProgress * 0.08;
        innerMaterial.opacity = 0.14;
        ringMaterial.opacity = 0.12;
        particleMaterial.opacity = 0.28;
      } else {
        octagonMaterial.color.setHex(0xef4444);
        innerMaterial.color.setHex(0x38bdf8);
        ringMaterial.color.setHex(0xef4444);
        particleMaterial.color.setHex(0xef4444);
        octagonMaterial.opacity = outbreakRef.current
          ? 0.42
          : 0.18 + smoothScrollProgress * 0.12;
      }

      // 1) Make 3D model GROW BIGGER as user scrolls down (1.0x -> 2.65x)
      const currentScale = 1 + smoothScrollProgress * 1.65;
      coreGroup.scale.set(currentScale, currentScale, currentScale);

      // 2) Smoothly glide 3D model toward center-stage as it grows bigger
      coreGroup.position.x = 2.1 * (1 - smoothScrollProgress * 0.85);
      coreGroup.position.y = 0.1 + Math.sin(smoothScrollProgress * Math.PI) * 0.25;
      coreGroup.position.z = -1.5 + smoothScrollProgress * 1.2;

      // 3) Rotate 3D model dynamically as user scrolls down + mouse parallax
      const targetRotY =
        smoothScrollProgress * Math.PI * 3.2 + mouseX * 0.65;
      const targetRotX =
        smoothScrollProgress * Math.PI * 1.5 + mouseY * 0.65;

      coreGroup.rotation.y += (targetRotY - coreGroup.rotation.y) * 0.08;
      coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.08;

      // Spin individual sub-meshes faster as user scrolls
      octagonMesh.rotation.z =
        elapsedIdleAngle + smoothScrollProgress * Math.PI * 4.0;
      innerMesh.rotation.x =
        -elapsedIdleAngle * 1.4 - smoothScrollProgress * Math.PI * 3.0;
      innerMesh.rotation.y =
        elapsedIdleAngle * 1.8 + smoothScrollProgress * Math.PI * 3.5;
      ringMesh.rotation.z =
        -elapsedIdleAngle * 1.2 + smoothScrollProgress * Math.PI * 2.5;
      ringMesh.rotation.y = smoothScrollProgress * Math.PI * 2.0;

      // Rotate and elevate particle field with scroll
      particles.rotation.y =
        elapsedIdleAngle * 0.25 + smoothScrollProgress * 1.4;
      particles.rotation.x = smoothScrollProgress * 0.65;

      renderer.render(scene, camera);
    };

    animate();

    // STEP 6: Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("resize", handleResize);
      octagonGeometry.dispose();
      octagonMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    />
  );
}

export default RequiemThreeBackground;
