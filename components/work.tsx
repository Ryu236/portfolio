import React from 'react'

type Role = {
  dates: string
  title: string
  description: string
}

type Job = {
  dates: string
  company: string
  featured?: boolean
  roles?: Role[]
  title?: string
  description?: string
}

const jobs: Job[] = [
  {
    dates: 'Mar 2023 — Present',
    company: 'UPSIDER, Inc.',
    featured: true,
    roles: [
      {
        dates: 'Apr 2026 — Present',
        title: 'Tech Lead, Anti-Fraud',
        description: 'Anti-fraud engineering. Card fraud, transaction safety.',
      },
      {
        dates: 'Nov 2024 — Mar 2026',
        title: 'Engineering Manager, Anti-Fraud',
        description: 'Built the team and the product from scratch.',
      },
      {
        dates: 'Sep 2023 — Oct 2024',
        title: 'Software Engineer, Processor',
        description:
          'Processing system. Preventing fraudulent use of corporate credit cards.',
      },
      {
        dates: 'Mar 2023 — Aug 2023',
        title: 'Software Engineer',
        description:
          'Web application, Slack application, and related product work.',
      },
    ],
  },
  {
    dates: 'Apr 2023 — Jan 2024',
    company: 'Shiftbase, Inc.',
    title: 'Backend Engineer (side job)',
    description: 'Web application.',
  },
  {
    dates: 'Apr 2019 — Feb 2023',
    company: 'DMM.com LLC',
    title: 'Software Engineer',
    description: 'Payment platform: development, maintenance, operations.',
  },
  {
    dates: 'May 2021 — Jan 2022',
    company: 'GANGAN, Inc.',
    title: 'Backend Engineer (side job)',
    description: 'Application development.',
  },
  {
    dates: 'Sep 2018',
    company: 'Eureka, Inc.',
    title: 'Internship',
    description: 'Android application.',
  },
  {
    dates: 'Sep 2017',
    company: 'Sony Corporation',
    title: 'Internship',
    description: 'Embedded system.',
  },
]

const DateLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[13px] leading-6 text-muted">{children}</p>
)

const RoleTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
    {children}
  </p>
)

const FeaturedJob: React.FC<{ job: Job }> = ({ job }) => (
  <article className="grid grid-cols-1 gap-2 border-t border-rule py-8 sm:grid-cols-[168px_1fr] sm:gap-x-6">
    <DateLabel>{job.dates}</DateLabel>
    <div>
      <h3 className="font-serif text-[1.75rem] font-semibold leading-tight text-ink">
        {job.company}
      </h3>
      <div className="mt-5">
        {job.roles?.map((role) => (
          <div
            key={`${role.title}-${role.dates}`}
            className="grid grid-cols-1 gap-2 border-t border-rule py-4 first:pt-4 last:pb-0 sm:grid-cols-[168px_1fr] sm:gap-x-6"
          >
            <DateLabel>{role.dates}</DateLabel>
            <div>
              <RoleTitle>{role.title}</RoleTitle>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink">
                {role.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </article>
)

const QuietJob: React.FC<{ job: Job }> = ({ job }) => (
  <article className="grid grid-cols-1 gap-2 border-t border-rule py-7 sm:grid-cols-[168px_1fr] sm:gap-x-6">
    <DateLabel>{job.dates}</DateLabel>
    <div>
      <h3 className="font-serif text-[1.375rem] font-medium leading-tight text-ink">
        {job.company}
      </h3>
      {job.title && (
        <div className="mt-1">
          <RoleTitle>{job.title}</RoleTitle>
        </div>
      )}
      {job.description && (
        <p className="mt-1.5 text-[15px] leading-relaxed text-ink">
          {job.description}
        </p>
      )}
    </div>
  </article>
)

export const Work: React.FC = () => {
  return (
    <section id="work" className="scroll-mt-8">
      <h2 className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
        Work
      </h2>
      <div>
        {jobs.map((job) =>
          job.featured ? (
            <FeaturedJob key={job.company} job={job} />
          ) : (
            <QuietJob key={`${job.company}-${job.dates}`} job={job} />
          ),
        )}
      </div>
    </section>
  )
}

type EducationItem = {
  dates: string
  school: string
  degree: string
}

const education: EducationItem[] = [
  {
    dates: 'Apr 2017 — Mar 2019',
    school: 'Shinshu University',
    degree: 'M.S. Electrical and Computer Engineering',
  },
  {
    dates: 'Apr 2013 — Mar 2017',
    school: 'Shinshu University',
    degree: 'B.S. Computer Science and Engineering',
  },
]

export const Education: React.FC = () => {
  return (
    <section id="education" className="scroll-mt-8">
      <h2 className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
        Education
      </h2>
      <div>
        {education.map((item) => (
          <article
            key={`${item.degree}-${item.dates}`}
            className="grid grid-cols-1 gap-2 border-t border-rule py-7 sm:grid-cols-[168px_1fr] sm:gap-x-6"
          >
            <DateLabel>{item.dates}</DateLabel>
            <div>
              <h3 className="font-serif text-[1.375rem] font-medium leading-tight text-ink">
                {item.school}
              </h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink">
                {item.degree}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
