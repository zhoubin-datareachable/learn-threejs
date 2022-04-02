import * as THREE from "three";

// 初始化
function init() {
  const canvas = document.getElementById("webgl");
  // 创建一个场景,场景是一个容器，主要用于保存光源，渲染物体等
  const scene = new THREE.Scene();

  // 创建一个透视相机
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  // 创建一个渲染器，将使用电脑显卡渲染场景
  const renderer = new THREE.WebGLRenderer({ canvas });
  // 设置场景的背景
  renderer.setClearColor(new THREE.Color(0xeeeeee, 1.0));
  // 设置场景的大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 开启阴影
  renderer.shadowMapEnabled = true;

  // 创建一个坐标轴
  // const axes = new THREE.AxisHelper(20);
  // scene.add(axes);

  // 定义平面大小
  const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
  // 定义平面材料
  const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  // 创建平面
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  // 设置平面位置
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);

  // 设置方块大小
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  // 设置方块的材料
  const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  // 创建方块
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // 投射阴影
  cube.castShadow = true;
  // 设置方块的位置
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;
  scene.add(cube);

  // 创建球
  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  // 设置球的位置
  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 2;
  sphere.castShadow = true;
  scene.add(sphere);

  // 设置相机的角度
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  // 创建光源
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);
  let step = 0;

  function renderScene() {
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.02;
    step += 0.04;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));
    requestAnimationFrame(renderScene);
    // 渲染
    renderer.render(scene, camera);
  }
  renderScene();
}
window.onload = init;
