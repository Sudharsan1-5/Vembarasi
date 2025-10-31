
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- SVG ICON COMPONENTS ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

// --- DATA ---
const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Credentials', href: '#credentials' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
];

const clinicalHoursData = [
    { name: 'Med/Surg', hours: 960 },
    { name: 'Community', hours: 446 },
    { name: 'Specialized', hours: 432 },
    { name: 'Maternal/Child', hours: 384 },
    { name: 'Critical Care', hours: 96 },
];

// --- REUSABLE COMPONENTS ---
interface SectionProps {
    id: string;
    title: string;
    children: React.ReactNode;
    className?: string;
}
const Section: React.FC<SectionProps> = ({ id, title, children, className = '' }) => (
    <section id={id} className={`py-16 md:py-24 px-6 md:px-12 lg:px-24 ${className}`}>
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-12 text-center">{title}</h2>
            {children}
        </div>
    </section>
);

interface CardProps {
    children: React.ReactNode;
    className?: string;
}
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow-lg p-6 md:p-8 transition-shadow duration-300 hover:shadow-xl ${className}`}>
        {children}
    </div>
);


// --- HEADER COMPONENT ---
const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex justify-between items-center h-20">
                    <a href="#home" className="text-lg font-bold font-serif text-navy">
                        VEMBARASI K
                        <span className="hidden sm:inline"> | Registered Nurse & Midwife</span>
                    </a>
                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <a key={link.name} href={link.href} className="text-navy hover:text-teal font-medium transition-colors">{link.name}</a>
                        ))}
                         <a href="Vembarasi_K_CV.pdf" download className="bg-teal text-white px-4 py-2 rounded-md hover:bg-navy transition-colors font-semibold">Download CV</a>
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-navy">
                            {isOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white pb-4`}>
                <nav className="flex flex-col items-center space-y-4">
                    {navLinks.map(link => (
                        <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-navy hover:text-teal font-medium transition-colors">{link.name}</a>
                    ))}
                    <a href="Vembarasi_K_CV.pdf" download className="bg-teal text-white px-4 py-2 rounded-md hover:bg-navy transition-colors font-semibold">Download CV</a>
                </nav>
            </div>
        </header>
    );
};


// --- HERO SECTION ---
const Hero: React.FC = () => (
    <section id="home" className="bg-light-blue min-h-screen flex items-center justify-center pt-20">
        <div className="text-center max-w-4xl mx-auto px-6">
            <img src="https://picsum.photos/seed/nurseheadshot/200/200" alt="Vembarasi K" className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto mb-8 border-4 border-white shadow-2xl" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy leading-tight">
                Licensed Registered Nurse & Midwife
            </h1>
            <p className="text-xl md:text-2xl text-teal mt-4 font-semibold">
                4,106+ Hours of Clinical Excellence Across Medical, Surgical, Maternal Health & Critical Care Settings
            </p>
            <p className="text-md md:text-lg text-light-gray mt-6 max-w-2xl mx-auto">
                Seeking international nursing opportunities in Germany. Dual-certified RN & RM | Research-backed expertise | Community health advocate.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="Vembarasi_K_CV.pdf" download className="bg-teal text-white px-8 py-3 rounded-md text-lg font-bold hover:bg-navy transition-transform transform hover:scale-105 shadow-lg w-full sm:w-auto">Download My CV</a>
                <a href="#contact" className="bg-white text-teal border-2 border-teal px-8 py-3 rounded-md text-lg font-bold hover:bg-teal hover:text-white transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto">Get in Touch</a>
            </div>
        </div>
    </section>
);


// --- ABOUT SECTION ---
const About: React.FC = () => (
    <Section id="about" title="About Me">
        <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2 text-light-gray leading-relaxed text-lg space-y-4">
                <p>Highly dedicated and dual-licensed Registered Nurse (RN) and Registered Midwife (RM) with over 4,106 hours of supervised clinical experience across diverse healthcare settings in Tamil Nadu, India.</p>
                <p>I am a compassionate healthcare professional with a proven track record of delivering evidence-based patient care in high-volume government hospitals, specialized medical centers, and community health environments.</p>
                <p>With a research background in maternal health, I am committed to applying my skills to deliver exceptional patient care in international healthcare settings, particularly in Germany.</p>
            </div>
            <Card className="bg-light-blue">
                <h3 className="text-2xl font-bold font-serif text-navy mb-4 text-center">Key Metrics</h3>
                <ul className="space-y-3 text-navy font-semibold text-center">
                    <li>4,106+ Clinical Hours</li>
                    <li>86 Weeks of Supervised Training</li>
                    <li>7 Healthcare Institutions</li>
                    <li>8+ Clinical Specialties</li>
                    <li>1,104-Hour Dedicated Internship</li>
                </ul>
            </Card>
        </div>
    </Section>
);

