import * as THREE from "three";
import * as dat from "dat.gui";

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

  // 设置相机的角度
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  // 创建环境光
  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  // 创建点光源
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);
  let step = 0;

  // 创建控制器
  const controls = new (function () {
    // 设置初始化旋转速度
    this.rotationSpeed = 0.02;
    // 对象数量
    this.numberOfObjects = scene.children.length;

    // 移除立方体,检验是否是Mesh对象避免移除摄像机和环境光
    this.removeCube = function () {
      // 所有的立方体
      const allChildren = scene.children;
      // 最后的立方体
      const lastObject = allChildren[allChildren.length - 1];
      if (lastObject instanceof THREE.Mesh) {
        // 场景中移除该对象
        scene.remove(lastObject);
        this.numberOfObjects = scene.children.length;
      }
    };

    // 添加立方体
    this.addCube = function () {
      // 随机生成1到3的数
      const cubeSize = Math.ceil(Math.random() * 3);
      // 创建长宽高为cubeSize的立方体
      const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      // 设置阴影的显示
      cube.castShadow = true;
      // 设置名字
      cube.name = "cube-" + scene.children.length;

      // 设置立方体在场景中的随机位置
      cube.position.x = -30 + Math.round(Math.random() * planeGeometry.parameters.width);
      cube.position.y = Math.round(Math.random() * 5);
      cube.position.z = -20 + Math.round(Math.random() * planeGeometry.parameters.height);

      // 添加物体到场景
      scene.add(cube);
      this.numberOfObjects = scene.children.length;
    };

    this.outputObjects = function () {
      console.log(scene.children);
    };
  })();

  const gui = new dat.GUI();
  // 设置旋转速度范围0~0.5
  gui.add(controls, "rotationSpeed", 0, 0.5);
  // 增加添加立方体控制器
  gui.add(controls, "addCube");
  // 增加移除立方体控制器
  gui.add(controls, "removeCube");
  // 增加输出objects控制器
  gui.add(controls, "outputObjects");
  // 增加数量的监听
  gui.add(controls, "numberOfObjects").listen();

  render();

  function render() {
    // 操作场景中的所有对象，让物体动起来
    scene.traverse(function (e) {
      if (e instanceof THREE.Mesh && e != plane) {
        e.rotation.x += controls.rotationSpeed;
        e.rotation.y += controls.rotationSpeed;
        e.rotation.z += controls.rotationSpeed;
      }
    });

    // 渲染帧
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}
window.onload = init;
