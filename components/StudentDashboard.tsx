import React, { useState, useRef } from 'react';
import { analyzeResume } from '../services/geminiService';
import { StudentProfile, Internship, CareerMatch, SuggestedCourse, Skill } from '../types';
import DashboardCard from './DashboardCard';
import CareerReadinessScore from './CareerReadinessScore';
import ProgressGraph from './ProgressGraph';

const mockInternships: Internship[] = [
    { id: 1, title: 'Frontend Developer Intern', company: 'TechCorp', location: 'Remote', stipend: '₹25,000/mo', skills: ['React', 'TypeScript', 'Tailwind CSS'] },
    { id: 2, title: 'Data Analyst Intern', company: 'DataMinds', location: 'Bhubaneswar', stipend: '₹20,000/mo', skills: ['Python', 'SQL', 'Tableau'] },
    { id: 3, title: 'Cybersecurity Intern', company: 'SecureNet', location: 'Bangalore', stipend: '₹30,000/mo', skills: ['Networking', 'Linux', 'Security Audits'] },
];

const sampleResume = `John Doe
Bhubaneswar, Odisha | johndoe@bput-student.ac.in | 9876543210

Education
B.Tech in Computer Science & Engineering | Biju Patnaik University of Technology (BPUT) | 2021-2025
- CGPA: 8.5/10

Skills
- Programming Languages: Python, JavaScript, Java
- Web Technologies: HTML, CSS, React.js, Node.js
- Databases: MySQL, MongoDB
- Tools & Platforms: Git, Docker, VS Code

Projects
Personal Portfolio Website (React.js)
- Developed a responsive personal portfolio to showcase my projects and skills.
- Implemented with React and styled using Tailwind CSS.

E-commerce Backend (Node.js, Express)
- Built a RESTful API for an e-commerce platform with user authentication and product management.
- Used MongoDB for the database.

Experience
Web Development Intern | Local Startup | Summer 2023
- Assisted in developing and maintaining the company's client-facing websites.
- Gained experience in a collaborative, agile environment.

Achievements
- Winner, BPUT Hackathon 2023
- Certified in "Python for Everybody" from Coursera

Soft Skills
- Teamwork, Problem-Solving, Effective Communication
`;