// --- CREDENTIALS SECTION ---
const Credentials: React.FC = () => (
    <Section id="credentials" title="Professional Credentials" className="bg-light-blue">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
                <h3 className="font-bold text-xl text-navy mb-2">REGISTERED NURSE (RN)</h3>
                <p className="text-light-gray">Reg No: 250316</p>
                <p className="text-light-gray">Issued by: TNNMC</p>
                <div className="mt-2 text-accent-green font-semibold flex items-center">
                    <CheckIcon className="w-5 h-5 mr-2"/> Active & Licensed
                </div>
            </Card>
            <Card>
                <h3 className="font-bold text-xl text-navy mb-2">REGISTERED MIDWIFE (RM)</h3>
                <p className="text-light-gray">Reg No: 250316</p>
                <p className="text-light-gray">Issued by: TNNMC</p>
                <div className="mt-2 text-accent-green font-semibold flex items-center">
                    <CheckIcon className="w-5 h-5 mr-2"/> Active & Licensed
                </div>
            </Card>
            <Card>
                <h3 className="font-bold text-xl text-navy mb-2">B.Sc. NURSING</h3>
                <p className="text-light-gray">The Tamil Nadu Dr. M.G.R. Medical University</p>
                 <p className="text-light-gray">Graduation: Feb 22, 2022</p>
            </Card>
            <Card>
                <h3 className="font-bold text-xl text-navy mb-2">Basic Life Support (BLS)</h3>
                <p className="text-light-gray">Apollo Hospitals Training Division</p>
            </Card>
             <Card>
                <h3 className="font-bold text-xl text-navy mb-2">Infection Control Program</h3>
                <p className="text-light-gray">Apollo Main Hospital</p>
            </Card>
             <Card>
                <h3 className="font-bold text-xl text-navy mb-2">Personal Details</h3>
                <p className="text-light-gray">Date of Birth: Oct 18, 2000</p>
                <p className="text-light-gray">Age: 24 years</p>
            </Card>
        </div>
    </Section>
);

