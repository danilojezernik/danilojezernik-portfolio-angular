import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-canvas-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canvas-box.component.html'
})
export class CanvasBoxComponent implements OnInit {

  ngOnInit(): void {
    this.createThreeJsScene();
  }


  createThreeJsScene(): void {
    const canvas = document.getElementById('canvas-box');

    if (!canvas) {
      return;
    }

    // Create scene
    const scene = new THREE.Scene();

    // Create lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Set canvas sizes manually or via CSS
    const canvasSizes = {
      width: 500, // Manually set width
      height: 500 // Manually set height
    };

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      10,
      canvasSizes.width / canvasSizes.height,
      0.1,
      1000
    );
    camera.position.set(5, 5, 10);
    scene.add(camera);

    // Create renderer with alpha (transparency)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true // Enable transparency
    });
    renderer.setSize(canvasSizes.width, canvasSizes.height);

    // Create OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Optional: smooth camera movement
    controls.dampingFactor = 0.25; // Damping value
    controls.enableZoom = false; // Allow zooming
    // Handle window resize
    window.addEventListener('resize', () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load('/assets/media/gltf/scene.gltf', (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      model.position.set(0, 0, 0);
      model.scale.set(1, 1, 1);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotate model (optional)
        model.rotation.y += 0.01;

        // Update controls
        controls.update();

        // Render the scene with the camera
        renderer.render(scene, camera);
      };
      animate();
    }, undefined, (error) => {
      console.error('An error occurred while loading the GLTF model', error);
    });
  }

}
