// ============================================================================
//  ALL PORTFOLIO CONTENT LIVES HERE. Edit this file; no component changes needed.
//  Search for "TODO" to find the links you still need to fill in.
// ============================================================================

export const profile = {
  name: 'Kowsick Karthik',
  initials: 'KK',
  email: 'kowsickkarthik007@gmail.com',
  phone: '+91 8667662352',
  location: 'Chennai, India',
  photo: `${import.meta.env.BASE_URL}images/1000012069.jpg`,
  resume: `${import.meta.env.BASE_URL}resume.pdf`,
  available: 'Available for internships & full-time roles',
  intro:
    'Passionate about building modern web applications, exploring new technologies, and solving real-world problems through clean, efficient, and scalable code.',
  roles: [
    'Software Developer',
    'Full Stack Developer',
    'Java & Spring Boot Developer',
    'AI/ML Enthusiast',
    'Published Researcher (IEEE)',
  ],
  heroSkills: ['React.js', 'Node.js', 'Java', 'Python', 'SAP ABAP', 'MySQL', 'Tailwind CSS', 'GitHub'],
  socials: [
    { key: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/kowsick-k0710/' },
    { key: 'github', label: 'GitHub', url: 'https://github.com/kowsick10' },
    { key: 'leetcode', label: 'LeetCode', url: 'https://leetcode.com/u/Kowsick_07/' },
    { key: 'email', label: 'Email', url: 'mailto:kowsickkarthik007@gmail.com' },
  ],
}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  bio: [
    'I am a Computer Science graduate of Chennai Institute of Technology who enjoys turning ideas into working products. I build full-stack web and mobile apps with Java, Spring Boot, React, Flutter and React Native, and I work with LLMs to make software that understands people.',
    'My research on secure, explainable credit scoring with federated learning was accepted at an IEEE-sponsored conference. Outside class I solve algorithm problems, compete in CTFs and help run campus tech events.',
  ],
  education: {
    school: 'Chennai Institute of Technology',
    degree: 'B.E. Computer Science and Engineering',
    period: '2022 – 2026',
    score: 'CGPA 8.51 / 10',
  },
  stats: [
    { value: 840, suffix: '+', label: 'LeetCode problems solved' },
    { value: 1882, suffix: '', label: 'LeetCode rating (Knight)' },
    { value: 500, suffix: '+', label: 'SkillRack problems' },
    { value: 1, suffix: '', label: 'IEEE paper' },
    { value: 4, suffix: '+', label: 'Internships' },
  ],
}

export const experience = [
  {
    role: 'Java Developer',
    company: 'Nexzware Technology',
    period: 'Sep 2026 – Present',
    place: 'Chennai · On-site',
    current: true,
    points: [
      'Building mobile and web features with Flutter, React Native and Spring Boot, secured with JWT auth and backed by REST APIs and PostgreSQL.',
      'Integrating Razorpay payments into mobile and web flows.',
      'Working on ParkShare and a fitness trainer mobile app, plus website development.',
    ],
    tags: ['Flutter', 'React Native', 'Spring Boot', 'JWT', 'REST APIs', 'PostgreSQL', 'Razorpay'],
  },
  {
    role: 'Campus Ambassador',
    company: 'DNYX',
    period: 'Jun 2024 – Apr 2026',
    place: 'Remote',
    points: ['Represented DNYX on campus and connected students with its programs and opportunities.'],
    tags: ['Community', 'Outreach'],
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'KaizenSpark Tech Solutions',
    period: 'Jan 2025 – Mar 2025',
    place: 'Internship',
    points: [
      'Built 3 production-ready web apps with React, Node.js and PostgreSQL.',
      'Raised user satisfaction by 35% and cut load times by 40% through query and backend optimisation.',
      'Delivered reusable React component libraries that reduced future development effort by 25%.',
    ],
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    role: 'Web Developer Intern',
    company: 'KarthiKesh Robotics Pvt Ltd',
    period: 'May 2024 – Jun 2024',
    place: 'Remote',
    points: ['Worked on web development tasks as a remote intern.'], // TODO: add 1-2 specifics
    tags: ['Web Development'],
  },
  {
    role: 'Network Specialist Intern',
    company: 'Cisco Networking Academy',
    period: 'Dec 2022 – Dec 2023',
    place: 'Virtual',
    points: ['Designed and simulated networks in Packet Tracer covering routing and switching, LAN/WAN and traffic analysis.'],
    tags: ['Packet Tracer', 'Routing & Switching', 'LAN/WAN', 'Traffic analysis'],
  },
]

