
export interface Skill {
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface CareerMatch {
  role: string;
  description: string;
  matchPercentage: number;
}

export interface SuggestedCourse {
  name: string;
  platform: string;
  url: string;
}

export interface Internship {
    id: number;
    title: string;
    company: string;
    location: string;
    stipend: string;
    skills: string[];
}

export interface StudentProfile {
  technicalSkills: Skill[];
  softSkills: string[];
  personalitySnapshot: string;
  careerReadinessScore: number;
  topCareerMatches: CareerMatch[];
  skillGaps: string[];
  suggestedCourses: SuggestedCourse[];
}
