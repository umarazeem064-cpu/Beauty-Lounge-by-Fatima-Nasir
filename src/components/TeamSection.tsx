import { ArrowUpRight, Instagram } from 'lucide-react';
import { TEAM_MEMBERS, TeamMember } from '../data/salonData';
import { SalonImage } from './SalonImage';

interface TeamSectionProps {
  onBookStylist: (member: TeamMember) => void;
}

export function TeamSection({ onBookStylist }: TeamSectionProps) {
  return (
    <section
      id="team"
      className="py-20 lg:py-28 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] theme-surface"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-[var(--accent)] mb-3">
            Master Artists &amp; Specialists
          </p>
          <h2 className="font-display headline-balance text-[clamp(2rem,3.4vw,3.1rem)] font-semibold leading-[1.12] text-[var(--text-primary)]">
            Experienced Hands Behind Every Transformation
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--text-secondary)]">
            Trained in international academies and under Fatima Nasir’s studio standards, our
            Multan specialists combine technical mastery with quiet, attentive service.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member) => (
            <article
              key={member.id}
              className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] theme-surface"
            >
              <div>
                {/* 3:4 Editorial Portrait (.jpg) */}
                <div className="aspect-[3/4] w-full overflow-hidden bg-[var(--bg-subtle)]">
                  <SalonImage
                    src={member.image}
                    alt={member.imageAlt}
                    fallbackTitle={member.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Clean Typography & Unboxed Metadata */}
                <div className="p-5">
                  <p className="text-xs text-[var(--accent)] font-medium tabular-nums">
                    {member.experience}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-[var(--text-primary)]">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-[var(--text-muted)]">
                    {member.role} · {member.specialty}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {member.bio}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-[var(--border-subtle)] px-5 py-3.5">
                <button
                  type="button"
                  onClick={() => onBookStylist(member)}
                  className="inline-flex min-h-[38px] items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer whitespace-nowrap"
                >
                  <span>Book with {member.name.split(' ')[0]}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>

                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow ${member.name} on Instagram`}
                  className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--accent)] transition-colors"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
