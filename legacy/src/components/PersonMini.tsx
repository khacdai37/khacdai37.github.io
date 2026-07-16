import type { Member } from '../lib/types';
import { formatLifespan } from '../lib/loadMembers';

interface Props {
  member: Member;
  onSelect: (id: string) => void;
  active?: boolean;
}

/** Small person tile shown inside a couple card. */
export function PersonMini({ member, onSelect, active }: Props) {
  const initials = member.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <button
      type="button"
      className={`person${active ? ' person--active' : ''}`}
      onClick={() => onSelect(member.id)}
      title={member.name}
    >
      <span className={`person__avatar person__avatar--${member.gender ?? 'unknown'}`}>
        {member.photo ? (
          <img src={member.photo} alt={member.name} />
        ) : (
          <span className="person__initials">{initials}</span>
        )}
      </span>
      <span className="person__name">{member.name}</span>
      {formatLifespan(member) && (
        <span className="person__dates">{formatLifespan(member)}</span>
      )}
    </button>
  );
}
