
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
    <section id={id} className={`py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24 ${className}`}>
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy mb-12 text-center">{title}</h2>
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

// --- DOWNLOAD BUTTON COMPONENT ---
interface DownloadButtonProps {
    className?: string;
    children: React.ReactNode;
}
const DownloadButton: React.FC<DownloadButtonProps> = ({ className, children }) => {
    const [status, setStatus] = useState<'idle' | 'success'>('idle');

    const handleClick = () => {
        setStatus('success');
        setTimeout(() => {
            setStatus('idle');
        }, 2500); // Show success message for 2.5 seconds
    };

    const successContent = (
        <>
            <CheckIcon className="w-5 h-5 mr-2" />
            Downloaded!
        </>
    );

    return (
        <a 
            href="Vembarasi_K_CV.pdf" 
            download 
            onClick={handleClick}
            className={`${className} flex items-center justify-center transition-all duration-300 ${status === 'success' ? 'bg-accent-green' : ''}`}
        >
            {status === 'success' ? successContent : children}
        </a>
    );
};


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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                <div className="flex justify-between items-center h-20">
                    <a href="#home" className="text-lg font-bold font-serif text-navy shrink-0">
                        VEMBARASI K
                        <span className="hidden sm:inline"> | RN & RM</span>
                    </a>
                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <a key={link.name} href={link.href} className="text-navy hover:text-teal font-medium transition-colors">{link.name}</a>
                        ))}
                         <DownloadButton className="bg-teal text-white px-4 py-2 rounded-md hover:bg-navy font-semibold">
                           Download CV
                        </DownloadButton>
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
                <nav className="flex flex-col items-center space-y-4 pt-2">
                    {navLinks.map(link => (
                        <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-navy hover:text-teal font-medium transition-colors text-lg py-1">{link.name}</a>
                    ))}
                    <DownloadButton className="bg-teal text-white px-6 py-2 rounded-md hover:bg-navy font-semibold w-48 mt-2">
                        Download CV
                    </DownloadButton>
                </nav>
            </div>
        </header>
    );
};


// --- HERO SECTION ---
const Hero: React.FC = () => (
    <section id="home" className="bg-light-blue min-h-screen flex items-center justify-center pt-24 pb-12">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6">
            <img src="https://picsum.photos/seed/nurseheadshot/200/200" alt="Vembarasi K" className="w-36 h-36 md:w-48 md:h-48 rounded-full mx-auto mb-6 border-4 border-white shadow-2xl" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-navy leading-tight">
                Licensed Registered Nurse & Midwife
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-teal mt-4 font-semibold">
                4,106+ Hours of Clinical Excellence
            </p>
            <p className="text-base sm:text-lg text-light-gray mt-6 max-w-2xl mx-auto">
                Seeking international nursing opportunities in Germany. Dual-certified RN & RM | Research-backed expertise | Community health advocate.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                 <DownloadButton className="bg-teal text-white px-8 py-3 rounded-md text-lg font-bold hover:bg-navy transition-transform transform hover:scale-105 shadow-lg w-full sm:w-auto">
                    Download My CV
                 </DownloadButton>
                <a href="#contact" className="bg-white text-teal border-2 border-teal px-8 py-3 rounded-md text-lg font-bold hover:bg-teal hover:text-white transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto">Get in Touch</a>
            </div>
        </div>
    </section>
);


