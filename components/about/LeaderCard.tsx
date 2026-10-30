import type { Leader } from "../../app/about/data";

type LeaderCardProps = {
  leader: Leader;
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" />
    </svg>
  );
}

export default function LeaderCard({ leader }: LeaderCardProps) {
  return (
    <article className="leader-card">
      <div
        className="leader-photo"
        role="img"
        aria-label={leader.alt}
        style={{ backgroundImage: `url("${leader.image}")` }}
      />
      <div className="leader-quote-badge">“A place where every learner belongs.”</div>
      <div className="leader-info">
        <p>{leader.role}</p>
        <h3>{leader.name}</h3>
        <span className="leader-linkedin" aria-label={`${leader.role} LinkedIn search`}>
          in
        </span>
      </div>
      <div className="leader-overlay">
        <span className="leader-overlay-role">{leader.role}</span>
        <h3>{leader.name}</h3>
        <p>{leader.description}</p>
        <a href={leader.linkedin} target="_blank" rel="noreferrer">
          Connect on LinkedIn <ArrowIcon />
        </a>
      </div>
    </article>
  );
}
