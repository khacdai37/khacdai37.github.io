import { marked } from 'marked';
import type { Member } from '../lib/types';
import { formatLifespan, detailedDate } from '../lib/loadMembers';

interface Props {
  member: Member | null;
  byId: Map<string, Member>;
  focusId: string;
  onClose: () => void;
  onSelect: (id: string) => void;
  onSetFocus: (id: string) => void;
}

function RelationLinks({
  ids,
  byId,
  onSelect,
}: {
  ids: string[];
  byId: Map<string, Member>;
  onSelect: (id: string) => void;
}) {
  const people = ids.map((id) => byId.get(id)).filter((p): p is Member => Boolean(p));
  if (people.length === 0) return <span className="detail__muted">—</span>;
  return (
    <>
      {people.map((p) => (
        <button key={p.id} className="detail__link" onClick={() => onSelect(p.id)}>
          {p.name}
        </button>
      ))}
    </>
  );
}

export function PersonDetail({
  member,
  byId,
  focusId,
  onClose,
  onSelect,
  onSetFocus,
}: Props) {
  if (!member) return null;

  const children = [...byId.values()].filter((m) => m.parents.includes(member.id));
  const html = member.body ? marked.parse(member.body) : '';
  const birthDate = detailedDate(member.birth);
  const deathDate = detailedDate(member.death);

  return (
    <aside className="detail">
      <div className="detail__head">
        <div>
          <h2 className="detail__name">{member.name}</h2>
          {formatLifespan(member) && (
            <p className="detail__span">{formatLifespan(member)}</p>
          )}
        </div>
        <button className="detail__close" onClick={onClose} aria-label="Đóng">
          ✕
        </button>
      </div>

      <dl className="detail__facts">
        {birthDate && (
          <>
            <dt>Ngày sinh</dt>
            <dd>{birthDate}</dd>
          </>
        )}
        {deathDate && (
          <>
            <dt>Ngày mất</dt>
            <dd>{deathDate}</dd>
          </>
        )}
        <dt>Cha mẹ</dt>
        <dd>
          <RelationLinks ids={member.parents} byId={byId} onSelect={onSelect} />
        </dd>
        <dt>Vợ / chồng</dt>
        <dd>
          <RelationLinks ids={member.spouses} byId={byId} onSelect={onSelect} />
        </dd>
        <dt>Con cái</dt>
        <dd>
          <RelationLinks
            ids={children.map((c) => c.id)}
            byId={byId}
            onSelect={onSelect}
          />
        </dd>
      </dl>

      {member.id !== focusId && (
        <button className="detail__focus" onClick={() => onSetFocus(member.id)}>
          Đặt làm gốc cây
        </button>
      )}

      {html && (
        <div className="detail__body" dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </aside>
  );
}
