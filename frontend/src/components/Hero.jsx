import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { personalInfo } from '../mock';
import { ArrowDown } from 'lucide-react';
import ObfuscatedEmail from './ObfuscatedEmail';

const Hero = ({ theme }) => {
  const canvasRef = useRef(null);
  const materialRef = useRef(null);
  const sceneInitialized = useRef(false);

  // Initialize Three.js scene once
  useEffect(() => {
    if (!canvasRef.current || sceneInitialized.current) return;
    sceneInitialized.current = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff, // Start with white for dark mode default
      wireframe: true
    });
    materialRef.current = material;
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    camera.position.z = 5;

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    
    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.005;
      torus.rotation.y += 0.005;
      torus.rotation.z = scrollY * 0.001;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Update material color when theme changes
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.setHex(theme === 'dark' ? 0xffffff : 0x000000);
    }
  }, [theme]);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-10"
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tight mb-6 leading-none text-black dark:text-white">
            {personalInfo.name}
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto"
          >
            {personalInfo.title}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={scrollToProjects}
              className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
            >
              View My Work
            </button>
            <ObfuscatedEmail
              email={personalInfo.email}
              className="px-8 py-3 border border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-200"
            >
              Get In Touch
            </ObfuscatedEmail>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ArrowDown size={32} className="text-gray-400 dark:text-gray-600" />
      </motion.button>
    </section>
  );
};

export default Hero;