// categories: any of 'Full-Stack' | 'Mobile' | 'AI' | 'Data'
// TODO: replace github/live with each project's real repo/deploy link (leave live: '' to hide that button)
export const projects = [
  {
    title: 'AI Resume Analyzer',
    icon: 'resume',
    categories: ['AI', 'Full-Stack'],
    summary: 'Scores resumes against ATS rules and job descriptions, then coaches the candidate with LLM-written feedback.',
    highlights: [
      'ATS scoring and job-description matching with 90%+ semantic match accuracy',
      'Missing-skill detection using Sentence Transformers embeddings and ChromaDB',
      'LLM-generated improvement tips, interview questions and cover letters',
    ],
    stack: ['ReactJS', 'FastAPI', 'Python', 'LLM', 'ChromaDB', 'Sentence Transformers'],
    github: 'https://github.com/kowsick10',
    live: '',
  },
  {
    title: 'Fitness Trainer Mobile App',
    icon: 'fitness',
    categories: ['Mobile', 'Full-Stack'],
    summary: 'A mobile app where clients find trainers, book sessions, set goals and track progress.',
    highlights: [
      'Trainer profiles, appointment bookings, fitness goals and progress tracking',
      'Spring Boot REST APIs with PostgreSQL and JWT authentication',
      'Razorpay payment integration',
    ],
    stack: ['React Native', 'Spring Boot', 'PostgreSQL', 'JWT', 'Razorpay'],
    github: 'https://github.com/kowsick10',
    live: '',
  },
  {
    title: 'ParkShare',
    icon: 'parking',
    categories: ['Mobile', 'Full-Stack'],
    summary: 'A parking management app for finding spaces, checking availability and booking in a few taps.',
    highlights: [
      'Parking space discovery, live availability and booking workflow',
      'Spring Boot services with PostgreSQL behind clean REST APIs',
    ],
    stack: ['Flutter', 'Spring Boot', 'PostgreSQL', 'REST APIs'],
    github: 'https://github.com/kowsick10',
    live: '',
  },
  {
    title: 'Invoicing ROI Simulator',
    icon: 'roi',
    categories: ['Full-Stack'],
    summary: 'Shows how much invoicing automation saves, with live calculations and scenario analysis.',
    highlights: [
      'Real-time calculations, scenario comparison and interactive charts',
      'PDF report export and MongoDB persistence',
    ],
    stack: ['React (Vite)', 'Node.js', 'Express', 'MongoDB', 'Recharts', 'jsPDF'],
    github: 'https://github.com/kowsick10',
    live: '',
  },
  {
    title: 'Code Runner Web App',
    icon: 'code',
    categories: ['Full-Stack'],
    summary: 'A multi-language online editor that runs code safely inside sandboxed containers.',
    highlights: [
      'Real-time syntax highlighting with react-ace',
      'Go (Gin) backend executing code in a sandbox, fully Dockerised',
      'File import/export and LocalStorage autosave',
    ],
    stack: ['React', 'Vite', 'Tailwind', 'react-ace', 'Go (Gin)', 'Docker'],
    github: 'https://github.com/kowsick10',
    live: '',
  },
  {
    title: 'LeetCode & CodeChef Dashboard',
    icon: 'chart',
    categories: ['Data'],
    summary: 'A Power BI dashboard that turns contest and practice data into performance insights.',
    highlights: [
      'Cleaned and merged CSV exports from LeetCode and CodeChef',
      'Tracks problems solved, contest ratings and ranking trends for individuals and groups',
    ],
    stack: ['Power BI', 'CSV', 'Data Processing'],
    github: 'https://github.com/kowsick10',
    live: '',
  },
]

export const projectFilters = ['All', 'Full-Stack', 'Mobile', 'AI', 'Data']

export const publication = {
  title: 'Secure and Interpretable Credit Scoring with Federated AI',
  venue: 'IEEE Conference Proceedings',
  event: 'ICICI 2026 · 4th International Conference on Inventive Computing and Informatics',
  place: 'Bengaluru, India',
  date: 'Jun 2026',
  summary:
    'A privacy-preserving credit scoring framework that trains across institutions with federated learning and explains each decision with SHAP.',
  topics: ['Federated Learning', 'SHAP / Explainable AI', 'Privacy-Preserving ML', 'Fairness in FinTech'],
  authors: [
    'Kowsick K',
    'Jebaraj Ratnakumar A',
    'Muthupandi G',
    'Deebak GR',
    'Dr. Pavithra Sankarappan',
    'Bhavani Ramesh',
  ],
  url: 'https://ieeexplore.ieee.org/', // TODO: replace with the direct IEEE Xplore link to your paper
}

