import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { soundEngine } from "../utils/soundEngine";

/**
 * Large scattered social media icons positioned organically across the 1024x576 laptop screen.
 */
const SCATTERED_ICONS = [
  {
    id: "github",
    cx: 240,
    cy: 195,
    r: 96,
    angle: -0.1,
    color: "#8b5cf6",
    bgStart: "#2e1065",
    bgEnd: "#0f172a",
    href: "https://github.com/Himanshu-Mandowra",
  },
  {
    id: "linkedin",
    cx: 535,
    cy: 355,
    r: 100,
    angle: 0.08,
    color: "#38bdf8",
    bgStart: "#0284c7",
    bgEnd: "#0f172a",
    href: "http://www.linkedin.com/in/himanshu-mandowra",
  },
  {
    id: "twitter",
    cx: 805,
    cy: 190,
    r: 94,
    angle: 0.11,
    color: "#f8fafc",
    bgStart: "#1e293b",
    bgEnd: "#020617",
    href: "https://x.com/Himshu_Mandowra",
  },
  {
    id: "mail",
    cx: 810,
    cy: 425,
    r: 82,
    angle: -0.08,
    color: "#f43f5e",
    bgStart: "#881337",
    bgEnd: "#0f172a",
    href: "mailto:himanshu.mandowra1234@gmail.com",
  },
];

/**
 * Generates a high-DPI circular chrome DELL medallion texture for the closed top lid.
 */
function createDellMedallionTexture(isBW, isLight) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  const cx = 256;
  const cy = 256;
  const radius = 228;

  const bgGrad = ctx.createRadialGradient(cx - 40, cy - 40, 20, cx, cy, radius);
  if (isLight) {
    bgGrad.addColorStop(0, "#334155");
    bgGrad.addColorStop(1, "#0f172a");
  } else if (isBW) {
    bgGrad.addColorStop(0, "#262626");
    bgGrad.addColorStop(1, "#0a0a0a");
  } else {
    bgGrad.addColorStop(0, "#1e293b");
    bgGrad.addColorStop(1, "#090d16");
  }

  ctx.fillStyle = bgGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  // Outer chrome DELL circle ring
  ctx.strokeStyle = "#f8fafc";
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 14, 0, Math.PI * 2);
  ctx.stroke();

  // Draw D - E (slanted) - L - L
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 104px 'Arial Black', 'Orbitron', sans-serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  ctx.fillText("D", cx - 114, cy + 4);

  ctx.save();
  ctx.translate(cx - 36, cy);
  ctx.rotate(-0.42);
  ctx.fillText("E", 0, 4);
  ctx.restore();

  ctx.fillText("L", cx + 42, cy + 4);
  ctx.fillText("L", cx + 116, cy + 4);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Helper to draw a single social icon glyph centered at (0, 0).
 */
function drawIconGlyph(ctx, icon, isBW, innerCutoutColor) {
  if (icon.id === "github") {
    ctx.beginPath();
    ctx.arc(0, -6, 46, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-36, -28);
    ctx.lineTo(-44, -56);
    ctx.lineTo(-14, -44);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(36, -28);
    ctx.lineTo(44, -56);
    ctx.lineTo(14, -44);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(-24, 30, 48, 28, 12);
    ctx.fill();

    ctx.fillStyle = innerCutoutColor;
    ctx.font = "900 34px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("</>", 0, -4);
  } else if (icon.id === "linkedin") {
    ctx.font = "900 102px 'Arial Black', 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("in", 0, 6);
  } else if (icon.id === "twitter") {
    ctx.lineWidth = 13;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-38, -40);
    ctx.lineTo(38, 40);
    ctx.moveTo(38, -40);
    ctx.lineTo(-38, 40);
    ctx.stroke();
  } else if (icon.id === "mail") {
    ctx.lineWidth = 8;
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.roundRect(-46, -32, 92, 64, 10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-44, -28);
    ctx.lineTo(0, 8);
    ctx.lineTo(44, -28);
    ctx.stroke();
  }
}

/**
 * Draws the glowing inner laptop wallpaper with large, scattered Social Media Icons
 * and a live System-Error RGB Chromatic Glitch & Jiggle Effect.
 */
