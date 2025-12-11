import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

// --- Project Data for Modals ---
const projectsData = {
    "raymarching": {
        title: "Raymarching Scene Editor",
        subtitle: "Real-time Volumetric Rendering",
        description: "This project is an interactive 3D scene editor built with WebGPU and WGSL. It implements a real-time Ray Marching renderer allowing users to define, visualize, and manipulate spherical primitives through a synchronized UI panel and direct viewport interaction.",
        tech: ["HTML","JavaScript", "WebGPU", "WGSL", "Computer Graphics"],
        image: "images/raymarching.gif", 
        github: "https://github.com/suva14/raymarching",
        live: "https://suva14.github.io/raymarching/"
    },
    "vinci-ecodrive": {
        title: "Formula Student - Vinci Ecodrive",
        subtitle: "Suspension Team Member",
        description: "Former member of the university racing team competing in Formula Student. CAD/CAM technician for the suspension system team. I designed complex aluminum support parts using 3DExperience (CAD) and manufactured them using CNC machining and lathes (CAM). This experience developed my precision engineering and rapid prototyping skills in an automotive context.",
        tech: ["Solidworks","3DExperience", "CNC Machining", "Automotive","CAD/CAM"],
        image: "images/ecodrive.png", 
    },
    "tinygrad": {
        title: "MNIST Digit Recognition",
        subtitle: "Deep Learning with TinyGrad",
        description: "This project implements a complete machine learning pipeline from training to deployment: it involves training two neural networks (MLP and CNN) on the MNIST dataset using TinyGrad, compiling the resulting models to WebGPU shaders for browser execution, and integrating them into an interactive single-page application. This allows users to draw digits and receive real-time predictions, with the entire inference running client-side using WebGPU for fast predictions (~10-20ms) without any server calls.",
        tech: ["Python", "TinyGrad", "Computer Vision", "AI"],
        image: "images/mnist.gif", 
        github: "https://github.com/suva14/mnist_project",
        live: "https://suva14.github.io/mnist_project/"
    },
    "budd-e": {
        title: "Budd-E Robot Arm",
        subtitle: "Interactive Robotic Arm (Master 1 Innovation Project)",
        description: "Budd-E is an interactive robotic arm designed to assist and engage with users. It features voice command recognition for control and face tracking using OpenCV to maintain eye contact or follow the user. Developed as a Master 1 Innovation Project.",
        tech: ["Robotics", "Raspberry Pi", "OpenCV", "Voice Control", "ESP32"],
        image: "images/budde.jpg", 
    },
    "fire-detection": {
        title: "Wireless Fire Detection",
        subtitle: "Applied Research Paper",
        description: "Reimplementation and performance analysis of a wireless fire detection system using Arduino Nano. I enhanced the original design by integrating a BME280 sensor for environmental monitoring (temperature, humidity, pressure) alongside smoke (MQ-2) and flame (KY-026) sensors. The study focused on the reliability of single-node detection in forest environments.",
        tech: ["IoT", "Arduino", "Sensors", "Research", "C++"],
        image: "images/miniature_applied_research.png",
        pdf: "images/Applied_Research_Suva.pdf" 
    },
    "definnov": {
        title: "Integrated Tourniquet",
        subtitle: "24h Def'Innov Hackathon",
        description: "Conception of a ratchet tourniquet directly integrated into combat uniforms (trellis). This innovation allows for immediate application in emergency situations, saving vital seconds. Developed and prototyped within 24 hours during the Def'Innov hackathon.",
        tech: ["MedTech", "Defense", "Prototyping", "3D Printing"],
        image: "images/garrot.jpg",
    },
    "florya": {
        title: "Florya Diffuser",
        subtitle: "Kickstarter Campaign & Product Design",
        description: "Design and production of a premium essential oil diffuser. The project emphasized the use of high-quality leather's breathable property. Successfully funded and launched on Kickstarter.",
        tech: ["Product Design", "Crowdfunding", "Leather Crafting", "Prototyping","Low-tech"],
        image: "images/florya.jpg",
        live: "https://www.kickstarter.com/projects/florya/quickstarter-florya"
    }
};

