let canvas = document.getElementById("fireworksCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createFirework(x, y) {
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: x,
      y: y,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 5 + 2,
      radius: Math.random() * 2 + 1,
      alpha: 1,
      decay: Math.random() * 0.02 + 0.01,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }
}

function updateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.alpha -= p.decay;

    if (p.alpha <= 0) {
      particles.splice(i, 1);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
      ctx.fill();
    }
  });
  requestAnimationFrame(updateFireworks);
}

function hexToRgb(hsl) {
  let temp = document.createElement("div");
  temp.style.color = hsl;
  document.body.appendChild(temp);
  let rgb = getComputedStyle(temp).color;
  document.body.removeChild(temp);
  return rgb.match(/\d+/g).join(",");
}

function startFireworks() {
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  createFirework(x, y);
  updateFireworks();
}