function drawScreenCanvas(canvas, isBW, hoveredIdx = -1, timeMs = 0) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Deep cybernetic desktop wallpaper
  const grad = ctx.createRadialGradient(512, 288, 60, 512, 288, 620);
  if (isBW) {
    grad.addColorStop(0, "#1f1f1f");
    grad.addColorStop(1, "#050505");
  } else {
    grad.addColorStop(0, "#172554");
    grad.addColorStop(0.55, "#0f172a");
    grad.addColorStop(1, "#020617");
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle decorative glowing constellation lines connecting the scattered icons
  ctx.save();
  ctx.strokeStyle = isBW ? "rgba(255,255,255,0.12)" : "rgba(56,189,248,0.22)";
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  SCATTERED_ICONS.forEach((item, i) => {
    if (i === 0) ctx.moveTo(item.cx, item.cy);
    else ctx.lineTo(item.cx, item.cy);
  });
  ctx.stroke();
  ctx.restore();

  // Top Minimal OS Bar
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fillRect(0, 0, 1024, 42);
  ["#ef4444", "#f59e0b", "#10b981"].forEach((col, i) => {
    ctx.fillStyle = isBW ? "#ffffff" : col;
    ctx.beginPath();
    ctx.arc(32 + i * 26, 21, 7, 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw each large scattered social media icon with System-Error Jiggle + Chromatic Glitch
  SCATTERED_ICONS.forEach((icon, idx) => {
    const isHovered = hoveredIdx === idx;

    // Deterministic system-error glitch burst per icon based on timeMs
    const phase = timeMs * 0.006 + idx * 2.15;
    const pulseWave = Math.sin(phase) * Math.cos(phase * 2.7);
    const isGlitching = isHovered || Math.abs(pulseWave) > 0.62;

    const jitterX = isGlitching
      ? Math.sin(timeMs * 0.09 + idx * 5) * (isHovered ? 10 : 7)
      : 0;
    const jitterY = isGlitching
      ? Math.cos(timeMs * 0.11 + idx * 3) * (isHovered ? 7 : 4.5)
      : 0;
    const jitterSkew = isGlitching
      ? Math.sin(timeMs * 0.08 + idx) * 0.065
      : 0;

    const scale = isHovered ? 1.12 : 1.0;
    const boxSize = icon.r * 1.65;
    const half = boxSize / 2;

    ctx.save();
    ctx.translate(icon.cx + jitterX, icon.cy + jitterY);
    ctx.rotate(icon.angle + jitterSkew);
    ctx.scale(scale, scale);

    // 1. SYSTEM-ERROR RGB CHROMATIC ABERRATION GHOSTS (Red + Cyan Split)
    if (isGlitching) {
      // Red Error Ghost (+X, -Y)
      ctx.save();
      ctx.translate(10, -5);
      ctx.strokeStyle = isBW
        ? "rgba(255,255,255,0.55)"
        : "rgba(255, 0, 60, 0.78)";
      ctx.fillStyle = isBW
        ? "rgba(255,255,255,0.18)"
        : "rgba(255, 0, 60, 0.22)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(-half, -half, boxSize, boxSize, 36);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Cyan Error Ghost (-X, +Y)
      ctx.save();
      ctx.translate(-10, 5);
      ctx.strokeStyle = isBW
        ? "rgba(180,180,180,0.55)"
        : "rgba(0, 240, 255, 0.78)";
      ctx.fillStyle = isBW
        ? "rgba(180,180,180,0.15)"
        : "rgba(0, 240, 255, 0.2)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(-half, -half, boxSize, boxSize, 36);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // 2. Outer neon halo glow
    const halo = ctx.createRadialGradient(
      0,
      0,
      icon.r * 0.4,
      0,
      0,
      icon.r * 1.45
    );
    halo.addColorStop(
      0,
      isBW
        ? "rgba(255,255,255,0.35)"
        : isGlitching
        ? "rgba(239, 68, 68, 0.6)"
        : `${icon.color}55`
    );
    halo.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(0, 0, icon.r * 1.45, 0, Math.PI * 2);
    ctx.fill();

    // 3. Rounded squircle tile background
    const tileGrad = ctx.createLinearGradient(-half, -half, half, half);
    tileGrad.addColorStop(0, isBW ? "#262626" : icon.bgStart);
    tileGrad.addColorStop(1, isBW ? "#0a0a0a" : icon.bgEnd);

    ctx.fillStyle = tileGrad;
    ctx.strokeStyle = isHovered
      ? "#ffffff"
      : isGlitching && !isBW
      ? "#ef4444"
      : isBW
      ? "rgba(255,255,255,0.7)"
      : icon.color;
    ctx.lineWidth = isHovered ? 7 : isGlitching ? 5.5 : 4.5;

    ctx.beginPath();
    ctx.roundRect(-half, -half, boxSize, boxSize, 36);
    ctx.fill();
    ctx.stroke();

    // 4. Chromatic Ghost Glyph when Glitching
    if (isGlitching) {
      ctx.save();
      ctx.translate(6, -3);
      ctx.fillStyle = isBW ? "rgba(255,255,255,0.4)" : "rgba(255, 0, 60, 0.7)";
      ctx.strokeStyle = isBW
        ? "rgba(255,255,255,0.4)"
        : "rgba(255, 0, 60, 0.7)";
      drawIconGlyph(ctx, icon, isBW, isBW ? "#171717" : icon.bgStart);
      ctx.restore();

      ctx.save();
      ctx.translate(-6, 3);
      ctx.fillStyle = isBW ? "rgba(200,200,200,0.4)" : "rgba(0, 240, 255, 0.7)";
      ctx.strokeStyle = isBW
        ? "rgba(200,200,200,0.4)"
        : "rgba(0, 240, 255, 0.7)";
      drawIconGlyph(ctx, icon, isBW, isBW ? "#171717" : icon.bgStart);
      ctx.restore();
    }

    // 5. Main Crisp White Icon Glyph
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";
    drawIconGlyph(ctx, icon, isBW, isBW ? "#171717" : icon.bgStart);

    // 6. Horizontal System-Error Scanline Slice Bar across the icon during glitch
    if (isGlitching) {
      const sliceY = ((timeMs * 0.25 + idx * 45) % boxSize) - half;
      ctx.fillStyle = isBW
        ? "rgba(255,255,255,0.45)"
        : "rgba(255, 40, 80, 0.65)";
      ctx.fillRect(-half - 8, sliceY, boxSize + 16, 6);
    }

    ctx.restore();
  });
}

function GamingLaptop3D({ openProgress = 0, theme = "dark" }) {
  const mountRef = useRef(null);
  const lidNodeRef = useRef(null);
  const laptopRigRef = useRef(null);
  const innerScreenMeshRef = useRef(null);
  const progressRef = useRef(openProgress);
  const [modelLoaded, setModelLoaded] = useState(false);

  const isBW = theme === "bw";
  const isLight = theme === "light";

  useEffect(() => {
    progressRef.current = openProgress;
  }, [openProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return undefined;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();

    // Pulled-back camera + wider FOV so the 3D laptop never clips at any margin
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.52, 6.2);
    camera.lookAt(0, 0.22, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Studio Lighting for the 3D Gaming Laptop
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.45);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(3.5, 6.5, 5.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(
      isBW ? 0xffffff : 0x38bdf8,
      1.7
    );
    rimLight.position.set(-4.5, 3.5, -3.5);
    scene.add(rimLight);

    const frontFill = new THREE.DirectionalLight(
      isBW ? 0xe5e5e5 : 0x60a5fa,
      1.25
    );
    frontFill.position.set(0, 2.0, 6.0);
    scene.add(frontFill);

    const rigGroup = new THREE.Group();
    scene.add(rigGroup);
    laptopRigRef.current = rigGroup;

    const dellMedallionTex = createDellMedallionTexture(isBW, isLight);

    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 1024;
    screenCanvas.height = 576;
    drawScreenCanvas(screenCanvas, isBW, -1, 0);
    const screenTex = new THREE.CanvasTexture(screenCanvas);
    screenTex.colorSpace = THREE.SRGBColorSpace;
    screenTex.needsUpdate = true;

    // Initialize rig in CLOSED state immediately (frame 0), tilted toward the right and centered vertically
    const initP = Math.max(0, Math.min(1, progressRef.current));
    rigGroup.rotation.x = 0.78 * (1 - initP) + 0.16 * initP;
    rigGroup.rotation.y = 0.18 * (1 - initP) + 0.46 * initP;
    rigGroup.position.x = -0.36 * initP;
    rigGroup.position.y = 0.18 * (1 - initP) - 0.14 * initP;
    rigGroup.scale.setScalar(0.84 * (1 - initP) + 0.78 * initP);

    let isDisposed = false;
    const loader = new GLTFLoader();

    loader.load(
      `${process.env.PUBLIC_URL || ""}/models/gaming_laptop.glb`,
      (gltf) => {
        if (isDisposed) return;
        const model = gltf.scene;

        // Orient front of laptop (+X in GLB) toward camera (+Z in World)
        model.rotation.y = -Math.PI / 2;
        model.position.set(0, -0.2, 0);

        let lidNode = null;
        model.traverse((child) => {
          if (
            child.name === "Cube001_1" ||
            child.name === "Cube.001_1" ||
            child.name.startsWith("Cube001") ||
            child.name.startsWith("Cube.001")
          ) {
            lidNode = child;
          }
          if (child.name === "Object_11" || child.name === "Object_7") {
            if (child.material && child.material.name === "Material.013") {
              child.visible = false;
            }
          }
        });

        if (lidNode) {
          lidNode.matrixAutoUpdate = true;
          const curP = Math.max(0, Math.min(1, progressRef.current));
          lidNode.rotation.set(0, 0, -Math.PI + curP * (-1.38025 - -Math.PI));
          lidNodeRef.current = lidNode;

          // 1. Circular DELL Logo Medallion on the outer top cover of the closed laptop
          const dellGeo = new THREE.CircleGeometry(0.46, 64);
          const dellMat = new THREE.MeshStandardMaterial({
            map: dellMedallionTex,
            metalness: 0.5,
            roughness: 0.25,
            side: THREE.FrontSide,
          });
          const dellMesh = new THREE.Mesh(dellGeo, dellMat);

          const lidOuterBasis = new THREE.Matrix4().makeBasis(
            new THREE.Vector3(0, 0, -1),
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(0, -1, 0)
          );
          dellMesh.rotation.setFromRotationMatrix(lidOuterBasis);
          dellMesh.position.set(-1.38, -0.074, 0);
          lidNode.add(dellMesh);

          // 2. Interactive Glowing Inner Display Screen with Scattered Error-Glitch Social Icons
          const innerScreenGeo = new THREE.PlaneGeometry(3.84, 2.11);
          const innerScreenMat = new THREE.MeshBasicMaterial({
            map: screenTex,
            side: THREE.FrontSide,
          });
          const innerScreenMesh = new THREE.Mesh(
            innerScreenGeo,
            innerScreenMat
          );
          const screenBasis = new THREE.Matrix4().makeBasis(
            new THREE.Vector3(0, 0, -1),
            new THREE.Vector3(-1, 0, 0),
            new THREE.Vector3(0, 1, 0)
          );
          innerScreenMesh.rotation.setFromRotationMatrix(screenBasis);
          innerScreenMesh.position.set(-1.45, -0.019, 0);
          lidNode.add(innerScreenMesh);
          innerScreenMeshRef.current = innerScreenMesh;
        }

        rigGroup.add(model);
        setModelLoaded(true);
      },
      undefined,
      () => {}
    );

    // Click-only 3D Rotation (No Hover Tilt) + 1-Second Auto-Return to Original Position
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let currentHoveredIcon = -1;

    let isDragging = false;
    let dragMoved = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let startOffsetRotX = 0;
    let startOffsetRotY = 0;
    let userOffsetRotX = 0;
    let userOffsetRotY = 0;
    let resetTimerId = null;

    const scheduleSnapBack = () => {
      if (resetTimerId) clearTimeout(resetTimerId);
      resetTimerId = setTimeout(() => {
        userOffsetRotX = 0;
        userOffsetRotY = 0;
      }, 1000);
    };

    const getIntersectedIcon = (clientX, clientY) => {
      if (!innerScreenMeshRef.current || progressRef.current < 0.45) return -1;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(innerScreenMeshRef.current, false);
      if (hits.length > 0 && hits[0].uv) {
        const canvasX = hits[0].uv.x * 1024;
        const canvasY = (1 - hits[0].uv.y) * 576;
        for (let i = 0; i < SCATTERED_ICONS.length; i += 1) {
          const ic = SCATTERED_ICONS[i];
          if (Math.hypot(canvasX - ic.cx, canvasY - ic.cy) <= ic.r * 0.92) {
            return i;
          }
        }
      }
      return -1;
    };

    const handlePointerDown = (e) => {
      isDragging = true;
      dragMoved = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      startOffsetRotX = userOffsetRotX;
      startOffsetRotY = userOffsetRotY;
      if (resetTimerId) clearTimeout(resetTimerId);
      renderer.domElement.style.cursor = "grabbing";
    };

    const handlePointerMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        if (Math.hypot(dx, dy) > 5) {
          dragMoved = true;
        }
        userOffsetRotY = Math.max(
          -Math.PI * 0.85,
          Math.min(Math.PI * 0.85, startOffsetRotY + dx * 0.009)
        );
        userOffsetRotX = Math.max(
          -0.75,
          Math.min(0.75, startOffsetRotX + dy * 0.007)
        );
        return;
      }

      // Only check if pointer is over a clickable icon on the screen (no hover 3D tilt)
      const iconIdx = getIntersectedIcon(e.clientX, e.clientY);
      if (iconIdx !== currentHoveredIcon) {
        currentHoveredIcon = iconIdx;
      }
      renderer.domElement.style.cursor = iconIdx !== -1 ? "pointer" : "grab";
    };

    const handlePointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      renderer.domElement.style.cursor =
        currentHoveredIcon !== -1 ? "pointer" : "grab";

      // If it was a quick click on the laptop body (not on a social icon), give a 3D click-tilt nudge
      if (!dragMoved && e && typeof e.clientX === "number") {
        const iconIdx = getIntersectedIcon(e.clientX, e.clientY);
        if (iconIdx === -1) {
          const rect = renderer.domElement.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          userOffsetRotY = nx * 0.95;
          userOffsetRotX = ny * 0.55;
        }
      }

      // Return to original position after 1 second
      scheduleSnapBack();
    };

    const handlePointerLeave = () => {
      if (isDragging) {
        isDragging = false;
        scheduleSnapBack();
      }
      renderer.domElement.style.cursor = "default";
      currentHoveredIcon = -1;
    };

    const handleClick = (e) => {
      if (dragMoved) return;
      const iconIdx = getIntersectedIcon(e.clientX, e.clientY);
      if (iconIdx !== -1 && SCATTERED_ICONS[iconIdx]) {
        soundEngine.playClick();
        const targetHref = SCATTERED_ICONS[iconIdx].href;
        if (targetHref.startsWith("mailto:")) {
          window.location.href = targetHref;
        } else {
          window.open(targetHref, "_blank", "noopener,noreferrer");
        }
      }
    };

    renderer.domElement.style.cursor = "grab";
    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
    renderer.domElement.addEventListener("click", handleClick);

    let rafId;
    let lastScreenRedraw = 0;

    const animate = (now = 0) => {
      rafId = requestAnimationFrame(animate);

      const p = Math.max(0, Math.min(1, progressRef.current));

      // Redraw the 3D laptop screen canvas (~24fps) when open so the inside icons pulse with System-Error glitch effects
      if (p > 0.15 && now - lastScreenRedraw > 42) {
        lastScreenRedraw = now;
        drawScreenCanvas(screenCanvas, isBW, currentHoveredIcon, now);
        screenTex.needsUpdate = true;
      }

      if (lidNodeRef.current) {
        const targetLidZ = -Math.PI + p * (-1.38025 - -Math.PI);
        lidNodeRef.current.rotation.z +=
          (targetLidZ - lidNodeRef.current.rotation.z) * 0.16;
      }

      if (laptopRigRef.current) {
        // More tilted toward the right (+0.46 rad / ~26.5° yaw to the right when open) and shifted further left (-0.36 * p)
        const baseRigX = 0.78 * (1 - p) + 0.16 * p;
        const baseRigY = 0.18 * (1 - p) + 0.46 * p;
        const targetRigX = baseRigX + userOffsetRotX;
        const targetRigY = baseRigY + userOffsetRotY;
        const targetPosX = -0.36 * p;
        const targetPosY = 0.18 * (1 - p) - 0.14 * p;
        const targetScale = 0.84 * (1 - p) + 0.78 * p;

        laptopRigRef.current.rotation.x +=
          (targetRigX - laptopRigRef.current.rotation.x) * 0.14;
        laptopRigRef.current.rotation.y +=
          (targetRigY - laptopRigRef.current.rotation.y) * 0.14;
        laptopRigRef.current.position.x +=
          (targetPosX - laptopRigRef.current.position.x) * 0.14;
        laptopRigRef.current.position.y +=
          (targetPosY - laptopRigRef.current.position.y) * 0.14;
        laptopRigRef.current.scale.setScalar(targetScale);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 380;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isDisposed = true;
      if (resetTimerId) clearTimeout(resetTimerId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerup", handlePointerUp);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
      renderer.domElement.removeEventListener("click", handleClick);
      cancelAnimationFrame(rafId);
      dellMedallionTex.dispose();
      screenTex.dispose();
      renderer.dispose();
    };
  }, [isBW, isLight]);

  return (
    <div className="relative h-[280px] w-full sm:h-[340px] lg:h-[380px]">
      <div ref={mountRef} className="h-full w-full" />
      {!modelLoaded && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono-tech text-xs uppercase tracking-widest theme-text-muted">
          LOADING 3D DELL GAMING LAPTOP...
        </div>
      )}
    </div>
  );
}

export default GamingLaptop3D;
