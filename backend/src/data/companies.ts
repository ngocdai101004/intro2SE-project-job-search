import { ObjectId } from "mongodb";

export const companies = [
  {
    _id: new ObjectId(),
    owner_id: new ObjectId(),
    admin_id: [new ObjectId()],
    company_name: "TechVibes Inc.",
    sumRating: 14,
    followers: [new ObjectId(), new ObjectId(), new ObjectId()],
    address: {
      district: "District 1",
      city_state: "San Francisco, CA",
      zip_code: "94103",
      country: "USA",
    },
    description: {
      company_size: [50, 200],
      industry: "Information Technology",
      headquarters: "San Francisco, CA",
      links: ["https://techvibes.com", "https://linkedin.com/techvibes"],
      founded: new Date("2010-05-15"),
      specialities: ["Software Development", "Cloud Computing", "AI Solutions"],
    },
    short_description: "A leader in innovative tech solutions.",
    jobs: [
      {
        id: new ObjectId(),
        title: "Software Engineer",
        location: "San Francisco, CA",
        date: "2024-01-10",
        description: "Develop and maintain software applications.",
        requirements: [
          "3+ years in software development",
          "Proficiency in JavaScript, Python",
        ],
        employmentType: "Full-time",
        workMode: "Hybrid",
        applicantCount: 25,
        level: "Mid-level",
      },
      {
        id: new ObjectId(),
        title: "Data Scientist",
        location: "San Francisco, CA",
        date: "2024-01-15",
        description: "Analyze large datasets to generate business insights.",
        requirements: [
          "Strong Python skills",
          "Experience with machine learning models",
        ],
        employmentType: "Full-time",
        workMode: "On-site",
        applicantCount: 30,
        level: "Senior-level",
      },
      {
        id: new ObjectId(),
        title: "UX Designer",
        location: "San Francisco, CA",
        date: "2024-01-20",
        description: "Design user-friendly interfaces for web and mobile apps.",
        requirements: [
          "Experience in UX/UI design",
          "Knowledge of design tools like Figma",
        ],
        employmentType: "Part-time",
        workMode: "Remote",
        applicantCount: 15,
        level: "Entry-level",
      },
    ],
    reviews: [
      {
        user_id: new ObjectId(),
        rating: 5,
        review: "Great place to work with a strong focus on innovation!",
        date: new Date("2023-12-15"),
      },
      {
        user_id: new ObjectId(),
        rating: 4,
        review: "Good opportunities for growth but high workload.",
        date: new Date("2023-11-25"),
      },
      {
        user_id: new ObjectId(),
        rating: 5,
        review: "Supportive management and collaborative environment.",
        date: new Date("2023-10-10"),
      },
    ],
    qa: [
      {
        question: "What is the company culture like?",
        answer:
          "Our culture fosters innovation, teamwork, and continuous learning.",
      },
      {
        question: "What benefits do you offer employees?",
        answer:
          "We provide health insurance, flexible work hours, and professional development programs.",
      },
      {
        question: "Is there room for career growth?",
        answer:
          "Yes, we encourage internal promotions and provide mentorship programs.",
      },
    ],
  },
  {
    _id: new ObjectId(),
    owner_id: new ObjectId(),
    admin_id: [new ObjectId()],
    company_name: "GreenTech Solutions",
    sumRating: 13,
    followers: [new ObjectId(), new ObjectId()],
    address: {
      district: "Downtown",
      city_state: "Austin, TX",
      zip_code: "73301",
      country: "USA",
    },
    description: {
      company_size: [200, 500],
      industry: "Renewable Energy",
      headquarters: "Austin, TX",
      links: ["https://greentech.com"],
      founded: new Date("2015-07-20"),
      specialities: ["Solar Energy", "Sustainable Solutions", "Energy Storage"],
    },
    short_description: "Empowering a sustainable future.",
    jobs: [
      {
        id: new ObjectId(),
        title: "Energy Consultant",
        location: "Austin, TX",
        date: "2024-02-01",
        description:
          "Provide consulting services on renewable energy solutions.",
        requirements: [
          "Bachelor's degree in Renewable Energy",
          "Excellent communication skills",
        ],
        employmentType: "Full-time",
        workMode: "Remote",
        applicantCount: 18,
        level: "Entry-level",
      },
      {
        id: new ObjectId(),
        title: "Project Manager",
        location: "Austin, TX",
        date: "2024-01-20",
        description:
          "Lead renewable energy projects from planning to execution.",
        requirements: [
          "5+ years in project management",
          "PMP certification preferred",
        ],
        employmentType: "Full-time",
        workMode: "On-site",
        applicantCount: 10,
        level: "Mid-level",
      },
      {
        id: new ObjectId(),
        title: "Research Scientist",
        location: "Austin, TX",
        date: "2024-01-25",
        description: "Conduct research on sustainable energy technologies.",
        requirements: ["PhD in Renewable Energy", "Strong analytical skills"],
        employmentType: "Part-time",
        workMode: "Hybrid",
        applicantCount: 5,
        level: "Senior-level",
      },
    ],
    reviews: [
      {
        user_id: new ObjectId(),
        rating: 4,
        review: "A company with great values and a meaningful mission.",
        date: new Date("2023-12-01"),
      },
      {
        user_id: new ObjectId(),
        rating: 4,
        review: "Good company, but better communication is needed.",
        date: new Date("2023-11-15"),
      },
      {
        user_id: new ObjectId(),
        rating: 5,
        review: "Fantastic work environment and inspiring leadership.",
        date: new Date("2023-10-30"),
      },
    ],
    qa: [
      {
        question: "What are your sustainability goals?",
        answer: "We aim to be carbon-neutral by 2030.",
      },
      {
        question: "Do you have remote work options?",
        answer: "Yes, many of our roles allow for remote work.",
      },
      {
        question: "What training programs do you offer?",
        answer:
          "We provide specialized training on renewable energy technologies.",
      },
    ],
  },
  {
    _id: new ObjectId(),
    owner_id: new ObjectId(),
    admin_id: [new ObjectId()],
    company_name: "EduGlobal",
    sumRating: 14,
    followers: [new ObjectId(), new ObjectId()],
    address: {
      district: "West End",
      city_state: "London, UK",
      zip_code: "W1J 8LQ",
      country: "UK",
    },
    description: {
      company_size: [500, 1000],
      industry: "Education Technology",
      headquarters: "London, UK",
      links: ["https://eduglobal.com", "https://twitter.com/eduglobal"],
      founded: new Date("2008-03-12"),
      specialities: ["E-learning", "Online Courses", "Virtual Classrooms"],
    },
    short_description: "Transforming education through technology.",
    jobs: [
      {
        id: new ObjectId(),
        title: "Instructional Designer",
        location: "London, UK",
        date: "2024-01-25",
        description: "Design and develop e-learning materials.",
        requirements: [
          "Experience in instructional design",
          "Knowledge of LMS platforms",
        ],
        employmentType: "Part-time",
        workMode: "On-site",
        applicantCount: 12,
        level: "Senior-level",
      },
      {
        id: new ObjectId(),
        title: "Course Developer",
        location: "London, UK",
        date: "2024-02-10",
        description: "Create engaging and interactive online courses.",
        requirements: [
          "Expertise in content creation",
          "Proficiency in multimedia tools",
        ],
        employmentType: "Full-time",
        workMode: "Hybrid",
        applicantCount: 20,
        level: "Mid-level",
      },
      {
        id: new ObjectId(),
        title: "Support Specialist",
        location: "London, UK",
        date: "2024-01-30",
        description: "Provide technical support to learners and educators.",
        requirements: [
          "Strong communication skills",
          "Experience in customer support",
        ],
        employmentType: "Full-time",
        workMode: "Remote",
        applicantCount: 25,
        level: "Entry-level",
      },
    ],
    reviews: [
      {
        user_id: new ObjectId(),
        rating: 5,
        review: "Great mission and impactful work.",
        date: new Date("2023-12-05"),
      },
      {
        user_id: new ObjectId(),
        rating: 5,
        review: "Supportive environment for both employees and clients.",
        date: new Date("2023-11-20"),
      },
      {
        user_id: new ObjectId(),
        rating: 4,
        review: "Exciting projects but needs more resources.",
        date: new Date("2023-10-15"),
      },
    ],
    qa: [
      {
        question: "What makes EduGlobal unique?",
        answer:
          "Our innovative approach to online education and focus on accessibility.",
      },
      {
        question: "Do you offer internships?",
        answer: "Yes, we have a structured internship program for students.",
      },
      {
        question: "What technologies do you use?",
        answer:
          "We use cutting-edge platforms like AI-based adaptive learning systems.",
      },
    ],
  },
];
