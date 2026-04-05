export default function Awards() {
  const awards = [
    {
      year: 2023,
      title: 'Excellence in Research Award',
      organization: 'UKM Research Office',
      description: 'Recognition for outstanding contributions to academic research and innovation.',
    },
    {
      year: 2022,
      title: 'Best Teaching Award',
      organization: 'Faculty of Computer Science',
      description: 'Awarded for innovative teaching methods and exceptional student mentorship.',
    },
    {
      year: 2021,
      title: 'International Collaboration Grant',
      organization: 'Ministry of Higher Education Malaysia',
      description: 'Funding for collaborative research project with Cambridge University.',
    },
    {
      year: 2020,
      title: 'Impact Award for Sustainable Computing',
      organization: 'Institute of Research and Development',
      description:
        'Recognition for research advancing environmental sustainability through computing solutions.',
    },
    {
      year: 2019,
      title: 'Promising Young Researcher Award',
      organization: 'IEEE Malaysia Section',
      description: 'Award recognizing significant contributions to computer science research under age 45.',
    },
    {
      year: 2018,
      title: 'Publication Excellence Award',
      organization: 'UKM Faculty Council',
      description: 'Recognition for publishing in highly-ranked international journals and conferences.',
    },
  ];

  return (
    <section id="awards" className="section section-divider">
      <div className="container-main">
        <h2>Awards & Recognition</h2>

        <div className="space-y-6">
          {awards.map((award, index) => (
            <div
              key={index}
              className="relative pl-8 pb-8 border-l-2 border-blue-200 last:pb-0 last:border-l-0"
            >
              {/* Timeline dot */}
              <div className="absolute -left-4 top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow"></div>

              {/* Content */}
              <div>
                <div className="flex flex-col md:flex-row md:items-baseline md:gap-3 mb-2">
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
                    {award.year}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-2 md:mt-0">
                    {award.title}
                  </h3>
                </div>

                <p className="text-blue-600 font-medium mb-2">{award.organization}</p>
                <p className="text-gray-700">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
