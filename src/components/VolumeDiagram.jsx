import React from 'react';
import { iso, makeFit, ptsAttr, cuboidFaces, unitCubeFaces, cubeOrder } from './iso.js';

/* =========================================================================
   VOLUME DIAGRAM — isometric drawing for each practice question.
   ========================================================================= */
const VW = 360;
const VH = 210;
const COL = { top: '#facc15', front: '#f472b6', right: '#38bdf8' };
const LAYER = ['#38bdf8', '#facc15', '#f472b6', '#4ade80'];

function Label({ x, y, children, anchor = 'middle', color = '#facc15', size = 14 }) {
  return (
    <text x={x} y={y} fill={color} fontSize={size} fontWeight="900" textAnchor={anchor} dominantBaseline="middle"
      style={{ paintOrder: 'stroke', stroke: '#0c0520', strokeWidth: 4 }}>
      {children}
    </text>
  );
}

function frame(L, W, H, pad = 32) {
  const faces = cuboidFaces(L, W, H);
  const fit = makeFit(faces.flatMap(f => f.p3.map(iso)), VW, VH, pad);
  const P = p => fit(iso(p));
  const mid = (a, b) => { const p = P(a), q = P(b); return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; };
  return {
    faces, P,
    pL: mid([0, W, 0], [L, W, 0]),
    pW: mid([L, W, 0], [L, 0, 0]),
    pH: mid([L, 0, 0], [L, 0, H])
  };
}

function Dims({ f, L, W, H, un, unknown }) {
  const lab = v => (unknown === 'all' ? '?' : `${v} ${un}`);
  const cube = L === W && W === H && unknown !== 'all';
  return (
    <>
      {unknown !== 'base' && <Label x={f.pL[0] - 8} y={f.pL[1] + 16}>{lab(L)}</Label>}
      {unknown !== 'base' && !cube && <Label x={f.pW[0] + 14} y={f.pW[1] + 14}>{lab(W)}</Label>}
      {!cube && (
        <Label x={f.pH[0] + 8} y={f.pH[1]} anchor="start" color={unknown === 'H' ? '#f472b6' : '#facc15'}>
          {unknown === 'H' ? 'h = ?' : lab(H)}
        </Label>
      )}
    </>
  );
}

function BoxSolid({ d }) {
  const { L, W, H, unit: un } = d;
  const f = frame(L, W, H);
  const lines = [];
  if (d.grid) {
    const c = d.grid;
    for (let x = c; x < L; x += c) {
      lines.push([[x, 0, H], [x, W, H]], [[x, W, H], [x, W, 0]]);
    }
    for (let y = c; y < W; y += c) {
      lines.push([[0, y, H], [L, y, H]], [[L, y, H], [L, y, 0]]);
    }
    for (let z = c; z < H; z += c) {
      lines.push([[0, W, z], [L, W, z]], [[L, W, z], [L, 0, z]]);
    }
  }
  return (
    <g>
      {f.faces.filter(x => !x.visible).map(x => (
        <polygon key={x.key} points={ptsAttr(x.p3.map(f.P))} fill="none" stroke="#94a3b8" strokeWidth="1.3" strokeDasharray="5 4" />
      ))}
      {f.faces.filter(x => x.visible).map(x => (
        <polygon key={x.key} points={ptsAttr(x.p3.map(f.P))} fill={COL[x.key]} fillOpacity={d.unknown === 'base' && x.key === 'top' ? 0.6 : 0.3}
          stroke={COL[x.key]} strokeWidth="2.5" strokeLinejoin="round" />
      ))}
      {lines.map(([a, b], i) => {
        const p = f.P(a), q = f.P(b);
        return <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke="#e2e8f0" strokeOpacity="0.55" strokeWidth="1" />;
      })}
      <Dims f={f} L={L} W={W} H={H} un={un} unknown={d.unknown} />
      {d.unknown === 'base' && (
        <Label x={f.P([L / 2, W / 2, H])[0]} y={f.P([L / 2, W / 2, H])[1]} color="#ffffff" size={13}>base = ?</Label>
      )}
      {d.total && <Label x={VW / 2} y={VH - 10} color="#f472b6" size={13}>V = {d.total} {un}³</Label>}
      {d.grid && <Label x={VW / 2} y={VH - 10} color="#e2e8f0" size={12}>{d.grid} {un} cubes</Label>}
    </g>
  );
}

