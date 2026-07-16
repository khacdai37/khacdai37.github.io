import { useEffect, useMemo, useRef, useState } from 'react';
import type { Member } from '../lib/types';
import {
  buildAncestorTree,
  layoutTree,
  CARD_W,
  CARD_H,
} from '../lib/buildTree';
import { PersonMini } from './PersonMini';

interface Props {
  focusId: string;
  byId: Map<string, Member>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

interface View {
  scale: number;
  tx: number;
  ty: number;
}

const MIN_SCALE = 0.2;
const MAX_SCALE = 2.5;
const clampScale = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));

export function FamilyTree({ focusId, byId, selectedId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>({ scale: 1, tx: 0, ty: 0 });
  // Active touch/mouse pointers (keyed by pointerId) for pan + pinch handling.
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pan = useRef<{ x: number; y: number } | null>(null);
  const pinch = useRef<{ dist: number; cx: number; cy: number } | null>(null);

  const layout = useMemo(() => {
    const tree = buildAncestorTree(focusId, byId);
    return tree ? layoutTree(tree) : null;
  }, [focusId, byId]);

  // Fit the tree to the viewport whenever the focus changes.
  useEffect(() => {
    if (!layout || !containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    const pad = 48;
    const scale = Math.min(
      1,
      (clientWidth - pad) / layout.width,
      (clientHeight - pad) / layout.height,
    );
    const tx = (clientWidth - layout.width * scale) / 2;
    const ty = (clientHeight - layout.height * scale) / 2;
    setView({ scale, tx, ty });
  }, [layout]);

  if (!layout) {
    return <div className="tree tree--empty">Không tìm thấy người gốc.</div>;
  }

  // Keep the tree from drifting entirely off-screen (safety net for gestures).
  const clampView = (v: View): View => {
    const el = containerRef.current;
    if (!el || !layout) return v;
    const m = 80; // px of the canvas that must stay visible
    const w = layout.width * v.scale;
    const h = layout.height * v.scale;
    return {
      scale: v.scale,
      tx: Math.min(el.clientWidth - m, Math.max(m - w, v.tx)),
      ty: Math.min(el.clientHeight - m, Math.max(m - h, v.ty)),
    };
  };

  // Zoom around a focal point (local coords), keeping that point fixed.
  const zoomAt = (v: View, factor: number, cx: number, cy: number): View => {
    const scale = clampScale(v.scale * factor);
    const k = scale / v.scale;
    return clampView({ scale, tx: cx - (cx - v.tx) * k, ty: cy - (cy - v.ty) * k });
  };

  const localPoint = (clientX: number, clientY: number) => {
    const rect = containerRef.current!.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const pinchState = () => {
    const pts = [...pointers.current.values()];
    const dx = pts[0].x - pts[1].x;
    const dy = pts[0].y - pts[1].y;
    const mid = localPoint((pts[0].x + pts[1].x) / 2, (pts[0].y + pts[1].y) / 2);
    return { dist: Math.hypot(dx, dy) || 1, cx: mid.x, cy: mid.y };
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const p = localPoint(e.clientX, e.clientY);
    setView((v) => zoomAt(v, e.deltaY < 0 ? 1.1 : 0.9, p.x, p.y));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    // NOTE: no setPointerCapture here — capturing the first pointer prevents the
    // second finger's pointerdown from firing, breaking pinch-to-zoom on touch.
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      pan.current = localPoint(e.clientX, e.clientY);
      pinch.current = null;
    } else if (pointers.current.size === 2) {
      pan.current = null;
      pinch.current = pinchState();
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size >= 2) {
      const now = pinchState();
      const prev = pinch.current;
      pinch.current = now;
      if (prev) {
        setView((v) => {
          const scale = clampScale(v.scale * (now.dist / prev.dist));
          const k = scale / v.scale;
          // Zoom around the pinch midpoint and follow its movement (pan).
          return clampView({
            scale,
            tx: now.cx - (prev.cx - v.tx) * k,
            ty: now.cy - (prev.cy - v.ty) * k,
          });
        });
      }
    } else if (pan.current) {
      const p = localPoint(e.clientX, e.clientY);
      const dx = p.x - pan.current.x;
      const dy = p.y - pan.current.y;
      pan.current = p;
      setView((v) => clampView({ ...v, tx: v.tx + dx, ty: v.ty + dy }));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 1) {
      const [pt] = [...pointers.current.values()];
      pan.current = localPoint(pt.x, pt.y);
    } else if (pointers.current.size === 0) {
      pan.current = null;
    }
  };

  const zoom = (factor: number) => {
    const el = containerRef.current;
    const cx = el ? el.clientWidth / 2 : 0;
    const cy = el ? el.clientHeight / 2 : 0;
    setView((v) => zoomAt(v, factor, cx, cy));
  };

  return (
    <div
      className="tree"
      ref={containerRef}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        className="tree__canvas"
        style={{
          transform: `translate(${view.tx}px, ${view.ty}px) scale(${view.scale})`,
          width: layout.width,
          height: layout.height,
        }}
      >
        <svg
          className="tree__links"
          width={layout.width}
          height={layout.height}
          viewBox={`0 0 ${layout.width} ${layout.height}`}
        >
          {layout.edges.map(([parent, child], i) => {
            const px = parent.px + CARD_W / 2;
            const pTop = parent.py;
            const cx = child.px + CARD_W / 2;
            const cBottom = child.py + CARD_H;
            const busY = (pTop + cBottom) / 2;
            return (
              <path
                key={i}
                className="tree__link"
                d={`M ${px} ${pTop} V ${busY} H ${cx} V ${cBottom}`}
              />
            );
          })}
        </svg>

        {layout.nodes.map((node) => (
          <div
            key={node.key}
            className="couple"
            style={{ left: node.px, top: node.py, width: CARD_W, minHeight: CARD_H }}
          >
            {node.members.map((m) => (
              <PersonMini
                key={m.id}
                member={m}
                onSelect={onSelect}
                active={m.id === selectedId}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="tree__controls">
        <button type="button" onClick={() => zoom(1.15)} aria-label="Phóng to">
          +
        </button>
        <button type="button" onClick={() => zoom(0.87)} aria-label="Thu nhỏ">
          −
        </button>
      </div>
    </div>
  );
}
