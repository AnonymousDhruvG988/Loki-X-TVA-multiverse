import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * 03 & 04 — HIGH-PERFORMANCE 3D THE VARIANT CENTERPIECE
 * 
 * Aggressive Performance Optimizations:
 * 1. Persistent WebGL canvas initialized once on mount.
 * 2. Particle count: ~950 visible particles (desktop) / ~280 (mobile).
 * 3. ZERO React state updates on mousemove or scroll.
 * 4. IntersectionObserver pauses RAF render loop when scrolled out of view.
 * 5. Cheap visual illusion: fake radial glow texture + additive blending instead of expensive bloom.
 * 6. Subtle breathing & micro-sway instead of aggressive continuous mathematical rotation.
 */
export default function Variant3D({ isLokiHovered = false, clockReversed = false }) {
  const containerRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const clockReversedRef = useRef(clockReversed);
  const isLokiHoveredRef = useRef(isLokiHovered);

  useEffect(() => {
    clockReversedRef.current = clockReversed;
  }, [clockReversed]);

  useEffect(() => {
    isLokiHoveredRef.current = isLokiHovered;
  }, [isLokiHovered]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. WebGL Support Verification
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 2. Camera & Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 80);
    camera.position.set(0, 0.25, 6.2);

    // 3. Optimized WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
      precision: isMobile ? 'mediump' : 'highp',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.5));
    container.appendChild(renderer.domElement);

    // 4. Concentric TVA Mechanism Rings (Behind Variant)
    const mechanismGroup = new THREE.Group();
    const ringRadii = [2.2, 3.1, 4.0];
    const ringColors = [0x173F32, 0x245C46, 0xF5A623];
    const ringMeshes = [];

    ringRadii.forEach((radius, idx) => {
      const segments = isMobile ? 48 : 72;
      const circleGeom = new THREE.BufferGeometry();
      const circlePoints = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        circlePoints.push(Math.cos(theta) * radius, Math.sin(theta) * radius, 0);
      }
      circleGeom.setAttribute('position', new THREE.Float32BufferAttribute(circlePoints, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: ringColors[idx],
        transparent: true,
        opacity: idx === 2 ? 0.35 : 0.5,
      });
      const line = new THREE.Line(circleGeom, lineMat);
      mechanismGroup.add(line);
      ringMeshes.push({ mesh: line, speed: (idx % 2 === 0 ? 0.02 : -0.015) });
    });

    mechanismGroup.position.set(1.4, 0.3, -1.6);
    if (isMobile) {
      mechanismGroup.position.set(0, 0.15, -2.2);
      mechanismGroup.scale.set(0.65, 0.65, 0.65);
    }
    scene.add(mechanismGroup);

    // 5. Optimized Variant Particle Entity (~950 Desktop / ~280 Mobile)
    const baseCount = isMobile ? 280 : 950;
    const positions = [];
    const colors = [];
    const originalPositions = [];
    const rndAttrs = [];

    // Canonical TVA Palette
    const energyGreen = new THREE.Color('#7FCF8A');
    const brightGreen = new THREE.Color('#A8E6A3');
    const tvaAmber = new THREE.Color('#F5A623');
    const tvaOrange = new THREE.Color('#FF6B00');
    const deepGreen = new THREE.Color('#173F32');

    // A. Head & Face (18%)
    const headCount = Math.floor(baseCount * 0.18);
    for (let i = 0; i < headCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.cbrt(Math.random()) * 0.36;

      const x = r * Math.sin(phi) * Math.cos(theta) * 0.8;
      const y = r * Math.cos(phi) * 1.15 + 1.35;
      const z = r * Math.sin(phi) * Math.sin(theta) * 0.82;

      positions.push(x, y, z);
      originalPositions.push(x, y, z);
      rndAttrs.push(Math.random(), Math.random(), Math.random());

      const isRim = Math.hypot(x, z) > 0.18;
      const c = isRim ? energyGreen : deepGreen;
      colors.push(c.r, c.g, c.b);
    }

    // B. Shoulders & Collar (24%)
    const shoulderCount = Math.floor(baseCount * 0.24);
    for (let i = 0; i < shoulderCount; i++) {
      const side = Math.random() > 0.5 ? 1 : -1;
      const span = Math.random();
      const x = side * (0.28 + span * 0.95) + (Math.random() - 0.5) * 0.1;
      const y = 0.98 - Math.pow(span, 1.4) * 0.42 + (Math.random() - 0.5) * 0.15;
      const z = (Math.random() - 0.5) * 0.32;

      positions.push(x, y, z);
      originalPositions.push(x, y, z);
      rndAttrs.push(Math.random(), Math.random(), Math.random());

      const c = span > 0.6 ? tvaAmber : energyGreen;
      colors.push(c.r, c.g, c.b);
    }

    // C. Torso & Chest Silhouette (28%)
    const torsoCount = Math.floor(baseCount * 0.28);
    for (let i = 0; i < torsoCount; i++) {
      const y = 0.92 - Math.random() * 1.15;
      const taper = 1.0 - (0.92 - y) * 0.38;
      const theta = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.65) * 0.44 * taper;

      const x = r * Math.cos(theta) * 1.15;
      const z = r * Math.sin(theta) * 0.6;

      positions.push(x, y, z);
      originalPositions.push(x, y, z);
      rndAttrs.push(Math.random(), Math.random(), Math.random());

      const c = Math.random() > 0.4 ? energyGreen : tvaAmber;
      colors.push(c.r, c.g, c.b);
    }

    // D. Temporal Cloak & Filament Hem (20%)
    const cloakCount = Math.floor(baseCount * 0.20);
    for (let i = 0; i < cloakCount; i++) {
      const prog = Math.random();
      const y = -0.22 - prog * 1.4;
      const spread = 0.42 + prog * 0.72;
      const x = (Math.random() - 0.5) * spread * 2.2;
      const z = (Math.random() - 0.5) * 0.45;

      positions.push(x, y, z);
      originalPositions.push(x, y, z);
      rndAttrs.push(Math.random(), Math.random(), Math.random());

      const c = prog > 0.5 ? tvaOrange : energyGreen;
      colors.push(c.r, c.g, c.b);
    }

    // E. Horn Particles (10%)
    const hornCount = Math.floor(baseCount * 0.10);
    for (let i = 0; i < hornCount; i++) {
      const side = Math.random() > 0.5 ? 1 : -1;
      const t = Math.random();
      const x = side * (0.24 + Math.pow(t, 1.2) * 0.85);
      const y = 1.6 + t * 1.55;
      const z = (Math.random() - 0.5) * 0.15;

      positions.push(x, y, z);
      originalPositions.push(x, y, z);
      rndAttrs.push(Math.random(), Math.random(), Math.random());

      const c = t > 0.6 ? tvaAmber : brightGreen;
      colors.push(c.r, c.g, c.b);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('originalPos', new THREE.Float32BufferAttribute(originalPositions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('rnd', new THREE.Float32BufferAttribute(rndAttrs, 3));

    // Fast 32x32 Fake Glow Texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(127, 207, 138, 0.85)');
    grad.addColorStop(0.7, 'rgba(245, 166, 35, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 32, 32);
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    // Lightweight Custom Shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uTexture: { value: particleTexture },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uScroll;
        uniform vec2 uMouse;
        attribute vec3 originalPos;
        attribute vec3 rnd;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = color;
          vec3 pos = originalPos;

          // Subtle breathing (low computational frequency)
          float breath = sin(uTime * 1.2 + pos.y * 1.5) * 0.025;
          pos.x += pos.x * breath;
          pos.z += pos.z * breath;

          // Subtle mouse tilt
          pos.x += uMouse.x * 0.08;
          pos.y += uMouse.y * 0.05;

          // Scroll dispersal
          if (uScroll > 0.01) {
            vec3 scatterDir = (rnd - vec3(0.5)) * uScroll * 4.0;
            pos += scatterDir;
          }

          vAlpha = clamp(1.0 - uScroll * 1.5, 0.0, 1.0);

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (22.0 / -mvPosition.z) * (0.8 + rnd.x * 0.5);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec4 tex = texture2D(uTexture, gl_PointCoord);
          if (tex.a < 0.05) discard;
          gl_FragColor = vec4(vColor, tex.a * vAlpha * 0.9);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const particles = new THREE.Points(geometry, material);

    // 6. Signature Horn Curvature Lines
    const hornGroup = new THREE.Group();
    for (let h = 0; h < 2; h++) {
      const side = h === 0 ? -1 : 1;
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(side * 0.24, 1.62, -0.05),
        new THREE.Vector3(side * 0.52, 2.15, -0.12),
        new THREE.Vector3(side * 0.92, 2.78, -0.18),
        new THREE.Vector3(side * 1.05, 3.12, 0.0)
      );
      const points = curve.getPoints(isMobile ? 24 : 45);
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x7FCF8A,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });
      const hornLine = new THREE.Line(lineGeom, lineMat);
      hornGroup.add(hornLine);
    }

    // Placement
    particles.position.set(1.4, -0.25, 0);
    hornGroup.position.set(1.4, -0.25, 0);

    if (isMobile) {
      particles.position.set(0, -0.2, -1.0);
      particles.scale.set(0.68, 0.68, 0.68);
      hornGroup.position.set(0, -0.2, -1.0);
      hornGroup.scale.set(0.68, 0.68, 0.68);
    }

    scene.add(particles);
    scene.add(hornGroup);

    setIsLoaded(true);

    // 7. Passive Zero-Latency Pointer Tracking (Ref-Only, No React State)
    const mouseTarget = { x: 0, y: 0 };
    const mouseCurrent = { x: 0, y: 0 };

    const handlePointerMove = (e) => {
      mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseTarget.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 8. Viewport Resize Handler
    const handleResize = () => {
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 9. IntersectionObserver to PAUSE RAF when Scrolled Out of View
    let isVisible = true;
    let animId = null;
    const clock = new THREE.Clock();

    const renderFrame = () => {
      if (!isVisible) {
        animId = null;
        return;
      }

      const elapsed = clock.getElapsedTime();

      // Rotate TVA Mechanism clock rings slowly (Section 48 Easter Egg: reversable)
      const clockDirection = clockReversedRef.current ? -1.5 : 1;
      ringMeshes.forEach((rm) => {
        rm.mesh.rotation.z += rm.speed * 0.015 * clockDirection;
      });

      // Update shader uniform time
      material.uniforms.uTime.value = elapsed;

      // Mouse Parallax Lerp (Subtle, max 5-15px equivalent)
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.05;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.05;
      material.uniforms.uMouse.value.set(mouseCurrent.x, -mouseCurrent.y);

      // Read window scroll directly for zero-render shader dispersal
      const scrollY = window.scrollY || 0;
      const scrollNormalized = Math.min(1.0, scrollY / (window.innerHeight * 0.8));
      material.uniforms.uScroll.value = scrollNormalized;

      // Horn lines fade on scroll & intensify on Loki hover (Section 35)
      const hoverBoost = isLokiHoveredRef.current ? 1.4 : 1.0;
      hornGroup.children.forEach((l) => {
        l.material.opacity = Math.max(0, 0.7 * (1.0 - scrollNormalized * 1.8) * hoverBoost);
      });

      // Extremely subtle silhouette sway
      const swaySpeed = isLokiHoveredRef.current ? 0.45 : 0.25;
      particles.rotation.y = Math.sin(elapsed * swaySpeed) * 0.05 + mouseCurrent.x * 0.06;
      hornGroup.rotation.y = particles.rotation.y;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderFrame);
    };

    // Start RAF
    animId = requestAnimationFrame(renderFrame);

    // Observer pauses renderFrame when hero is not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          animId = requestAnimationFrame(renderFrame);
        }
      },
      { rootMargin: '100px 0px' }
    );
    observer.observe(container);

    // Cleanup
    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []); // Run ONCE on mount! Never tear down on scroll or mouse move!

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {!isLoaded && (
        <div className="absolute top-8 right-8 text-[10px] font-mono text-[#7FCF8A]/80 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] animate-ping" />
          <span>SYNCHRONIZING TEMPORAL LOOM...</span>
        </div>
      )}

      {/* Static SVG Fallback for legacy devices without WebGL */}
      {!hasWebGL && (
        <div className="absolute right-12 top-1/2 -translate-y-1/2 w-80 h-96 opacity-40">
          <svg viewBox="0 0 200 300" className="w-full h-full text-[#7FCF8A]">
            <ellipse cx="100" cy="80" rx="20" ry="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 80 70 Q 40 30 25 10 M 120 70 Q 160 30 175 10" fill="none" stroke="#F5A623" strokeWidth="2" />
            <path d="M 40 180 C 60 130 140 130 160 180" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}
    </div>
  );
}
