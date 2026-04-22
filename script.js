import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

// --- Project Data for Modals ---
const projectsData = {
    "fpv-drone": {
        title: "Mixed Reality FPV Drone",
        subtitle: "Innovation Project — ESILV A5 Createch · Supervised by Xiao Xiao & Gaël Musquet",
        description: "Bridging legacy analog FPV drone technology with a Meta Quest 2 to create an affordable Mixed Reality cockpit — a sub-€50 alternative to dedicated FPV goggles, with Passthrough and hand-tracking for full spatial awareness.",
        sections: [
            {
                heading: "System Architecture",
                body: `<ul class="list-disc list-inside space-y-1">
                    <li><strong>Transmitter:</strong> BetaFPV Meteor 75 Pro Tinywhoop (analog camera + 5.8GHz VTX)</li>
                    <li><strong>Receiver:</strong> Eachine ROTG02 — skew planar antennas + 5.8GHz RX → analog/digital (UVC) converter</li>
                    <li><strong>Processing:</strong> Meta Quest 2 (Android OS). The ROTG02 mounts as <code class="text-accent">/dev/video0</code>; the headset merges the drone feed with Passthrough.</li>
                    <li><strong>Radio Controller:</strong> BetaFPV Literadio 4</li>
                </ul>`
            },
            {
                heading: "Iterations & Prototyping",
                body: `<ol class="list-decimal list-inside space-y-3">
                    <li><strong>PC-tethered concept.</strong> UVC receiver plugged into a Windows PC, monitored via webcam software. Latency (~100ms) was acceptable but the pilot was chained to a desk — portability, the whole point of FPV, was lost.</li>
                    <li><strong>Standalone VR.</strong> OTG cable straight into the Quest 2's USB-C port; UVC apps sideloaded via SideQuest. Immersive and portable, but the receiver dangled from the headset and the bulky VR controllers were incompatible with holding a drone radio.</li>
                    <li><strong>Mixed Reality + hand-tracking (final).</strong> Receiver secured with velcro to the headset strap. Native hand-tracking drives the UI (pinch to launch, tune frequency); a double-tap on the headset toggles Passthrough so the pilot sees the room and the physical radio while the drone feed stays centered on a floating virtual screen.</li>
                </ol>`
            },
            {
                heading: "Contributions",
                body: `<ul class="list-disc list-inside space-y-2">
                    <li><strong>Hardware accessibility.</strong> Validated transmission chain turning a Quest 2 into FPV goggles for under €50 in added hardware, vs €200+ for dedicated analog goggles.</li>
                    <li><strong>Hybrid user experience.</strong> Drone feed embedded in a floating MR window, driven by hand-tracking. Passthrough preserves spatial awareness — conceptually removing the need for a dedicated visual spotter, mandatory under French FPV regulations.</li>
                </ul>`
            },
            {
                heading: "Future Work",
                body: `<p>Hardware consolidation by integrating the analog receiver directly inside the headset, and a virtual flight interface driven entirely by native hand-tracking — collapsing the full FPV ground station into a single standalone wearable.</p>`
            }
        ],
        tech: ["Mixed Reality", "FPV", "Meta Quest 2", "Android", "Hand Tracking", "UVC", "Hardware"],
        video: "images/fpv_drone.mp4",
        pdf: "images/Poster_MR_FPV_Drone_Suva.pdf",
        pdfLabel: "View Poster",
        showPosterPreview: true
    },
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

function initializePortfolio() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    for (let i = 0; i < particlesCount * 3; i++) {
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

    // --- ANIMATION LOOP (stopped if prefers-reduced-motion) ---
    function animate() {
        if (!prefersReducedMotion) {
            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;
            sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
            sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x);
            sphere.rotation.z += 0.002;
            particlesMesh.rotation.y = -mouseX * 0.0002;
            particlesMesh.rotation.x = -mouseY * 0.0002;
            requestAnimationFrame(animate);
        }
        renderer.render(scene, camera);
    }
    animate();

    // --- RESIZE RESPONSIVE ---
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // --- TYPEWRITER ---
    const typewriterEl = document.getElementById('typewriter-text');
    const typewriterText = 'M2 Creative Technology Engineering Student';
    if (typewriterEl) {
        if (prefersReducedMotion) {
            typewriterEl.textContent = typewriterText;
        } else {
            let i = 0;
            function typeChar() {
                if (i < typewriterText.length) {
                    typewriterEl.textContent += typewriterText[i++];
                    setTimeout(typeChar, 55);
                }
            }
            typeChar();
        }
    }

    // --- SCROLL PROGRESS BAR ---
    const scrollProgressBar = document.getElementById('scroll-progress');
    if (scrollProgressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            scrollProgressBar.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : '0%';
        }, { passive: true });
    }

    // --- SCROLL REVEAL ---
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

    // --- ACTIVE NAV LINKS ---
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    if (navLinks.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.toggle('active-nav', link.dataset.section === entry.target.id);
                    });
                }
            });
        }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });
        document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));
    }

    // --- MOBILE MENU ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            menuToggle.classList.toggle('open', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- MODAL MANAGEMENT ---
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-project-content');
    const projectCards = document.querySelectorAll('.project-card');
    const closeModalButton = document.getElementById('close-modal');
    const nav = document.querySelector('nav');

    const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

    function openModalContent(projectId) {
        const data = projectsData[projectId];
        if (!data) return;

        let techBadges = data.tech.map(t =>
            `<span class="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm font-mono">${t}</span>`
        ).join('');

        let mediaContent = '';
        if (data.video) {
            mediaContent = `<video src="${data.video}" controls muted loop playsinline class="rounded-lg mb-6 max-h-[60vh] w-auto mx-auto object-contain border border-gray-700 bg-black"></video>`;
        } else if (data.image) {
            mediaContent = `<img src="${data.image}" alt="Project ${data.title} Image" loading="lazy" class="rounded-lg mb-6 max-h-[60vh] w-auto mx-auto object-contain border border-gray-700">`;
        } else if (data.pdf) {
            mediaContent = `<iframe src="${data.pdf}#view=FitH" class="w-full h-[70vh] rounded-lg mb-6 border border-gray-700 bg-white" title="${data.title} PDF preview"></iframe>`;
        }

        let buttons = `<div class="flex flex-wrap gap-4 mt-8">`;
        if (data.github) {
            buttons += `<a href="${data.github}" target="_blank" rel="noopener noreferrer" class="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700 transition-all font-mono flex items-center gap-2"><i class="fab fa-github"></i> View Code</a>`;
        }
        if (data.live) {
            buttons += `<a href="${data.live}" target="_blank" rel="noopener noreferrer" class="border border-accent text-accent px-6 py-3 rounded hover:bg-accent hover:text-white transition-all font-mono flex items-center gap-2"><i class="fas fa-external-link-alt"></i> Live Page</a>`;
        }
        if (data.pdf) {
            const pdfLabel = data.pdfLabel || 'Read Paper';
            buttons += `<a href="${data.pdf}" target="_blank" rel="noopener noreferrer" class="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700 transition-all font-mono flex items-center gap-2"><i class="fas fa-file-pdf"></i> ${pdfLabel}</a>`;
        }
        buttons += `</div>`;

        let bodyContent;
        if (data.sections) {
            const leadAbstract = data.description
                ? `<p class="text-gray-200 text-lg italic border-l-2 border-accent pl-4 mb-8">${data.description}</p>`
                : '';
            const sectionsHtml = data.sections.map(s => `
                <section class="mb-6">
                    <h4 class="text-accent font-semibold text-lg mb-3 font-mono uppercase tracking-wider">${s.heading}</h4>
                    <div class="text-gray-300 text-base leading-relaxed">${s.body}</div>
                </section>
            `).join('');
            const posterPreview = (data.showPosterPreview && data.pdf) ? `
                <section class="mb-6">
                    <h4 class="text-accent font-semibold text-lg mb-3 font-mono uppercase tracking-wider">Poster</h4>
                    <iframe src="${data.pdf}#view=FitH" class="w-full h-[70vh] rounded-lg border border-gray-700 bg-white" title="${data.title} poster preview"></iframe>
                </section>
            ` : '';
            bodyContent = leadAbstract + sectionsHtml + posterPreview;
        } else {
            bodyContent = `<p class="text-gray-300 text-lg">${data.description}</p>`;
        }

        modalContent.innerHTML = `
            <h2 class="text-4xl font-bold text-accent mb-2">${data.title}</h2>
            <h3 class="text-xl text-gray-400 mb-6">${data.subtitle}</h3>
            ${mediaContent}
            ${bodyContent}
            <div class="flex flex-wrap gap-2 mt-6">${techBadges}</div>
            ${buttons}
        `;
    }

    function closeModal() {
        if (!modal.classList.contains('active')) return;

        modal.classList.remove('active');
        modalContent.classList.add('closing');

        setTimeout(() => {
            modalContent.classList.remove('closing');
            modal.classList.remove('visible');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            if (nav) nav.style.paddingRight = '';
            modalContent.innerHTML = '';
        }, 300);
    }

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
            if (nav) {
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
