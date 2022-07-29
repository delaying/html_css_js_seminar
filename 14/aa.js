console.clear();
// gsap.config({ trialWarn: false });
// gsap.registerPlugin(Draggable, InertiaPlugin);
const sizer = document.querySelector("#demo1");
const factor = [8, 14, 20];
const travel = 250;

gsap.set(".demo", { xPercent: -50, yPercent: -50 });
gsap.set(".draggerBounds", { xPercent: -50 });
gsap.set("#ship1", { rotation: -17, transformOrigin: "center center" });

Draggable.create("#dragger", {
  type: "x",
  bounds: {
    minX: -travel,
    maxX: travel,
  },
  inertia: true,
  edgeResistance: 1,
  onDrag: onDrag,
  onThrowUpdate: onDrag,
});

function onDrag() {
  for (i = 1; i < 4; i++) {
    gsap.set("#demo" + i, {
      attr: { viewBox: 5000 + this.x * factor[i - 1] + " 0 2000 1000" },
    });
  }
}

const dishAnim = gsap.timeline({
  repeat: -1,
  yoyo: true,
  defaults: { ease: "power2.inOut" },
});
const ships = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });

dishAnim.to(".dishMainPivot", {
  duration: 4,
  rotation: 12,
  transformOrigin: "center bottom",
});
dishAnim.to(
  ".dishTop",
  { duration: 4, rotation: 30, transformOrigin: "center bottom" },
  0
);
dishAnim.to(".dishTop", { duration: 6, rotation: -30 });

gsap.to("#ship1", {
  duration: 5,
  y: 700,
  yoyo: true,
  delay: 1.5,
  repeat: -1,
  repeatDelay: 1,
});

ships.to("#ship2", {
  duration: 10,
  x: -5500,
  transformOrigin: "center center",
});
ships.add("comeBack");
ships.to("#ship2", { duration: 1, rotation: 45 }, "comeBack");
ships.to("#ship2", { duration: 10, x: 0 }, "comeBack");
ships.to("#ship2", { duration: 1, rotation: 0 });

function newSize() {
  let data = sizer.getBoundingClientRect();
  gsap.set(".draggerBounds", { top: data.bottom - 5 });
}

newSize();
window.addEventListener("resize", newSize);