// --- ABOUT SECTION ---
const About: React.FC = () => (
    <Section id="about" title="About Me">
        <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2 text-light-gray leading-relaxed text-base sm:text-lg space-y-4">
                <p>Highly dedicated and dual-licensed Registered Nurse (RN) and Registered Midwife (RM) with over 4,106 hours of supervised clinical experience across diverse healthcare settings in Tamil Nadu, India.</p>
                <p>I am a compassionate healthcare professional with a proven track record of delivering evidence-based patient care in high-volume government hospitals, specialized medical centers, and community health environments.</p>
                <p>With a research background in maternal health, I am committed to applying my skills to deliver exceptional patient care in international healthcare settings, particularly in Germany.</p>
            </div>
            <Card className="bg-light-blue">
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-navy mb-4 text-center">Key Metrics</h3>
                <ul className="space-y-3 text-navy font-semibold text-center text-base sm:text-lg">
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 text-center sm:text-left">
            <Card>
                <h3 className="font-bold text-base sm:text-lg text-navy mb-1">REGISTERED NURSE (RN)</h3>
                <p className="text-light-gray text-sm">Reg No: 250316</p>
                <div className="mt-2 text-accent-green font-semibold flex items-center justify-center sm:justify-start text-sm">
                    <CheckIcon className="w-4 h-4 mr-1 sm:mr-2"/> Active
                </div>
            </Card>
            <Card>
                <h3 className="font-bold text-base sm:text-lg text-navy mb-1">REGISTERED MIDWIFE (RM)</h3>
                <p className="text-light-gray text-sm">Reg No: 250316</p>
                <div className="mt-2 text-accent-green font-semibold flex items-center justify-center sm:justify-start text-sm">
                    <CheckIcon className="w-4 h-4 mr-1 sm:mr-2"/> Active
                </div>
            </Card>
            <Card>
                <h3 className="font-bold text-base sm:text-lg text-navy mb-1">B.Sc. NURSING</h3>
                <p className="text-light-gray text-sm leading-snug">The Tamil Nadu Dr. M.G.R. Medical University</p>
            </Card>
            <Card>
                <h3 className="font-bold text-base sm:text-lg text-navy mb-1">Basic Life Support (BLS)</h3>
                <p className="text-light-gray text-sm">Apollo Hospitals</p>
            </Card>
             <Card>
                <h3 className="font-bold text-base sm:text-lg text-navy mb-1">Infection Control</h3>
                <p className="text-light-gray text-sm">Apollo Main Hospital</p>
            </Card>
             <Card>
                <h3 className="font-bold text-base sm:text-lg text-navy mb-1">Personal Details</h3>
                <p className="text-light-gray text-sm">DOB: Oct 18, 2000</p>
                 <p className="text-light-gray text-sm">Age: 24 years</p>
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
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <BarChart data={clinicalHoursData} layout="vertical" margin={{ top: 5, right: 20, left: 25, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="hours" fill="#0D7A8C" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div>
                     <h3 className="text-2xl font-bold font-serif text-navy mb-6">Core Competencies</h3>
                     <div className="mb-6">
                        <h4 className="font-semibold text-lg text-teal mb-3">Clinical Skills</h4>
                        <div className="flex flex-wrap gap-2">
                           {clinicalSkills.map(skill => <span key={skill} className="bg-teal text-white px-3 py-1 rounded-full text-sm font-medium">{skill}</span>)}
                        </div>
                     </div>
                      <div>
                        <h4 className="font-semibold text-lg text-navy mb-3">Professional Skills</h4>
                        <div className="flex flex-wrap gap-2">
                           {professionalSkills.map(skill => <span key={skill} className="bg-navy text-white px-3 py-1 rounded-full text-sm font-medium">{skill}</span>)}
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
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-teal">STAFF NURSE (Registered Nurse)</h3>
                <p className="font-semibold text-navy text-base sm:text-lg">Apollo Main Hospital, Chennai | Aug 2022 - Sep 2024</p>
                <p className="text-light-gray text-sm sm:text-base">Multi-Specialty Unit | 550-Bed Tertiary Care Hospital</p>
                <ul className="mt-4 space-y-2 list-disc list-inside text-light-gray text-sm sm:text-base">
                    <li>Delivered comprehensive care to critically ill adult patients.</li>
                    <li>Managed patients with complex multi-system disorders, maintaining a zero-medication-error record.</li>
                    <li>Ensured strict infection control compliance and assisted physicians during emergencies.</li>
                    <li>Administered IV therapies and complex drug regimens.</li>
                </ul>
            </Card>
            <div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-navy mb-6 text-center">Clinical Exposure Across 7 Institutions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                    {["M.G.M. GOVT. HOSPITAL (1,838 beds)", "RAILWAY HOSPITAL (300 beds)", "ATHMA PSYCHIATRIC HOSPITAL", "SHANTHIVANAM REHAB CENTER", "ASHADEEPAM SPECIAL SCHOOL", "JANET NURSING HOME", "MCH CENTRE, MILAGUPARAI"].map(inst => (
                        <div key={inst} className="bg-white p-3 sm:p-4 rounded-lg shadow-md text-center flex items-center justify-center">
                            <p className="font-semibold text-navy text-sm sm:text-base leading-tight">{inst}</p>
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
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
            {strengths.map(strength => (
                <div key={strength} className="flex items-start space-x-3">
                    <CheckIcon className="w-7 h-7 text-accent-green flex-shrink-0 mt-0.5" />
                    <p className="font-semibold text-navy text-sm sm:text-base">{strength}</p>
                </div>
            ))}
        </div>
    </Section>
    )
};


// --- CONTACT SECTION ---
const Contact: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const response = await fetch('https://formspree.io/f/xeopodle', {
                method: 'POST',
                body: new FormData(e.target as HTMLFormElement),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset(); // Clear form on success
            } else {
                const data = await response.json();
                if (data.errors) {
                    setErrorMessage(data.errors.map((error: any) => error.message).join(', '));
                } else {
                    setErrorMessage('Oops! Something went wrong. Please try again.');
                }
                setStatus('error');
            }
        } catch (error) {
            setErrorMessage('Network error. Please check your connection and try again.');
            setStatus('error');
        }
    };


    return (
        <Section id="contact" title="Get in Touch" className="bg-light-blue">
            <div className="max-w-3xl mx-auto text-center">
                 <p className="text-base sm:text-lg text-light-gray mb-8">
                    I am actively seeking nursing opportunities in Germany and other international healthcare settings. I am excited to discuss how my clinical expertise and dedication can contribute to your healthcare team.
                </p>
                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                    <Card className="text-left">
                         <h3 className="font-bold text-lg text-navy mb-2">Contact Information</h3>
                         <p className="text-light-gray text-sm break-all">📧 vembarasi18@gmail.com</p>
                         <p className="text-light-gray text-sm">📞 +91 9600940871</p>
                         <p className="text-light-gray text-sm">📍 Trichy, Tamil Nadu, India</p>
                    </Card>
                     <Card className="flex flex-col justify-center items-center">
                        <h3 className="font-bold text-lg text-navy mb-3">Download My Resume</h3>
                        <DownloadButton className="bg-teal text-white px-6 py-2 rounded-md font-bold hover:bg-navy w-48">
                            Download CV
                        </DownloadButton>
                    </Card>
                </div>
                <Card>
                     <h3 className="font-bold text-xl text-navy mb-6 text-center">Send me a message</h3>
                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-navy font-semibold mb-1">Name</label>
                                <input type="text" name="name" id="name" required placeholder="Your Name" className="w-full p-2.5 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-teal focus:border-teal placeholder-gray-400" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-navy font-semibold mb-1">Email</label>
                                <input type="email" name="email" id="email" required placeholder="Your Email" className="w-full p-2.5 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-teal focus:border-teal placeholder-gray-400" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-navy font-semibold mb-1">Subject</label>
                            <input type="text" name="subject" id="subject" required placeholder="Message Subject" className="w-full p-2.5 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-teal focus:border-teal placeholder-gray-400" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-navy font-semibold mb-1">Message</label>
                            <textarea id="message" name="message" required rows={4} placeholder="Your Message" className="w-full p-2.5 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-teal focus:border-teal placeholder-gray-400"></textarea>
                        </div>
                        
                        {status === 'success' && <p className="text-center font-semibold text-accent-green">Thank you! Your message has been sent successfully.</p>}
                        {status === 'error' && <p className="text-center font-semibold text-red-500">{errorMessage}</p>}

                        <button type="submit" disabled={status === 'submitting'} className="w-full bg-teal text-white p-3 rounded-md font-bold text-lg hover:bg-navy transition-colors disabled:bg-light-gray disabled:cursor-wait">
                            {status === 'submitting' ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </Card>
            </div>
        </Section>
    );
};

// --- FOOTER SECTION ---
const Footer: React.FC = () => (
    <footer className="bg-navy text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
            <p className="font-serif text-xl mb-2">Vembarasi K - Registered Nurse & Midwife</p>
            <p className="text-sm text-gray-400 mb-4">© {new Date().getFullYear()} All Rights Reserved | Available for International Positions</p>
            <p className="text-sm text-gray-300">Contact: vembarasi18@gmail.com | +91 9600940871</p>
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
