/* =========================================================================
   ISOMETRIC GEOMETRY HELPERS
   3D axes: x = length (drawn right-down), y = width (drawn left-down), z = up.
   Visible faces in this view: top (z = H), front (y = W) and right (x = L).
   Every face has matching 3D corners and flat-net corners, so a face can be
   morphed smoothly from the solid into its net (t = 0 → 1).
   ========================================================================= */
export const C30 = Math.cos(Math.PI / 6);
export const S30 = 0.5;

export const iso = ([x, y, z]) => [(x - y) * C30, (x + y) * S30 - z];

/** Returns a mapper that fits 2D points (any units) into a W×H box with padding. */
export function makeFit(points, W, H, pad = 30) {
  const xs = points.map(p => p[0]);
  const ys = points.map(p => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const u = Math.min((W - 2 * pad) / Math.max(maxX - minX, 1e-6), (H - 2 * pad) / Math.max(maxY - minY, 1e-6));
  const ox = (W - (maxX - minX) * u) / 2 - minX * u;
  const oy = (H - (maxY - minY) * u) / 2 - minY * u;
  const f = p => [ox + p[0] * u, oy + p[1] * u];
  f.u = u;
  return f;
}

export const lerp = (a, b, t) => a + (b - a) * t;
export const lerpPt = (p, q, t) => [lerp(p[0], q[0], t), lerp(p[1], q[1], t)];
export const ptsAttr = pts => pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
export const centroid = pts => [pts.reduce((a, p) => a + p[0], 0) / pts.length, pts.reduce((a, p) => a + p[1], 0) / pts.length];

/** Six faces of an L × W × H cuboid, with 3D corners and a cross-shaped net. */
export function cuboidFaces(L, W, H) {
  const net = (u, v, w, h) => [[u, v], [u + w, v], [u + w, v + h], [u, v + h]];
  return [
    { key: 'back', name: 'Back', a: L, b: H, visible: false, net: net(W, 0, L, H),
      p3: [[0, 0, 0], [L, 0, 0], [L, 0, H], [0, 0, H]] },
    { key: 'left', name: 'Left', a: W, b: H, visible: false, net: net(0, H + W, W, H),
      p3: [[0, 0, H], [0, W, H], [0, W, 0], [0, 0, 0]] },
    { key: 'bottom', name: 'Bottom', a: L, b: W, visible: false, net: net(W, 2 * H + W, L, W),
      p3: [[0, W, 0], [L, W, 0], [L, 0, 0], [0, 0, 0]] },
    { key: 'top', name: 'Top', a: L, b: W, visible: true, net: net(W, H, L, W),
      p3: [[0, 0, H], [L, 0, H], [L, W, H], [0, W, H]] },
    { key: 'front', name: 'Front', a: L, b: H, visible: true, net: net(W, H + W, L, H),
      p3: [[0, W, H], [L, W, H], [L, W, 0], [0, W, 0]] },
    { key: 'right', name: 'Right', a: W, b: H, visible: true, net: net(W + L, H + W, W, H),
      p3: [[L, W, H], [L, 0, H], [L, 0, 0], [L, W, 0]] }
  ].map(f => ({ ...f, area: f.a * f.b, kind: 'rect' }));
}

/** Five faces of a triangular prism: length L along x, isosceles triangle with base b, height h, slant s. */
export function prismFaces(L, b, h, s) {
  return [
    { key: 'slantA', name: 'Slope 1', a: L, b: s, kind: 'rect', visible: false,
      net: [[h, 0], [h + L, 0], [h + L, s], [h, s]],
      p3: [[0, b / 2, h], [L, b / 2, h], [L, 0, 0], [0, 0, 0]] },
    { key: 'base', name: 'Base', a: L, b: b, kind: 'rect', visible: false,
      net: [[h, s], [h + L, s], [h + L, s + b], [h, s + b]],
      p3: [[0, 0, 0], [L, 0, 0], [L, b, 0], [0, b, 0]] },
    { key: 'endA', name: 'End 1', a: b, b: h, kind: 'tri', visible: false,
      net: [[h, s], [h, s + b], [0, s + b / 2]],
      p3: [[0, 0, 0], [0, b, 0], [0, b / 2, h]] },
    { key: 'slantB', name: 'Slope 2', a: L, b: s, kind: 'rect', visible: true,
      net: [[h, s + b], [h + L, s + b], [h + L, 2 * s + b], [h, 2 * s + b]],
      p3: [[0, b, 0], [L, b, 0], [L, b / 2, h], [0, b / 2, h]] },
    { key: 'endB', name: 'End 2', a: b, b: h, kind: 'tri', visible: true,
      net: [[h + L, s], [h + L, s + b], [2 * h + L, s + b / 2]],
      p3: [[L, 0, 0], [L, b, 0], [L, b / 2, h]] }
  ].map(f => ({ ...f, area: f.kind === 'tri' ? (f.a * f.b) / 2 : f.a * f.b }));
}

/** The three visible faces of a unit cube whose min corner is (x, y, z). */
export function unitCubeFaces(x, y, z, s = 1) {
  return {
    top: [[x, y, z + s], [x + s, y, z + s], [x + s, y + s, z + s], [x, y + s, z + s]],
    front: [[x, y + s, z + s], [x + s, y + s, z + s], [x + s, y + s, z], [x, y + s, z]],
    right: [[x + s, y + s, z + s], [x + s, y, z + s], [x + s, y, z], [x + s, y + s, z]]
  };
}

/** Painter's order for unit cubes in this view (far → near). */
export const cubeOrder = (a, b) => (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]) || a[2] - b[2];
