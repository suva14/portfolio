import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

// --- Project Data for Modals ---
const projectsData = {
    "fpv-drone": {
        title: "Mixed Reality FPV Drone",
        subtitle: "Innovation Project — ESILV A5 Createch · Supervised by Xiao Xiao & Gaël Musquet",
        description: "Using a Meta Quest 2 as an FPV cockpit by feeding a 5.8 GHz analog drone signal into it through a USB receiver. This page covers the build, similar existing projects, a comparison with dedicated FPV gear, and a latency evaluation.",
        sections: [
            {
                heading: "System Architecture",
                body: `<ul class="list-disc list-inside space-y-1">
                    <li><strong>Transmitter:</strong> BetaFPV Meteor 75 Pro Tinywhoop (analog camera + 5.8GHz VTX)</li>
                    <li><strong>Receiver:</strong> Eachine ROTG02, skew planar antennas, 5.8GHz RX to analog/digital (UVC) converter</li>
                    <li><strong>Processing:</strong> Meta Quest 2 (Android OS). The ROTG02 mounts as <code class="text-accent">/dev/video0</code>; the headset shows the drone feed on top of Passthrough.</li>
                    <li><strong>Radio Controller:</strong> BetaFPV Literadio 4</li>
                </ul>
                <div class="grid sm:grid-cols-2 gap-4 mt-6">
                    <figure class="flex flex-col">
                        <img src="images/tinywhoop.png" alt="BetaFPV Meteor 75 Pro Tinywhoop drone used as the transmitter" loading="lazy" class="rounded-lg border border-gray-700 bg-black object-contain w-full max-h-80">
                        <figcaption class="text-gray-500 text-sm font-mono mt-2 text-center">Tinywhoop, analog camera + 5.8GHz VTX</figcaption>
                    </figure>
                    <figure class="flex flex-col">
                        <img src="images/setup_quest2_receiver.png" alt="Meta Quest 2 headset with the Eachine ROTG02 analog receiver mounted on the strap" loading="lazy" class="rounded-lg border border-gray-700 bg-black object-contain w-full max-h-80">
                        <figcaption class="text-gray-500 text-sm font-mono mt-2 text-center">Quest 2 + ROTG02 receiver (velcro-mounted)</figcaption>
                    </figure>
                </div>`
            },
            {
                heading: "Software Used",
                body: `<p class="mb-4">The Quest 2 shows the USB receiver's feed through its native app, so there is no setup and no software to install. The interface is the Quest's default one; Passthrough and hand-tracking are its built-in features.</p>
                <p>The engineering work is the integration: getting the analog chain to mount as a UVC device on the Quest, fixing the receiver to the headset, and getting a usable result.</p>`
            },
            {
                heading: "Iterations & Prototyping",
                body: `<ol class="list-decimal list-inside space-y-3">
                    <li><strong>PC-tethered concept.</strong> UVC receiver on a Windows PC, viewed with webcam software.</li>
                    <li><strong>Standalone VR.</strong> UVC receiver plugged directly into the Quest 2 USB-C port and displayed by the headset.</li>
                    <li><strong>Mixed Reality (final).</strong> Receiver attached to the headset strap with velcro. The UVC app window sits in front of the pilot, and the Quest's built-in Passthrough shows the physical radio and the room.</li>
                </ol>`
            },
            {
                heading: "Related Work",
                body: `<p class="mb-4">Similar projects and references:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li>Hoarder Sam, <a href="https://www.youtube.com/watch?v=XOmeAAlSTWM" target="_blank" rel="noopener noreferrer" class="text-accent underline hover:text-white">"How to fly a FPV drone in mixed reality - Is this the future of FPV?"</a> (YouTube, Jan 2025). Same Eachine ROTG02, Quest and UVC app setup.</li>
                    <li>Hackaday, <a href="https://hackaday.com/2025/01/03/fpv-flying-in-mixed-reality-is-easier-than-youd-think/" target="_blank" rel="noopener noreferrer" class="text-accent underline hover:text-white">"FPV Flying In Mixed Reality Is Easier Than You'd Think"</a> (Jan 2025). Confirms UVC receivers work directly on the Quest's Android, and that a spotter is still legally required.</li>
                    <li>Tools and references used: the Eachine ROTG02 documentation, and Oscar Liang's pages on <a href="https://oscarliang.com/fpv-system/" target="_blank" rel="noopener noreferrer" class="text-accent underline hover:text-white">system comparison</a> and <a href="https://oscarliang.com/fpv-camera-latency/" target="_blank" rel="noopener noreferrer" class="text-accent underline hover:text-white">latency measurement</a>.</li>
                </ul>
                <p class="mb-2">Academic work on the same problem:</p>
                <ul class="list-disc list-inside space-y-2">
                    <li>Bashkirov et al., <a href="https://arxiv.org/abs/2410.16943" target="_blank" rel="noopener noreferrer" class="text-accent underline hover:text-white">FlightAR</a> (arXiv, 2024). Quest 3 with Passthrough for UAV control, with multiple video streams and object detection.</li>
                    <li>Kato et al., <a href="https://dl.acm.org/doi/10.1145/3544548.3580681" target="_blank" rel="noopener noreferrer" class="text-accent underline hover:text-white">BirdViewAR</a> (CHI 2023). Surroundings-aware drone piloting with an augmented third-person view and a user study.</li>
                    <li>A QoE model for FPV drone control over cellular (<a href="https://www.sciencedirect.com/science/article/pii/S1389128623005340" target="_blank" rel="noopener noreferrer" class="text-accent underline hover:text-white">Computer Networks, 2023</a>) sets an acceptability threshold of end-to-end latency below 250 ms. I use this as the benchmark in the evaluation.</li>
                </ul>`
            },
            {
                heading: "Comparison With Dedicated Analog Goggles",
                body: `<div class="overflow-x-auto">
                <table class="w-full text-sm border border-gray-700 border-collapse">
                    <thead>
                        <tr class="bg-gray-800 text-gray-200">
                            <th class="border border-gray-700 p-2 text-left">Criterion</th>
                            <th class="border border-gray-700 p-2 text-left">This project (Quest 2 + ROTG02)</th>
                            <th class="border border-gray-700 p-2 text-left">Dedicated analog goggles</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-300">
                        <tr><td class="border border-gray-700 p-2">Glass-to-glass latency</td><td class="border border-gray-700 p-2">~150 ms (est.)</td><td class="border border-gray-700 p-2">~10-20 ms</td></tr>
                        <tr><td class="border border-gray-700 p-2">Image quality</td><td class="border border-gray-700 p-2">Analog SD (noisy)</td><td class="border border-gray-700 p-2">Analog SD (noisy)</td></tr>
                        <tr><td class="border border-gray-700 p-2">Spatial awareness (see surroundings)</td><td class="border border-gray-700 p-2"><strong>Yes, Passthrough</strong></td><td class="border border-gray-700 p-2">No (blacked out)</td></tr>
                        <tr><td class="border border-gray-700 p-2">Replaces a legal spotter?</td><td class="border border-gray-700 p-2"><strong>No</strong>, still required in France</td><td class="border border-gray-700 p-2">No</td></tr>
                        <tr><td class="border border-gray-700 p-2">Weight on head</td><td class="border border-gray-700 p-2">Heavy (Quest + ~50 g)</td><td class="border border-gray-700 p-2">Light to medium</td></tr>
                    </tbody>
                </table>
                </div>
                <p class="mt-4">Image quality is the same analog SD as dedicated analog goggles. This setup adds latency and weight, but it is the only one that lets the pilot see their surroundings through Passthrough. Seeing the drone and the environment directly is the safety role a spotter plays. It does not remove the legal spotter requirement in France, but it is the kind of situational awareness that could support adapting that rule.</p>`
            },
            {
                heading: "Evaluation",
                body: `<p class="font-semibold text-gray-200 mb-2">1. Glass-to-glass latency</p>
                <p class="mb-3">A running timer is placed in front of the drone camera. The time shown inside the Quest is compared to the real timer at the same instant; the gap is the end-to-end latency.</p>
                <div class="overflow-x-auto mb-4">
                <table class="w-full text-sm border border-gray-700 border-collapse">
                    <thead><tr class="bg-gray-800 text-gray-200"><th class="border border-gray-700 p-2 text-left">Stage</th><th class="border border-gray-700 p-2 text-left">Latency</th></tr></thead>
                    <tbody class="text-gray-300">
                        <tr><td class="border border-gray-700 p-2">End-to-end (this system, estimated)</td><td class="border border-gray-700 p-2">~150 ms</td></tr>
                        <tr><td class="border border-gray-700 p-2">Dedicated analog goggles (reference)</td><td class="border border-gray-700 p-2">~10-20 ms</td></tr>
                        <tr><td class="border border-gray-700 p-2">QoE acceptability threshold (literature)</td><td class="border border-gray-700 p-2">&lt; 250 ms</td></tr>
                    </tbody>
                </table>
                </div>
                <p class="mb-4">The analog link is fast; the bulk of the delay comes from the USB to Android to mixed-reality stage. The estimated total stays under the 250 ms usability threshold, so it is flyable. The setup trades latency for being able to see the surroundings.</p>
                <p class="font-semibold text-gray-200 mb-2">2. Other measurements</p>
                <ul class="list-disc list-inside space-y-1 mb-4">
                    <li>Added head weight (receiver, mount, cable): about 50 g.</li>
                    <li>Video is analog SD; the on-screen telemetry stays readable.</li>
                    <li>Quest 2 Passthrough is grayscale and low resolution, which limits usability. Quest 3 fixes this.</li>
                </ul>
                <p class="font-semibold text-gray-200 mb-2">3. Observations in use</p>
                <ul class="list-disc list-inside space-y-1">
                    <li><strong>Works:</strong> the feed is legible, glancing at the real radio through Passthrough is fast, and the window can be placed and sized with the app's controls.</li>
                    <li><strong>Friction:</strong> the window drifts with large head movements, the receiver gets warm, and the headset is front-heavy with the receiver on the strap.</li>
                    <li><strong>Blocking:</strong> the analog signal breaks up at range, like any analog link.</li>
                </ul>`
            },
            {
                heading: "Capture Method",
                body: `<p class="mb-4">The demo video above was filmed by pointing a camera through the Quest 2's lens. The Quest 2's screen recorder does not capture Passthrough; it records the real-world layer as black, which is no use for showing a mixed reality app. Filming through the lens was the only way to show what the pilot sees.</p>
                <img src="images/view_inside_quest_lense.jpeg" alt="Photo taken through the Quest 2 lens showing the FPV drone feed floating over the real-world Passthrough" loading="lazy" class="rounded-lg my-4 max-h-[50vh] w-auto mx-auto object-contain border border-gray-700">
                <p class="mt-4">From the Quest 3 onwards, Passthrough records natively, in colour and at higher resolution than the Quest 2's grayscale Passthrough, which removes this workaround.</p>`
            }
        ],
        tech: ["Mixed Reality", "FPV", "Meta Quest 2", "Android", "Hand Tracking", "UVC", "Hardware"],
        video: "images/demo_mixed_reality_fpv.mp4"
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

        if (location.hash && projectsData[decodeURIComponent(location.hash.slice(1))]) {
            history.replaceState(null, '', location.pathname + location.search);
        }

        setTimeout(() => {
            modalContent.classList.remove('closing');
            modal.classList.remove('visible');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            if (nav) nav.style.paddingRight = '';
            modalContent.innerHTML = '';
        }, 300);
    }

    function openProjectModal(projectId) {
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

        if (location.hash !== `#${projectId}`) {
            history.replaceState(null, '', `#${projectId}`);
        }
    }

    projectCards.forEach(card => {
        card.addEventListener('click', (event) => {
            if (event.target.closest('a')) return;
            openProjectModal(card.dataset.project);
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

    // --- DEEP LINK (e.g. /#fpv-drone opens that project directly) ---
    const getHashProject = () => {
        const id = decodeURIComponent(location.hash.slice(1));
        return projectsData[id] ? id : null;
    };

    const initialProject = getHashProject();
    if (initialProject) openProjectModal(initialProject);

    window.addEventListener('hashchange', () => {
        const id = getHashProject();
        if (id) {
            if (!modal.classList.contains('active')) openProjectModal(id);
        } else if (modal.classList.contains('active')) {
            closeModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', initializePortfolio);
