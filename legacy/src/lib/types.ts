export interface Member {
  id: string;
  name: string;
  gender?: 'male' | 'female' | string;
  birth?: string | number;
  death?: string | number;
  photo?: string;
  /** [fatherId, motherId] — either can be omitted/unknown */
  parents: string[];
  spouses: string[];
  /** Raw markdown body (everything after the frontmatter block) */
  body: string;
}

/** A card in the ancestor chart: 1 person (leaf/root) or a couple (2 people). */
export interface TreeNode {
  key: string;
  members: Member[];
  children: TreeNode[];
  depth: number;
  /** horizontal slot position (in card-slot units), filled by layout */
  x: number;
}

export interface PositionedNode extends TreeNode {
  px: number;
  py: number;
}
