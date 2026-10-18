export type Boat = { x: number; y: number; vx: number; vy: number; angle: number; spin: number };
export type WaterBounds = { width: number; height: number };

const HALF_WIDTH = 24;
const HALF_HEIGHT = 22;
const MAX_SPEED = 280;
const CURRENT = 4;

export function waterline(x: number, height: number, time: number) {
  return height * (0.23
    + Math.sin(x * 0.008 - time * 0.5) * 0.075
    + Math.sin(x * 0.017 + time * 0.3) * 0.035);
}

function contain(boat: Boat, { width, height }: WaterBounds) {
  const left = Math.min(HALF_WIDTH, width / 2);
  const right = Math.max(left, width - HALF_WIDTH);
  const top = Math.min(HALF_HEIGHT, height / 2);
  const bottom = Math.max(top, height - HALF_HEIGHT);
  if (boat.x < left) { boat.x = left; boat.vx = Math.abs(boat.vx) * 0.55; }
  if (boat.x > right) { boat.x = right; boat.vx = -Math.abs(boat.vx) * 0.55; }
  if (boat.y < top) { boat.y = top; boat.vy = Math.abs(boat.vy) * 0.35; }
  if (boat.y > bottom) { boat.y = bottom; boat.vy = -Math.abs(boat.vy) * 0.35; }
}

export function createBoat(bounds: WaterBounds, time = 0): Boat {
  const x = bounds.width * 0.2;
  const boat = { x, y: waterline(x, bounds.height, time) + 13, vx: 10, vy: 0, angle: 0, spin: 0 };
  contain(boat, bounds);
  return boat;
}

export function resizeBoat(boat: Boat, previous: WaterBounds, next: WaterBounds) {
  if (previous.width > 0) boat.x *= next.width / previous.width;
  if (previous.height > 0) boat.y *= next.height / previous.height;
  contain(boat, next);
}

export function pushBoat(boat: Boat, x: number, y: number) {
  const dx = boat.x - x;
  const dy = boat.y - y;
  const distance = Math.hypot(dx, dy);
  const directionX = distance > 1 ? dx / distance : Math.sign(boat.vx) || 1;
  const directionY = distance > 1 ? dy / distance : -0.25;
  // A pressure impulse points away from the click and loses strength with
  // distance. Opposing impulses brake the boat before reversing its course.
  const impulse = 210 / (1 + distance / 160);
  boat.vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, boat.vx + directionX * impulse));
  boat.vy = Math.max(-95, Math.min(95, boat.vy + directionY * impulse * 0.45));
  boat.spin = Math.max(-70, Math.min(70, boat.spin - directionX * impulse * 0.12));
}

export function stepBoat(boat: Boat, elapsed: number, bounds: WaterBounds, time: number) {
  // Small substeps keep buoyancy and collisions stable at different frame rates.
  const duration = Math.max(0, Math.min(elapsed, 0.08));
  const steps = Math.max(1, Math.ceil(duration / (1 / 120)));
  const dt = duration / steps;
  for (let index = 0; index < steps; index++) {
    const now = time - duration + dt * (index + 1);
    boat.vx = CURRENT + (boat.vx - CURRENT) * Math.exp(-0.65 * dt);
    boat.x += boat.vx * dt;

    const floatingY = waterline(boat.x, bounds.height, now) + 13;
    boat.vy += ((floatingY - boat.y) * 26 - boat.vy * 7) * dt;
    boat.y += boat.vy * dt;

    const slope = (waterline(boat.x + 12, bounds.height, now) - waterline(boat.x - 12, bounds.height, now)) / 24;
    const lean = Math.max(-16, Math.min(16, Math.atan(slope) * 180 / Math.PI * 0.5 - boat.vx * 0.035));
    boat.spin += ((lean - boat.angle) * 24 - boat.spin * 7) * dt;
    boat.angle += boat.spin * dt;
    contain(boat, bounds);
  }
}
