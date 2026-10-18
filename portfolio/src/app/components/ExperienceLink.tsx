export type Experience = { href: string; logo: string; role: string; company: string; date: string };

export default function ExperienceLink({ experience: exp }: { experience: Experience }) {
  return (
  <a href={exp.href} target="_blank" rel="noopener noreferrer"
    className="home-experience-row home-experience-row--link"
    aria-label={`${exp.role} at ${exp.company}, ${exp.date}`}>
    <span className="home-experience-row__left">
      <span className="home-experience-row__affiliation">
        <span className="home-experience-row__role">{exp.role}</span>
        <span className="home-experience-row__company">
          <span>{exp.company}</span>
          <span className="affiliation-logo-wrap" aria-hidden="true"><img src={exp.logo} alt="" className="affiliation-logo" /></span>
        </span>
      </span>
    </span>
    <span className="list-meta home-experience-row__date">{exp.date}</span>
  </a>
  );
}
