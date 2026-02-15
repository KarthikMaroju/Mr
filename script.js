const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#galaxy'), alpha:true});

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const starsGeometry = new THREE.BufferGeometry();
const starVertices = [];

for (let i = 0; i < 10000; i++) {
  starVertices.push(
    THREE.MathUtils.randFloatSpread(2000),
    THREE.MathUtils.randFloatSpread(2000),
    THREE.MathUtils.randFloatSpread(2000)
  );
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices,3));
const starsMaterial = new THREE.PointsMaterial({color:0xffffff});
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

function animate(){
  requestAnimationFrame(animate);
  starField.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();
