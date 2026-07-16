import type { Member, TreeNode, PositionedNode } from './types';

export const CARD_W = 300;
export const CARD_H = 168;
export const GAP_X = 28;
export const ROW_H = 250;

/**
 * Build an ancestor chart rooted at `focusId`.
 *
 * Each node is a "couple card" (or a single person for the focus / when a
 * spouse is unknown). A node's children are the ancestor-couples of each of
 * its members: the father's parents and the mother's parents. This produces
 * the classic pedigree shape — the focus at the bottom, older generations
 * fanning out above.
 */
export function buildAncestorTree(
  focusId: string,
  byId: Map<string, Member>,
): TreeNode | null {
  const focus = byId.get(focusId);
  if (!focus) return null;

  const build = (people: Member[], depth: number, path: Set<string>): TreeNode => {
    const node: TreeNode = {
      key: people.map((p) => p.id).join('+') || `d${depth}`,
      members: people,
      children: [],
      depth,
      x: 0,
    };

    for (const person of people) {
      const parents = person.parents
        .map((id) => byId.get(id))
        // Drop parents already on this path to guard against cyclic data.
        .filter((p): p is Member => Boolean(p) && !path.has(p!.id));
      if (parents.length === 0) continue;

      const nextPath = new Set(path);
      parents.forEach((p) => nextPath.add(p.id));
      node.children.push(build(parents, depth + 1, nextPath));
    }

    return node;
  };

  return build([focus], 0, new Set([focus.id]));
}

/** Assign x slots (leaves left-to-right, parents centered over children). */
function assignX(node: TreeNode, cursor: { next: number }): void {
  if (node.children.length === 0) {
    node.x = cursor.next;
    cursor.next += 1;
    return;
  }
  node.children.forEach((c) => assignX(c, cursor));
  const first = node.children[0].x;
  const last = node.children[node.children.length - 1].x;
  node.x = (first + last) / 2;
}

function maxDepthOf(node: TreeNode): number {
  return node.children.reduce((m, c) => Math.max(m, maxDepthOf(c)), node.depth);
}

export interface Layout {
  nodes: PositionedNode[];
  /** [parentNode, childNode] edges, for drawing connectors */
  edges: [PositionedNode, PositionedNode][];
  width: number;
  height: number;
}

/** Turn a tree into absolute pixel positions plus connector edges. */
export function layoutTree(root: TreeNode): Layout {
  assignX(root, { next: 0 });
  const maxDepth = maxDepthOf(root);
  const slot = CARD_W + GAP_X;

  const positioned = new Map<string, PositionedNode>();
  const nodes: PositionedNode[] = [];
  const edges: [PositionedNode, PositionedNode][] = [];

  const walk = (node: TreeNode): PositionedNode => {
    const p: PositionedNode = {
      ...node,
      children: node.children,
      px: node.x * slot,
      // Older generations (higher depth) sit at the top (smaller py).
      py: (maxDepth - node.depth) * ROW_H,
    };
    positioned.set(node.key, p);
    nodes.push(p);
    return p;
  };

  const connect = (node: TreeNode) => {
    const parent = positioned.get(node.key)!;
    for (const child of node.children) {
      const childPos = walk(child);
      edges.push([parent, childPos]);
      connect(child);
    }
  };

  walk(root);
  connect(root);

  const maxX = Math.max(...nodes.map((n) => n.px));
  return {
    nodes,
    edges,
    width: maxX + CARD_W,
    height: (maxDepth + 1) * ROW_H,
  };
}
