import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { MarchingCubes } from 'three/addons/objects/MarchingCubes.js';

const isMob = window.innerWidth < 900;
const config = { count: isMob ? 10 : 22, res: isMob ? 28 : 50, bg: 0x050507 };
let scene, camera, renderer, composer, mesh;
let mouseX = 0, mouseY = 0;
const dummy = new THREE.Object3D();
const pos = [], rot = [], spd = [], phs = [];

function init() {
    const cvs = document.querySelector('#bg-canvas');
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(config.bg, 20, 100);
    scene.background = new THREE.Color(config.bg);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = isMob ? 65 : 55;

    renderer = new THREE.WebGLRenderer({ canvas: cvs, antialias: false, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dl = new THREE.DirectionalLight(0xffffff, 2);
    dl.position.set(20, 40, 20);
    scene.add(dl);
    const rl = new THREE.DirectionalLight(0x2563eb, 4);
    rl.position.set(-20, 0, 10);
    scene.add(rl);

    mkObjs();
    mkPost();

    if (!isMob) {
        document.addEventListener('mousemove', e => {
            mouseX = (e.clientX - window.innerWidth/2) * 0.0001;
            mouseY = (e.clientY - window.innerHeight/2) * 0.0001;
        });
    }
    window.addEventListener('resize', rsz);
    anim();
}

function mkGeo() {
    const mat = new THREE.MeshBasicMaterial();
    const eff = new MarchingCubes(config.res, mat, true, true, 80000);
    const p1 = {x:0.38, y:0.7, z:0.5};
    const p2 = {x:0.38, y:0.3, z:0.5};
    const p3 = {x:0.72, y:0.5, z:0.5};
    eff.reset();

    const r = 0.45;
    eff.addBall(p1.x, p1.y, p1.z, r, 12);
    eff.addBall(p2.x, p2.y, p2.z, r, 12);
    eff.addBall(p3.x, p3.y, p3.z, r, 12);

    const stp = 50;
    for(let i=0; i<=stp; i++) {
        let t = i/stp;
        let fat = 0.015 + (0.04 - 0.015) * Math.pow(Math.abs(t-0.5)*2, 4);
        eff.addBall(p1.x+(p2.x-p1.x)*t, p1.y+(p2.y-p1.y)*t, p1.z, fat, 12);
        eff.addBall(p2.x+(p3.x-p2.x)*t, p2.y+(p3.y-p2.y)*t, p2.z, fat, 12);
    }

    eff.update();
    const g = eff.geometry.clone();
    g.center();
    return g;
}

function mkObjs() {
    const g = mkGeo();
    const m = new THREE.MeshPhysicalMaterial({
        color: 0x2563eb,
        emissive: 0x000022,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.6,
        thickness: 2.0,
        ior: 1.4,
        clearcoat: 1,
        transparent: true,
        opacity: 1
    });

    mesh = new THREE.InstancedMesh(g, m, config.count);
    scene.add(mesh);

    for(let i=0; i<config.count; i++) {
        const p = new THREE.Vector3(
            (Math.random()-0.5)*70,
            (Math.random()-0.5)*50,
            (Math.random()-0.5)*30-5
        );
        pos.push(p);
        rot.push(new THREE.Euler(Math.random()*3, Math.random()*3, 0));
        spd.push({x:(Math.random()-0.5)*0.0006, y:(Math.random()-0.5)*0.0006});
        phs.push(Math.random()*6);

        dummy.position.copy(p);
        const s = Math.random()*5 + 3.5;
        dummy.scale.set(s,s,s);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
    }
}

function mkPost() {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.6, 0.5, 0.9));
}

function rsz() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
}

function anim() {
    requestAnimationFrame(anim);

    const scr = window.scrollY;
    const limit = window.innerHeight * 1.5;
    const op = Math.max(0, 1 - scr / limit);

    if(mesh) {
        mesh.material.opacity = op;

        if (op > 0) {
            if(!isMob) {
                mesh.rotation.x += (mouseY - mesh.rotation.x)*0.03;
                mesh.rotation.y += (mouseX - mesh.rotation.y)*0.03;
            }

            const tm = Date.now() * 0.0005;

            for(let i=0; i<config.count; i++) {
                const b = pos[i];
                dummy.position.set(b.x, b.y + Math.sin(tm+phs[i])*2.0, b.z);
                rot[i].x += spd[i].x; rot[i].y += spd[i].y;
                dummy.rotation.copy(rot[i]);
                dummy.updateMatrix();
                mesh.setMatrixAt(i, dummy.matrix);
            }
            mesh.instanceMatrix.needsUpdate = true;
        }
    }

    if(op > 0) composer.render();
}
init();