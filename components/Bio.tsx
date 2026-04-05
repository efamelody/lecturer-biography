export default function Bio() {
  return (
    <section id="bio" className="section section-divider">
      <div className="container-main">
        <h2>Biography</h2>
        
        <div className="space-y-6 text-gray-700">
          <p>
            Prof. Your Name is a distinguished academic with a passion for advancing the frontiers of
            computer science and technology. Holding a Ph.D. in Computer Science from a top-ranked
            institution, he has established himself as a thought leader in his field.
          </p>

          <p>
            With a career spanning over 15 years, Prof. Name has authored numerous peer-reviewed
            publications, successfully supervised more than 30 graduate and undergraduate research projects,
            and delivered keynote addresses at international conferences. His research interests primarily
            focus on artificial intelligence, machine learning applications, and sustainable computing practices.
          </p>

          <p>
            Beyond research, he is deeply committed to education and mentorship. He has developed innovative
            curricula, established collaborative programs with international universities, and received multiple
            teaching excellence awards. His approachable teaching style and dedication to student success have
            earned him recognition from both peers and students alike.
          </p>

          <p>
            Prof. Name is an active member of several professional organizations and serves on editorial boards
            of leading academic journals. He regularly reviews manuscripts, conference submissions, and grant
            proposals, contributing to the scholarly community's quality assurance and advancement.
          </p>

          <h3 className="pt-6">Education</h3>
          <ul className="space-y-3">
            <li className="flex">
              <span className="font-semibold min-w-[120px] text-gray-900">Ph.D. (2008):</span>
              <span>Computer Science, University of Cambridge, UK</span>
            </li>
            <li className="flex">
              <span className="font-semibold min-w-[120px] text-gray-900">M.Sc. (2005):</span>
              <span>Artificial Intelligence, University of Edinburgh, UK</span>
            </li>
            <li className="flex">
              <span className="font-semibold min-w-[120px] text-gray-900">B.Sc. (2003):</span>
              <span>Computer Science, Universiti Kebangsaan Malaysia</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