// --- SKILLS SECTION ---
const Skills: React.FC = () => {
    const clinicalSkills = ["Acute & Critical Care", "IV Therapy", "Wound Care", "Vital Sign Monitoring", "Medication Administration", "Labor & Delivery Support", "Neonatal Assessment", "CPR & Emergency Stabilization"];
    const professionalSkills = ["Patient Safety", "EHR Documentation", "Team Collaboration", "Leadership & Mentorship", "Adaptability", "Compassionate Communication", "Evidence-Based Practice", "Critical Thinking"];

    return (
        <Section id="skills" title="Clinical Expertise & Skills">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 className="text-2xl font-bold font-serif text-navy mb-4">Clinical Hours Distribution</h3>
                    <div style={{ width: '100%', height: 400 }}>
                        <ResponsiveContainer>
                            <BarChart data={clinicalHoursData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" width={100} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="hours" fill="#0D7A8C" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div>
                     <h3 className="text-2xl font-bold font-serif text-navy mb-4">Core Competencies</h3>
                     <div className="mb-6">
                        <h4 className="font-semibold text-lg text-teal mb-3">Clinical Skills</h4>
                        <div className="flex flex-wrap gap-2">
                           {clinicalSkills.map(skill => <span key={skill} className="bg-teal text-white px-3 py-1 rounded-full text-sm">{skill}</span>)}
                        </div>
                     </div>
                      <div>
                        <h4 className="font-semibold text-lg text-navy mb-3">Professional Skills</h4>
                        <div className="flex flex-wrap gap-2">
                           {professionalSkills.map(skill => <span key={skill} className="bg-navy text-white px-3 py-1 rounded-full text-sm">{skill}</span>)}
                        </div>
                     </div>
                </div>
            </div>
        </Section>
    );
};

// --- EXPERIENCE SECTION ---
const Experience: React.FC = () => (
    <Section id="experience" title="Healthcare Experience" className="bg-light-blue">
        <div className="space-y-12">
            <Card>
                <h3 className="text-2xl font-bold font-serif text-teal">STAFF NURSE (Registered Nurse)</h3>
                <p className="font-semibold text-navy text-lg">Apollo Main Hospital, Chennai | Aug 2022 - Sep 2024</p>
                <p className="text-light-gray">Multi-Specialty Unit | 550-Bed Tertiary Care Hospital</p>
                <ul className="mt-4 space-y-2 list-disc list-inside text-light-gray">
                    <li>Delivered comprehensive care to critically ill adult patients.</li>
                    <li>Managed patients with complex multi-system disorders, maintaining a zero-medication-error record.</li>
                    <li>Ensured strict infection control compliance and assisted physicians during emergencies.</li>
                    <li>Administered IV therapies and complex drug regimens.</li>
                </ul>
            </Card>
            <div>
                <h3 className="text-2xl font-bold font-serif text-navy mb-6 text-center">Clinical Exposure Across 7 Institutions</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {["MAHATMA GANDHI MEMORIAL GOVT. HOSPITAL (1,838 beds)", "RAILWAY HOSPITAL (300 beds)", "ATHMA PSYCHIATRIC HOSPITAL", "SHANTHIVANAM REHABILITATION CENTER", "ASHADEEPAM SPECIAL SCHOOL", "JANET NURSING HOME", "MCH CENTRE, MILAGUPARAI"].map(inst => (
                        <div key={inst} className="bg-white p-4 rounded-lg shadow-md text-center">
                            <p className="font-semibold text-navy">{inst}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </Section>
);

// --- WHY ME SECTION ---
const WhyMe: React.FC = () => {
    const strengths = [
        "4,106 Clinical Hours", "Dual RN & RM Certification", "High-Volume Hospital Experience",
        "7 Diverse Healthcare Settings", "Research-Backed Expertise", "8+ Clinical Specialty Areas",
        "Community Health Expertise", "23-Week Intensive Internship", "National-Level Exposure",
        "Multilingual Communication", "Proven Track Record", "Commitment to Continuous Learning"
    ];
    return(
    <Section id="why-me" title="Why Choose Vembarasi?">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {strengths.map(strength => (
                <div key={strength} className="flex items-start space-x-3 p-4">
                    <CheckIcon className="w-8 h-8 text-accent-green flex-shrink-0 mt-1" />
                    <p className="font-semibold text-navy">{strength}</p>
                </div>
            ))}
        </div>
    </Section>
    )
};


// --- CONTACT SECTION ---
const Contact: React.FC = () => (
    <Section id="contact" title="Get in Touch" className="bg-light-blue">
        <div className="max-w-3xl mx-auto text-center">
             <p className="text-lg text-light-gray mb-8">
                I am actively seeking nursing opportunities in Germany and other international healthcare settings. I am excited to discuss how my clinical expertise and dedication can contribute to your healthcare team.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="text-left">
                     <h3 className="font-bold text-xl text-navy mb-2">Contact Information</h3>
                     <p className="text-light-gray">📧 vembarasik2000@gmail.com</p>
                     <p className="text-light-gray">📞 +91 99407 11866</p>
                     <p className="text-light-gray">📍 Trichy, Tamil Nadu, India</p>
                </Card>
                 <Card className="flex flex-col justify-center items-center">
                    <h3 className="font-bold text-xl text-navy mb-2">Download My Resume</h3>
                    <a href="Vembarasi_K_CV.pdf" download className="mt-2 bg-teal text-white px-6 py-2 rounded-md font-bold hover:bg-navy transition-colors">Download CV</a>
                </Card>
            </div>
            <Card>
                <form className="space-y-4 text-left">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-navy font-semibold mb-1">Name</label>
                            <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-navy font-semibold mb-1">Email</label>
                            <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-navy font-semibold mb-1">Subject</label>
                        <input type="text" id="subject" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-navy font-semibold mb-1">Message</label>
                        <textarea id="message" rows={4} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-teal text-white p-3 rounded-md font-bold text-lg hover:bg-navy transition-colors">Send Message</button>
                </form>
            </Card>
        </div>
    </Section>
);

// --- FOOTER SECTION ---
const Footer: React.FC = () => (
    <footer className="bg-navy text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
            <p className="font-serif text-xl mb-2">Vembarasi K - Registered Nurse & Midwife</p>
            <p className="text-sm text-gray-400 mb-4">© {new Date().getFullYear()} All Rights Reserved | Available for International Positions</p>
            <p className="text-sm text-gray-300">Contact: vembarasik2000@gmail.com | +91 99407 11866</p>
        </div>
    </footer>
);


// --- MAIN APP COMPONENT ---
export default function App() {
  return (
    <div className="font-sans bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Credentials />
        <Skills />
        <Experience />
        <WhyMe />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