function CubesSolid({ d }) {
  const { L, W, H } = d;
  const f = frame(L, W, H, 30);
  const cubes = [];
  for (let z = 0; z < H; z++) for (let y = 0; y < W; y++) for (let x = 0; x < L; x++) cubes.push([x, y, z]);
  cubes.sort(cubeOrder);
  return (
    <g>
      {cubes.map(([x, y, z]) => {
        const c = LAYER[z % LAYER.length];
        const u = unitCubeFaces(x, y, z);
        return (
          <g key={`${x}${y}${z}`}>
            <polygon points={ptsAttr(u.top.map(f.P))} fill={c} fillOpacity="0.95" stroke="#0c0424" strokeWidth="1.2" />
            <polygon points={ptsAttr(u.front.map(f.P))} fill={c} fillOpacity="0.62" stroke="#0c0424" strokeWidth="1.2" />
            <polygon points={ptsAttr(u.right.map(f.P))} fill={c} fillOpacity="0.4" stroke="#0c0424" strokeWidth="1.2" />
          </g>
        );
      })}
    </g>
  );
}

function TankSolid({ d }) {
  const { L, W, H, depth, unit: un } = d;
  const f = frame(L, W, H, 34);
  const water = cuboidFaces(L, W, depth).filter(x => x.visible);
  const lvl = f.P([L, 0, depth]);
  return (
    <g>
      {f.faces.filter(x => !x.visible).map(x => (
        <polygon key={x.key} points={ptsAttr(x.p3.map(f.P))} fill="none" stroke="#94a3b8" strokeWidth="1.3" strokeDasharray="5 4" />
      ))}
      {water.map(x => (
        <polygon key={x.key} points={ptsAttr(x.p3.map(f.P))} fill="#38bdf8" fillOpacity={x.key === 'top' ? 0.6 : 0.38} stroke="#7dd3fc" strokeWidth="1" />
      ))}
      {f.faces.filter(x => x.visible).map(x => (
        <polygon key={x.key} points={ptsAttr(x.p3.map(f.P))} fill={d.showEmpty && x.key !== 'top' ? '#f472b6' : 'none'} fillOpacity="0.06"
          stroke="#e2e8f0" strokeWidth="2" strokeLinejoin="round" />
      ))}
      <Label x={f.pL[0] - 8} y={f.pL[1] + 16}>{L} {un}</Label>
      <Label x={f.pW[0] + 14} y={f.pW[1] + 14}>{W} {un}</Label>
      {!d.unknownDepth && depth !== H && <Label x={f.pH[0] + 8} y={f.P([L, 0, H * 0.85])[1]} anchor="start">{H} {un}</Label>}
      {depth === H && <Label x={f.pH[0] + 8} y={f.pH[1]} anchor="start">{H} {un}</Label>}
      {depth !== H && (
        <Label x={lvl[0] + 8} y={lvl[1] + 10} anchor="start" color={d.unknownDepth ? '#f472b6' : '#7dd3fc'}>
          {d.unknownDepth ? 'depth = ?' : `water ${depth} ${un}`}
        </Label>
      )}
    </g>
  );
}

export function VolumeDiagram({ diagramData, size = 190 }) {
  if (!diagramData) return null;
  const d = diagramData;
  let body = null;
  if (d.type === 'box') body = <BoxSolid d={d} />;
  else if (d.type === 'cubes') body = <CubesSolid d={d} />;
  else if (d.type === 'tank') body = <TankSolid d={d} />;
  if (!body) return null;
  return (
    <div className="flex items-center justify-center my-1">
      <svg width={size * (VW / VH)} height={size} viewBox={`0 0 ${VW} ${VH}`} className="max-w-full drop-shadow-[0_0_18px_rgba(56,189,248,0.25)]">
        {body}
      </svg>
    </div>
  );
}