// Function to initialize the 3D scene and interactions
function initializePortfolio() {
    
    // --- SETUP THREE.JS ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    const canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer) {
        canvasContainer.appendChild(renderer.domElement);
    } else {
        console.error("Error: #canvas-container element not found.");
        return; 
    }

    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xff4d29, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    camera.position.z = 5;

    // --- MOUSE INTERACTION ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // --- ANIMATION LOOP ---
    function animate() {
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
        sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x);
        sphere.rotation.z += 0.002;
        particlesMesh.rotation.y = -mouseX * 0.0002;
        particlesMesh.rotation.x = -mouseY * 0.0002;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    // --- RESIZE RESPONSIVE ---
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // --- SCROLL REVEAL (APPEAR/DISAPPEAR) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));


    // --- MODAL MANAGEMENT ---
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-project-content');
    const projectCards = document.querySelectorAll('.project-card');
    const closeModalButton = document.getElementById('close-modal');
    const nav = document.querySelector('nav'); 

    // Helper: Calculate Scrollbar Width
    const getScrollbarWidth = () => {
        return window.innerWidth - document.documentElement.clientWidth;
    };

    // Helper function to load modal content
    function openModalContent(projectId) {
        const data = projectsData[projectId];
        if (!data) return;

        let techBadges = data.tech.map(t => 
            `<span class="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm font-mono">${t}</span>`
        ).join('');

        // CORRECTION IMAGE: max-h-[60vh], w-auto, mx-auto pour éviter qu'elle prenne tout l'écran
        let mediaContent = `<img src="${data.image}" alt="Project ${data.title} Image" class="rounded-lg mb-6 max-h-[60vh] w-auto mx-auto object-contain border border-gray-700">`;

        let buttons = `
            <div class="flex flex-wrap gap-4 mt-8">
        `;
        if (data.github) {
            buttons += `
                <a href="${data.github}" target="_blank" class="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700 transition-all font-mono flex items-center gap-2">
                    <i class="fab fa-github"></i> View Code
                </a>
            `;
        }
        if (data.live) {
            buttons += `
                <a href="${data.live}" target="_blank" class="border border-accent text-accent px-6 py-3 rounded hover:bg-accent hover:text-white transition-all font-mono flex items-center gap-2">
                    <i class="fas fa-external-link-alt"></i> Live Page
                </a>
            `;
        }
        if (data.pdf) {
             buttons += `
                <a href="${data.pdf}" target="_blank" class="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700 transition-all font-mono flex items-center gap-2">
                    <i class="fas fa-file-pdf"></i> Read Paper
                </a>
            `;
        }
        buttons += `</div>`;


        modalContent.innerHTML = `
            <h2 class="text-4xl font-bold text-accent mb-2">${data.title}</h2>
            <h3 class="text-xl text-gray-400 mb-6">${data.subtitle}</h3>
            
            ${mediaContent}
            
            <p class="text-gray-300 text-lg">${data.description}</p>
            
            <div class="flex flex-wrap gap-2 mt-6">
                ${techBadges}
            </div>
            
            ${buttons}
        `;
    }

    // Function to close the modal
    function closeModal() {
        if (!modal.classList.contains('active')) return;

        modal.classList.remove('active');
        modalContent.classList.add('closing');
        
        setTimeout(() => {
            modalContent.classList.remove('closing');
            modal.classList.remove('visible'); 
            
            document.body.style.overflow = ''; 
            document.body.style.paddingRight = ''; 
            if(nav) nav.style.paddingRight = '';

            modalContent.innerHTML = '';
        }, 300); 
    }

    // Open management
    projectCards.forEach(card => {
        card.addEventListener('click', (event) => {
            if (event.target.closest('a')) return; 

            const projectId = card.dataset.project;
            if (!projectsData[projectId]) return;
            
            const scrollbarWidth = getScrollbarWidth();

            openModalContent(projectId);
            
            modal.classList.add('visible'); 
            void modal.offsetWidth; 
            modal.classList.add('active'); 

            document.body.style.paddingRight = `${scrollbarWidth}px`;
            if(nav) {
                const navStyle = window.getComputedStyle(nav);
                const originalPadding = parseFloat(navStyle.paddingRight);
                nav.style.paddingRight = `${originalPadding + scrollbarWidth}px`;
            }
            document.body.style.overflow = 'hidden'; 
        });
    });

    closeModalButton.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', initializePortfolio);