export const skills = [
  { group: 'Programming Languages', icon: 'languages', items: ['Python', 'Java', 'JavaScript', 'Dart', 'SQL'] },
  { group: 'Frontend', icon: 'frontend', items: ['React.js', 'React Native', 'Flutter', 'HTML/CSS', 'Tailwind', 'Bootstrap'] },
  { group: 'Backend', icon: 'backend', items: ['Spring Boot', 'Node.js', 'Express.js', 'FastAPI', 'Go / Gin'] },
  { group: 'SAP', icon: 'languages', items: ['SAP ABAP'] },
  { group: 'Databases', icon: 'database', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'ChromaDB'] },
  { group: 'AI & Data', icon: 'ai', items: ['LLM', 'RAG', 'NumPy', 'Pandas', 'Matplotlib', 'Power BI', 'Streamlit'] },
  { group: 'Tools', icon: 'tools', items: ['Git/GitHub', 'Docker', 'Selenium', 'Figma', 'Canva', 'Razorpay', 'AWS Cloud'] },
]

// TODO: add your CodeChef / SkillRack profile URLs (button hides when url is empty)
export const competitive = [
  {
    platform: 'LeetCode',
    badge: 'Knight',
    big: '1882',
    bigLabel: 'contest rating',
    rows: [
      ['Problems solved', '840+'],
      ['Global ranking', 'Top 4.81%'],
      ['Highest rank', '41,542'],
    ],
    url: 'https://leetcode.com/u/Kowsick_07/',
  },
  {
    platform: 'CodeChef',
    badge: '2-Star',
    big: '1432',
    bigLabel: 'highest rating',
    rows: [
      ['Division', 'Division 3'],
      ['Status', '2-Star'],
    ],
    url: '',
  },
  {
    platform: 'SkillRack',
    badge: 'DSA',
    big: '500+',
    bigLabel: 'DSA problems',
    rows: [
      ['Contests', '50+'],
      ['Focus', 'Data structures & algorithms'],
    ],
    url: '',
  },
]

export const achievements = [
  { icon: 'trophy', title: 'EDII National Startup Hackathon', tag: 'Finalist', text: 'Finalist at the national-level event by the Entrepreneurship Development Institute of India.' },
  { icon: 'flag', title: 'Pentathon 2025', tag: 'Rank 240', text: 'Scored 1761 points in a global capture-the-flag competition.' },
  { icon: 'users', title: 'Hackerz Symposium', tag: 'Coordinator, 2023–24', text: 'Coordinated technical and non-technical events.' },
  { icon: 'crowd', title: 'Takshashila Techno-Cultural Fest', tag: 'Crowd operations', text: 'Led crowd operations for 300+ participants and kept the event running smoothly.' },
]

export const certifications = [
  { name: 'Oracle Foundations Associate', issuer: 'Oracle', url: 'https://lnkd.in/geD7xk6q' },
  { name: 'AI Foundations Associate', issuer: 'Oracle', url: 'https://lnkd.in/gscS4rGr' },
  { name: 'Generative AI Professional', issuer: 'Oracle', url: 'https://lnkd.in/gZqSbCiW' },
  { name: 'Introduction to Internet of Things', issuer: 'Cisco', url: 'https://lnkd.in/p/gvGj5PSg' },
  { name: 'CCNA: Introduction to Networks', issuer: 'Cisco', url: 'https://lnkd.in/p/gmegvAjt' },
  { name: 'Networking Cybersecurity', issuer: 'Palo Alto Networks', url: 'https://lnkd.in/p/gNUMwfxx' },
  { name: 'SAP ABAP Cloud Developer', issuer: 'SAP', url: 'https://lnkd.in/gtWUpgti' },
  { name: 'SAP Generative AI Developer', issuer: 'SAP', url: 'https://lnkd.in/gfXekCmg' },
  { name: 'SQL AI Developer Associate', issuer: 'Microsoft', url: 'https://lnkd.in/gGtG9EGf' },
  { name: 'Data Science with Python', issuer: 'IBM · Coursera' },
  { name: 'Claude Code in Action', issuer: 'Anthropic', url: 'https://lnkd.in/g527d5aW' },
]

export const workshops = [
  { name: 'AI Powered Full Stack Developer Workshop', issuer: 'Workshop', url: 'https://lnkd.in/p/gzSWZ8kh' },
  { name: 'Cybersecurity Workshop', issuer: 'Workshop', url: 'https://lnkd.in/p/gucNNiKP' },
]

export const researchCertificate = {
  name: 'Research Paper Certificate',
  issuer: 'Research',
  url: 'https://lnkd.in/p/g9C9wzcr',
}
