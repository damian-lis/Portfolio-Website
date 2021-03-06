import Particle from './Particle.js';
import {
  createElementFn,
  appendElementsToContainerFn,
} from '/scripts/helpers/index.js';
import { idNames, events, elements } from '/data/global/names.js';

class Particles {
  constructor({ container }) {
    this.particleArray = [];
    this.theme = {};
    this.isMobile = this.setIsMobile();

    this.createElements();
    this.setContext();
    this.listenForResize();
    appendElementsToContainerFn({
      elements: [this.canvas],
      container,
    });
  }

  createElements() {
    this.canvas = createElementFn({
      element: elements.canvas,
      id: idNames.theme.canvas,
    });
  }

  setMouse() {
    return {
      x: null,
      y: null,
      radius: (this.canvas.height / 80) * (this.canvas.width / 80),
    };
  }

  setIsMobile() {
    return window.innerWidth < 500;
  }

  setContext() {
    this.ctx = this.canvas.getContext('2d');
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
  }

  setTheme({ themeObj }) {
    this.theme = themeObj;
    this.strokeColor = themeObj.strokeColor;
    this.ctx.fillStyle = themeObj.ctxFillStyle;
  }

  start({ themeObj }) {
    this.setTheme({ themeObj });
    this.init();
    this.animate();
    this.update();
  }

  connect() {
    let opacityValue = 1;
    for (let a = 0; a < this.particleArray.length; a++) {
      for (let b = a; b < this.particleArray.length; b++) {
        let distance =
          (this.particleArray[a].x - this.particleArray[b].x) *
            (this.particleArray[a].x - this.particleArray[b].x) +
          (this.particleArray[a].y - this.particleArray[b].y) *
            (this.particleArray[a].y - this.particleArray[b].y);
        if (distance < (this.canvas.width / 7) * (this.canvas.height / 7)) {
          opacityValue = 1 - distance / (this.isMobile ? 4000 : 10000);
          this.ctx.strokeStyle = `rgba(${this.strokeColor}, ${opacityValue} )`;
          this.ctx.beginPath();
          this.ctx.lineWidth = 2;
          this.ctx.moveTo(this.particleArray[a].x, this.particleArray[a].y);
          this.ctx.lineTo(this.particleArray[b].x, this.particleArray[b].y);
          this.ctx.stroke();
        }
      }
    }
  }

  init() {
    this.strokeColor = this.theme.strokeColor;
    this.ctx.fillStyle = this.theme.ctxFillStyle;
    let numberOfParticles = (this.canvas.height * this.canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
      let size = Math.random() * 5 + 1;
      let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
      let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
      let directionX = Math.random() * 2 - 1;
      let directionY = Math.random() * 2 - 1;

      this.particleArray.push(
        new Particle(x, y, directionX, directionY, size, this.canvas, this.ctx)
      );
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < this.particleArray.length; i++) {
      this.particleArray[i].update();
    }
    this.connect();
  }

  update() {
    const updateFn = () => {
      requestAnimationFrame(updateFn);
      this.animate();
    };
    updateFn();
  }

  listenForResize() {
    window.addEventListener(events.resize, () => this.resize());
  }

  resize() {
    this.particleArray = [];
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.isMobile = this.setIsMobile();
    this.init();
    this.connect();
  }
}

export default Particles;