const StudentDashboard: React.FC = () => {
    const [resumeText, setResumeText] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [profile, setProfile] = useState<StudentProfile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAnalyze = async (textToAnalyze: string) => {
        if (!textToAnalyze.trim()) {
            setError('Resume content is empty.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const result = await analyzeResume(textToAnalyze);
            setProfile(result);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (file: File | null) => {
        if (!file) return;

        // For this prototype, we'll handle .txt files.
        // In a real app, you'd use a library like pdf.js or mammoth.js for PDF/DOCX
        if (file.type === 'text/plain') {
            setSelectedFile(file);
            setError(null);
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setResumeText(text);
            };
            reader.onerror = () => {
                setError('Failed to read the file.');
                setSelectedFile(null);
            };
            reader.readAsText(file);
        } else {
            setError('Please upload a .txt file. PDF/DOCX support coming soon!');
            setSelectedFile(null);
        }
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };
    
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileChange(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileChange(e.target.files[0]);
        }
    };
    
    const removeFile = () => {
        setSelectedFile(null);
        setResumeText('');
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <div className="space-y-6">
            {!profile ? (
                <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Welcome, Student!</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">Upload your resume to generate your personalized career dashboard.</p>
                    
                    <div
                        className={`mt-4 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                            isDragging ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-slate-300 dark:border-slate-600 hover:border-primary-400'
                        }`}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept=".txt,.pdf,.docx" // Accept more but handle only txt for now
                            onChange={onFileInputChange}
                        />
                         <div className="flex flex-col items-center justify-center gap-4">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-slate-400 dark:text-slate-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                             </svg>
                            {selectedFile ? (
                                <div className="text-slate-700 dark:text-slate-300 font-semibold">
                                    <p>{selectedFile.name}</p>
                                    <button onClick={(e) => { e.stopPropagation(); removeFile(); }} className="mt-2 text-sm text-red-500 hover:underline">Remove File</button>
                                </div>
                            ) : (
                                <div>
                                    <p className="font-semibold text-slate-700 dark:text-slate-300">Drag & drop your resume or <span className="text-primary-600">click to browse</span></p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">.txt files supported for this demo</p>
                                </div>
                            )}
                         </div>
                    </div>

                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => handleAnalyze(resumeText)}
                            disabled={isLoading || !selectedFile}
                            className="w-full sm:w-auto px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 order-1"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analyzing...
                                </>
                            ) : 'Build My SkillSphere'}
                        </button>
                        <button
                            onClick={() => handleAnalyze(sampleResume)}
                            disabled={isLoading}
                            className="w-full sm:w-auto px-6 py-3 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 transition order-2 sm:order-1"
                        >
                           Use Sample Resume
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Column 1 */}
                    <div className="lg:col-span-2 xl:col-span-3 space-y-6">
                        {/* Top Row Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <DashboardCard title="Personality Snapshot">
                                <p className="text-center text-slate-600 dark:text-slate-300 italic">"{profile.personalitySnapshot}"</p>
                            </DashboardCard>
                            <DashboardCard title="Top Career Matches" className="sm:col-span-2">
                                <div className="space-y-3">
                                    {profile.topCareerMatches.map((match: CareerMatch) => (
                                        <div key={match.role}>
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-semibold text-slate-700 dark:text-slate-200">{match.role}</h4>
                                                <span className="text-sm font-bold text-primary-600 dark:text-primary-500">{match.matchPercentage}%</span>
                                            </div>
                                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                                                <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: `${match.matchPercentage}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </DashboardCard>
                        </div>

                         {/* Skill Gap & Courses */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <DashboardCard title={`Skill Gaps for ${profile.topCareerMatches[0].role}`}>
                                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                                    {profile.skillGaps.map((gap: string) => <li key={gap}>{gap}</li>)}
                                </ul>
                            </DashboardCard>
                            <DashboardCard title="Suggested Courses">
                                <div className="space-y-3">
                                    {profile.suggestedCourses.map((course: SuggestedCourse) => (
                                        <div key={course.name} className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                                            <div>
                                                <p className="font-semibold">{course.name}</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">{course.platform}</p>
                                            </div>
                                            <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-300 text-sm font-semibold">Learn &rarr;</a>
                                        </div>
                                    ))}
                                </div>
                            </DashboardCard>
                        </div>

                        {/* Progress Graph */}
                        <DashboardCard title="Learning Roadmap">
                             <ProgressGraph />
                        </DashboardCard>

                        {/* Internship Matches */}
                        <DashboardCard title="Internship Matches" className="lg:col-span-2 xl:col-span-3">
                            <div className="space-y-4">
                                {mockInternships.map(internship => (
                                    <div key={internship.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <h4 className="font-bold text-lg">{internship.title}</h4>
                                            <p className="text-slate-600 dark:text-slate-400">{internship.company} - {internship.location}</p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {internship.skills.map(skill => <span key={skill} className="px-2 py-1 text-xs font-medium text-primary-800 bg-primary-100 dark:text-primary-200 dark:bg-primary-900/50 rounded-full">{skill}</span>)}
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-semibold text-green-600 dark:text-green-400">{internship.stipend}</p>
                                            <button className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-md hover:bg-primary-700 transition">Apply Now</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </DashboardCard>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <DashboardCard title="Career Readiness" className="xl:col-span-1 flex flex-col items-center justify-center">
                            <CareerReadinessScore score={profile.careerReadinessScore} />
                        </DashboardCard>
                        <DashboardCard title="Technical Skills">
                            <div className="space-y-3">
                                {profile.technicalSkills.map((skill: Skill) => (
                                    <div key={skill.name}>
                                        <p className="font-medium text-slate-700 dark:text-slate-300">{skill.name}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{skill.proficiency}</p>
                                    </div>
                                ))}
                            </div>
                        </DashboardCard>
                         <DashboardCard title="Soft Skills">
                            <div className="flex flex-wrap gap-2">
                                {profile.softSkills.map((skill: string) => (
                                    <span key={skill} className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full font-medium">{skill}</span>
                                ))}
                            </div>
                        </DashboardCard>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;