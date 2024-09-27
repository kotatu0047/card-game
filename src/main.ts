import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();

// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// scene.add(cube);
// camera.position.z = 5;

// // new THREE.DirectionalLight(色)
// const light = new THREE.DirectionalLight(0xffffff);
// light.intensity = 2; // 光の強さを倍に
// light.position.set(1, 1, 1); // ライトの方向
// // シーンに追加
// scene.add(light);

// function animate() {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }

// animate();

// サイズを指定
const width = window.innerWidth;
const height = window.innerHeight;
const speed = 0.2;

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
camera.lookAt(new THREE.Vector3(0, 0, 0));
camera.position.set(0, -1300, +1000);
camera.lookAt(new THREE.Vector3(0, 0, -1000));

// レンダラーを作成
const bloomParams = {
    /** トーンマッピング: 露光量 */
    exposure: 1.8,

    /** 発光エフェクト: 強さ */
    bloomStrength: 3.0,

    /** 発光エフェクト: 半径 */
    bloomRadius: 1.2,

    /** 発光エフェクト: 閾値 */
    bloomThreshold: 0.0,
};
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#webgl') as HTMLCanvasElement
});
renderer.setSize(width, height);
renderer.setClearColor(0x000000); // 背景色
renderer.shadowMap.enabled = true; // レンダラー：シャドウを有効にする
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = Math.pow(bloomParams.exposure, 4.0);

// エフェクト: 通常レンダリング
const renderPass = new RenderPass(scene, camera);


// エフェクト: 発光エフェクト
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(width, height),
    bloomParams.bloomStrength,
    bloomParams.bloomRadius,
    bloomParams.bloomThreshold,
);

// エフェクトのセットアップ
const effectComposer = new EffectComposer(renderer);
effectComposer.addPass(renderPass);
effectComposer.addPass(bloomPass);
effectComposer.setSize(width, height);



const geometry = new THREE.BoxGeometry(100, 130, 10);
const material = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
// カードのメッシュを作成
const card1 = new THREE.Mesh(geometry, material);
card1.position.set(400, -700, 60);
// 3D空間にメッシュを追加
scene.add(card1);


const material2 = new THREE.MeshStandardMaterial({ color: 0xFFFF00 });
// カードのメッシュを作成
const card2 = new THREE.Mesh(geometry, material2);
card2.position.set(0, 0, 0);
// 3D空間にメッシュを追加
// scene.add(card2);

//フィールド

const filedPoints = [];
for (let i = 0; i <= 154; i++) {
    filedPoints.push(new THREE.Vector3(-800 + i * 10, 100, -100));
    if (i % 2 === 0) {
        filedPoints.push(new THREE.Vector3(-800 + i * 10, -800, -100));
        if (i !== 154) {
            filedPoints.push(new THREE.Vector3(-800 + (i + 1) * 10, -800, -100));
        }
    }
}

// filedPoints.push(new THREE.Vector3(-800, -800, -100));
// filedPoints.push(new THREE.Vector3(-800, -700, -100));
// filedPoints.push(new THREE.Vector3(-800, -600, -100));
// filedPoints.push(new THREE.Vector3(-800, -500, -100));
const filedGeometry = new THREE.BufferGeometry().setFromPoints(filedPoints);
const filedMaterial = new THREE.MeshBasicMaterial({
    // map: texture, // テクスチャーを指定
    color: 0xFF2222, // 色
    transparent: true, // 透明の表示許可
    blending: THREE.AdditiveBlending, // ブレンドモード
    side: THREE.DoubleSide, // 表裏の表示設定
    depthWrite: false, // デプスバッファへの書き込み可否
    opacity: 0.5,
});
const filed = new THREE.Line(filedGeometry, filedMaterial);
filed.position.set(0, -200, 60);
scene.add(filed);


// const filed = new THREE.Mesh(new THREE.BoxGeometry(width, height, 10), new THREE.MeshStandardMaterial({ color: 0xAAAAAA }));
// filed.position.set(0, -500, -100);
// // 3D空間にメッシュを追加
// scene.add(filed);

// スポットライト
const spotLight = new THREE.SpotLight(0xFFFFFF, 100, 300, Math.PI / 5, 10, 3);
spotLight.position.set(1, 1, 10);
spotLight.target = card1;
// directionalLight.lookAt(new THREE.Vector3(0, 0, -1));
// シーンに追加
scene.add(spotLight);

const light = new THREE.AmbientLight(0xffffff, 0.3);
// light.position.set(1, 1, 1);
// light.position.set(0, 1, 1);
// light.position.set(0, 0, 1);
scene.add(light);

//円柱
const cylinder = new THREE.CylinderGeometry(
    50,
    50,
    150,
    250,
    250,
    true
);
const cylinderMaterial = new THREE.MeshBasicMaterial({
    // map: texture, // テクスチャーを指定
    color: 0x007eff, // 色
    transparent: true, // 透明の表示許可
    blending: THREE.AdditiveBlending, // ブレンドモード
    side: THREE.DoubleSide, // 表裏の表示設定
    depthWrite: false, // デプスバッファへの書き込み可否
    opacity: 0.5,
});
const pillar = new THREE.Mesh(cylinder, cylinderMaterial);
pillar.position.set(0, -400, -80);

scene.add(pillar);




tick();

const down = Symbol();
const up = Symbol();
type HuyuuMode = typeof down | typeof up;

const Position = {
    Top: 0,
    Right: 1,
    Bottom: 2,
    Left: 3,
} as const;
type Position = (typeof Position)[keyof typeof Position];
var huyuuMode: Position = Position.Top;

// 毎フレーム時に実行されるループイベントです
function tick() {
    // カードを上げるのか下げるのか決める
    if (card1.position.z > 60) {
        huyuuMode = Position.Bottom;
    } else if (card1.position.z < 50) {
        huyuuMode = Position.Top;
    }

    if (typeof huyuuMode !== 'undefined' && huyuuMode === Position.Top) {
        pillar.position.z += speed * 35;
        pillar.material.opacity += 0.01;
        card1.position.z += speed;
    }
    else {
        pillar.position.z += -speed * 35;
        pillar.material.opacity -= 0.01;
        card1.position.z += -speed;
    }

    spotLight.position.set(card1.position.x, card1.position.y + 150, card1.position.z + 50);
    spotLight.lookAt(card1.position.x, card1.position.y, card1.position.z);

    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
}