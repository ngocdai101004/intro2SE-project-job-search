import { users } from "./users";
import { companies } from "./companies";
import { title } from "process";

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

export const userInfo = [
  {
    user_id: users[0]._id, // User's unique ObjectId
    review: [
      {
        reviewer: companies[0]._id,
        content: "Great user!",
        rating: 5,
      },
      {
        reviewer: companies[1]._id,
        content: "Very professional.",
        rating: 4,
      },
      {
        reviewer: companies[2]._id,
        content: "Excellent work ethic.",
        rating: 5,
      },
    ],
    education: [
      {
        education_level: "Bachelor's",
        study_field: "Computer Science",
        school_name: "University of Example",
        begin: new Date("2015-09-01T00:00:00.000Z"),
        end: new Date("2019-05-31T00:00:00.000Z"),
        additional_details: "Graduated with honors",
      },
      {
        education_level: "Master's",
        study_field: "Software Engineering",
        school_name: "Tech University",
        begin: new Date("2019-09-01T00:00:00.000Z"),
        end: new Date("2021-05-31T00:00:00.000Z"),
        additional_details: "Specialized in cloud computing",
      },
      {
        education_level: "PhD",
        study_field: "Artificial Intelligence",
        school_name: "AI Institute",
        begin: new Date("2021-09-01T00:00:00.000Z"),
        end: new Date("2024-05-31T00:00:00.000Z"),
        additional_details: "Research in machine learning",
      },
    ],
    experience: [
      {
        job_title: "Software Engineer",
        company_name: "TechCorp",
        begin: new Date("2020-01-01T00:00:00.000Z"),
        end: new Date("2023-01-01T00:00:00.000Z"),
        description: "Developed web applications",
      },
      {
        job_title: "Junior Developer",
        company_name: "WebSolutions",
        begin: new Date("2019-01-01T00:00:00.000Z"),
        end: new Date("2020-01-01T00:00:00.000Z"),
        description: "Assisted in developing web applications",
      },
      {
        job_title: "Intern",
        company_name: "Startup Inc.",
        begin: new Date("2018-06-01T00:00:00.000Z"),
        end: new Date("2018-12-01T00:00:00.000Z"),
        description: "Worked on various development projects",
      },
    ],
    skills: ["JavaScript", "Node.js", "React", "TypeScript", "GraphQL"],
    certifications: [
      {
        name: "AWS Certified Developer",
        issuing_organization: "Amazon",
        issue_date: new Date("2020-01-01T00:00:00.000Z"),
      },
      {
        name: "Certified Scrum Master",
        issuing_organization: "Scrum Alliance",
        issue_date: new Date("2019-01-01T00:00:00.000Z"),
      },
      {
        name: "Google Cloud Professional",
        issuing_organization: "Google",
        issue_date: new Date("2021-01-01T00:00:00.000Z"),
      },
    ],
    job_preferences: [
      {
        job_title: "Senior Developer",
        industry: "Tech",
        relocate_preference: "willing",
        salary_expectation: 90000,
      },
      {
        job_title: "Lead Developer",
        industry: "Finance",
        relocate_preference: "willing",
        salary_expectation: 120000,
      },
      {
        job_title: "Tech Lead",
        industry: "Healthcare",
        relocate_preference: "willing",
        salary_expectation: 110000,
      },
    ],
    ready_to_work: true,
    additional_info: "Looking for remote opportunities",
    awards: ["Employee of the Month", "Best Innovator Award", "Top Performer"],
    languages: ["English", "French", "Spanish"],
    link: [
      "https://github.com/example",
      "https://linkedin.com/in/example",
      "https://twitter.com/example",
    ],
    publications: [
      {
        title: "Building Scalable Web Apps",
        url: "https://example.com",
        description: "An article on scaling applications",
      },
      {
        title: "Introduction to Cloud Computing",
        url: "https://example.com/cloud",
        description: "A guide to cloud computing",
      },
      {
        title: "Advanced JavaScript Techniques",
        url: "https://example.com/js",
        description: "An in-depth look at JavaScript",
      },
    ],
    qualifications: [
      {
        title: "Backend",
        description:
          "API, RESTful, GraphQL, Node.js, Express, MongoDB, SQL, PostgreSQL, Redis, Docker, Kubernetes, AWS, GCP, Azure, CI/CD, Jenkins, Git, GitHub, GitLab, Bitbucket, Jira, Confluence, Agile, Scrum, Kanban, TDD, BDD, DDD, Microservices, Serverless",
      },
      {
        title: "Fontend",
        description:
          "HTML, CSS, JavaScript, TypeScript, React, Angular, Vue.js, Svelte, Webpack, Babel, ESLint, Prettier, Bootstrap, Material-UI, Tailwind CSS, Responsive Design, Cross-Browser Compatibility, Web Performance Optimization, Progressive Web Apps, Single Page Applications",
      },
      {
        title: "Soft Skills",
        description:
          "Communication, Teamwork, Problem-Solving, Time Management, Leadership, Adaptability, Creativity, Critical Thinking, Decision Making, Emotional Intelligence, Conflict Resolution, Negotiation, Stress Management, Collaboration, Empathy, Active Listening, Presentation, Public Speaking, Networking, Mentoring, Coaching, Delegation, Feedback, Motivation, Influence, Persuasion, Decision Making, Problem Solving, Time Management, Adaptability, Creativity, Critical Thinking, Emotional Intelligence, Conflict Resolution, Negotiation, Stress Management, Collaboration, Empathy, Active Listening, Presentation, Public Speaking, Networking, Mentoring, Coaching, Delegation, Feedback, Motivation, Influence, Persuasion",
      },
    ],
    profile_picture: "https://example.com/profile.jpg",
    resume: ["https://example.com/resume.pdf"],
    summary:
      "Experienced in full-stack development with a focus on scalable web applications. " +
      "Proven track record of delivering high-quality software solutions on time and within budget. " +
      "Skilled in various programming languages and frameworks, including JavaScript, Node.js, and React. " +
      "Strong background in cloud technologies and DevOps practices, with certifications in AWS and Kubernetes. " +
      "Excellent problem-solving abilities and a passion for continuous learning and improvement. " +
      "Looking for opportunities to leverage my skills in a dynamic and innovative environment.",
    following: [companies[0]._id, companies[1]._id, companies[2]._id],
  },
  {
    user_id: users[1]._id,
    review: [
      {
        reviewer: companies[1]._id,
        content: "Very talented developer.",
        rating: 5,
      },
      {
        reviewer: companies[2]._id,
        content: "Great team player.",
        rating: 4,
      },
    ],
    education: [
      {
        education_level: "Bachelor's",
        study_field: "Information Technology",
        school_name: "Tech University",
        begin: new Date("2016-09-01T00:00:00.000Z"),
        end: new Date("2020-05-31T00:00:00.000Z"),
        additional_details: "Graduated with distinction",
      },
      {
        education_level: "Master's",
        study_field: "Computer Science",
        school_name: "Data Institute",
        begin: new Date("2020-09-01T00:00:00.000Z"),
        end: new Date("2022-05-31T00:00:00.000Z"),
        additional_details: "Specialized in data engineering",
      },
    ],
    experience: [
      {
        job_title: "Backend Developer",
        company_name: "DataCorp",
        begin: new Date("2020-06-01T00:00:00.000Z"),
        end: new Date("2023-06-01T00:00:00.000Z"),
        description: "Developed and maintained backend services",
      },
      {
        job_title: "Software Engineer",
        company_name: "TechSolutions",
        begin: new Date("2019-06-01T00:00:00.000Z"),
        end: new Date("2020-06-01T00:00:00.000Z"),
        description: "Developed software solutions for clients",
      },
      {
        job_title: "Intern",
        company_name: "WebDev Inc.",
        begin: new Date("2018-06-01T00:00:00.000Z"),
        end: new Date("2018-12-01T00:00:00.000Z"),
        description: "Assisted in web development projects",
      },
      {
        job_title: "Junior Developer",
        company_name: "WebSolutions",
        begin: new Date("2017-06-01T00:00:00.000Z"),
        end: new Date("2018-06-01T00:00:00.000Z"),
        description: "Developed web applications",
      },
    ],
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    certifications: [
      {
        name: "AWS Certified Developer",
        issuing_organization: "Amazon",
        issue_date: new Date("2020-01-01T00:00:00.000Z"),
      },
      {
        name: "Certified Scrum Master",
        issuing_organization: "Scrum Alliance",
        issue_date: new Date("2019-01-01T00:00:00.000Z"),
      },
      {
        name: "Google Cloud Professional",
        issuing_organization: "Google",
        issue_date: new Date("2021-01-01T00:00:00.000Z"),
      },
      {
        name: "Certified Data Engineer",
        issuing_organization: "Data Institute",
        issue_date: new Date("2022-01-01T00:00:00.000Z"),
      },
      {
        name: "Certified Backend Developer",
        issuing_organization: "Tech University",
        issue_date: new Date("2020-01-01T00:00:00.000Z"),
      },
    ],
    job_preferences: [
      {
        job_title: "Backend Developer",
        industry: "Tech",
        relocate_preference: "not_willing",
        salary_expectation: 85000,
      },
      {
        job_title: "Senior Developer",
        industry: "Finance",
        relocate_preference: "willing",
        salary_expectation: 110000,
      },
      {
        job_title: "Tech Lead",
        industry: "Healthcare",
        relocate_preference: "willing",
        salary_expectation: 100000,
      },
      {
        job_title: "Data Engineer",
        industry: "Tech",
        relocate_preference: "willing",
        salary_expectation: 90000,
      },
    ],
    ready_to_work: true,
    additional_info: "Interested in backend development roles",
    awards: ["Best Developer Award", "Top Performer", "Employee of the Month"],
    languages: ["English", "German"],
    link: ["https://github.com/user2", "https://linkedin.com/in/user2"],
    publications: [
      {
        title: "Optimizing Backend Performance",
        url: "https://example.com/backend",
        description: "An article on backend optimization techniques",
      },
    ],
    qualifications: [
      {
        title: "Backend",
        description:
          "API, RESTful, GraphQL, Node.js, Express, MongoDB, SQL, PostgreSQL, Redis, Docker, Kubernetes, AWS, GCP, Azure, CI/CD, Jenkins, Git, GitHub, GitLab, Bitbucket, Jira, Confluence, Agile, Scrum, Kanban, TDD, BDD, DDD, Microservices, Serverless",
      },
      {
        title: "Fontend",
        description:
          "HTML, CSS, JavaScript, TypeScript, React, Angular, Vue.js, Svelte, Webpack, Babel, ESLint, Prettier, Bootstrap, Material-UI, Tailwind CSS, Responsive Design, Cross-Browser Compatibility, Web Performance Optimization, Progressive Web Apps, Single Page Applications",
      },
      {
        title: "Soft Skills",
        description:
          "Communication, Teamwork, Problem-Solving, Time Management, Leadership, Adaptability, Creativity, Critical Thinking, Decision Making, Emotional Intelligence, Conflict Resolution, Negotiation, Stress Management, Collaboration, Empathy, Active Listening, Presentation, Public Speaking, Networking, Mentoring, Coaching, Delegation, Feedback, Motivation, Influence, Persuasion, Decision Making, Problem Solving, Time Management, Adaptability, Creativity, Critical Thinking, Emotional Intelligence, Conflict Resolution, Negotiation, Stress Management, Collaboration, Empathy, Active Listening, Presentation, Public Speaking, Networking, Mentoring, Coaching, Delegation, Feedback, Motivation, Influence, Persuasion",
      },
    ],
    profile_picture: "https://example.com/profile2.jpg",
    resume: ["https://example.com/resume2.pdf"],
    summary:
      "Experienced backend developer with a focus on Python and Django. Skilled in building and maintaining scalable backend services. Looking for opportunities in tech industry.",
    following: [companies[1]._id, companies[2]._id],
  },
  {
    user_id: users[2]._id,
    review: [
      {
        reviewer: companies[0]._id,
        content: "Highly skilled and motivated.",
        rating: 5,
      },
      {
        reviewer: companies[1]._id,
        content: "Excellent problem solver.",
        rating: 5,
      },
    ],
    education: [
      {
        education_level: "Bachelor's",
        study_field: "Software Engineering",
        school_name: "Example University",
        begin: new Date("2014-09-01T00:00:00.000Z"),
        end: new Date("2018-05-31T00:00:00.000Z"),
        additional_details: "Graduated with honors",
      },
      {
        education_level: "Master's",
        study_field: "Computer Science",
        school_name: "Tech Institute",
        begin: new Date("2018-09-01T00:00:00.000Z"),
        end: new Date("2020-05-31T00:00:00.000Z"),
        additional_details: "Specialized in artificial intelligence",
      },
    ],
    experience: [
      {
        job_title: "Full Stack Developer",
        company_name: "InnovateTech",
        begin: new Date("2018-07-01T00:00:00.000Z"),
        end: new Date("2023-07-01T00:00:00.000Z"),
        description: "Worked on both frontend and backend development",
      },
      {
        job_title: "Software Engineer",
        company_name: "TechSolutions",
        begin: new Date("2017-07-01T00:00:00.000Z"),
        end: new Date("2018-07-01T00:00:00.000Z"),
        description: "Developed software solutions for clients",
      },
      {
        job_title: "Intern",
        company_name: "WebDev Inc.",
        begin: new Date("2016-06-01T00:00:00.000Z"),
        end: new Date("2016-12-01T00:00:00.000Z"),
        description: "Assisted in web development projects",
      },
    ],
    skills: ["JavaScript", "Node.js", "Angular", "MongoDB"],
    certifications: [
      {
        name: "AWS Certified Developer",
        issuing_organization: "Amazon",
        issue_date: new Date("2020-01-01T00:00:00.000Z"),
      },
      {
        name: "Certified Scrum Master",
        issuing_organization: "Scrum Alliance",
        issue_date: new Date("2019-01-01T00:00:00.000Z"),
      },
      {
        name: "Google Cloud Professional",
        issuing_organization: "Google",
        issue_date: new Date("2021-01-01T00:00:00.000Z"),
      },
      {
        name: "Certified Full Stack Developer",
        issuing_organization: "Tech Institute",
        issue_date: new Date("2020-01-01T00:00:00.000Z"),
      },
      {
        name: "Certified Software Engineer",
        issuing_organization: "Example University",
        issue_date: new Date("2018-01-01T00:00:00.000Z"),
      },
    ],
    job_preferences: [
      {
        job_title: "Full Stack Developer",
        industry: "Tech",
        relocate_preference: "willing",
        salary_expectation: 95000,
      },
      {
        job_title: "Backend Developer",
        industry: "Tech",
        relocate_preference: "not_willing",
        salary_expectation: 120000,
      },
      {
        job_title: "Frontend Developer",
        industry: "Tech",
        relocate_preference: "willing",
        salary_expectation: 110000,
      },
    ],
    ready_to_work: true,
    additional_info: "Open to relocation for the right opportunity",
    awards: [
      "Top Performer Award",
      "Innovator of the Year",
      "Employee of the Month",
      "Best Team Player",
    ],
    languages: ["English", "Spanish"],
    link: ["https://github.com/user3", "https://linkedin.com/in/user3"],
    publications: [
      {
        title: "Full Stack Development Best Practices",
        url: "https://example.com/fullstack",
        description: "An article on best practices in full stack development",
      },
    ],
    qualifications: [
      {
        title: "Backend",
        description:
          "API, RESTful, GraphQL, Node.js, Express, MongoDB, SQL, PostgreSQL, Redis, Docker, Kubernetes, AWS, GCP, Azure, CI/CD, Jenkins, Git, GitHub, GitLab, Bitbucket, Jira, Confluence, Agile, Scrum, Kanban, TDD, BDD, DDD, Microservices, Serverless",
      },
      {
        title: "Fontend",
        description:
          "HTML, CSS, JavaScript, TypeScript, React, Angular, Vue.js, Svelte, Webpack, Babel, ESLint, Prettier, Bootstrap, Material-UI, Tailwind CSS, Responsive Design, Cross-Browser Compatibility, Web Performance Optimization, Progressive Web Apps, Single Page Applications",
      },
      {
        title: "Soft Skills",
        description:
          "Communication, Teamwork, Problem-Solving, Time Management, Leadership, Adaptability, Creativity, Critical Thinking, Decision Making, Emotional Intelligence, Conflict Resolution, Negotiation, Stress Management, Collaboration, Empathy, Active Listening, Presentation, Public Speaking, Networking, Mentoring, Coaching, Delegation, Feedback, Motivation, Influence, Persuasion, Decision Making, Problem Solving, Time Management, Adaptability, Creativity, Critical Thinking, Emotional Intelligence, Conflict Resolution, Negotiation, Stress Management, Collaboration, Empathy, Active Listening, Presentation, Public Speaking, Networking, Mentoring, Coaching, Delegation, Feedback, Motivation, Influence, Persuasion",
      },
    ],
    profile_picture: "https://example.com/profile3.jpg",
    resume: [
      "https://example.com/resume3.pdf",
      "https://example.com/portfolio",
      "https://example.com/projects",
    ],
    summary:
      "Experienced full stack developer with a strong background in JavaScript and Node.js. Proven ability to deliver high-quality software solutions. Looking for opportunities in tech industry.",
    following: [companies[0]._id, companies[1]._id],
  },
  {
    user_id: users[3]._id,
    review: [
      {
        reviewer: companies[2]._id,
        content: "Outstanding performance.",
        rating: 5,
      },
      {
        reviewer: companies[0]._id,
        content: "Very reliable and efficient.",
        rating: 4,
      },
    ],
    education: [
      {
        education_level: "Bachelor's",
        study_field: "Information Systems",
        school_name: "Global University",
        begin: new Date("2013-09-01T00:00:00.000Z"),
        end: new Date("2017-05-31T00:00:00.000Z"),
        additional_details: "Graduated with distinction",
      },
      {
        education_level: "Master's",
        study_field: "Data Science",
        school_name: "Data University",
        begin: new Date("2017-09-01T00:00:00.000Z"),
        end: new Date("2019-05-31T00:00:00.000Z"),
        additional_details: "Specialized in big data analytics",
      },
    ],
    experience: [
      {
        job_title: "Data Scientist",
        company_name: "DataAnalytics Inc.",
        begin: new Date("2019-06-01T00:00:00.000Z"),
        end: new Date("2023-06-01T00:00:00.000Z"),
        description: "Analyzed large datasets to derive insights",
      },
      {
        job_title: "Data Analyst",
        company_name: "Insightful Solutions",
        begin: new Date("2018-06-01T00:00:00.000Z"),
        end: new Date("2019-06-01T00:00:00.000Z"),
        description: "Performed data analysis and visualization",
      },
      {
        job_title: "Intern",
        company_name: "Tech Innovations",
        begin: new Date("2017-06-01T00:00:00.000Z"),
        end: new Date("2017-12-01T00:00:00.000Z"),
        description: "Assisted in data collection and processing",
      },
    ],
    skills: ["Python", "R", "SQL", "Tableau", "Machine Learning"],
    certifications: [
      {
        name: "Certified Data Scientist",
        issuing_organization: "Data Institute",
        issue_date: new Date("2020-01-01T00:00:00.000Z"),
      },
      {
        name: "Google Cloud Data Engineer",
        issuing_organization: "Google",
        issue_date: new Date("2021-01-01T00:00:00.000Z"),
      },
      {
        name: "Certified Analytics Professional",
        issuing_organization: "INFORMS",
        issue_date: new Date("2019-01-01T00:00:00.000Z"),
      },
    ],
    job_preferences: [
      {
        job_title: "Data Scientist",
        industry: "Tech",
        relocate_preference: "willing",
        salary_expectation: 100000,
      },
      {
        job_title: "Machine Learning Engineer",
        industry: "Finance",
        relocate_preference: "not_willing",
        salary_expectation: 120000,
      },
      {
        job_title: "Data Analyst",
        industry: "Healthcare",
        relocate_preference: "willing",
        salary_expectation: 90000,
      },
    ],
    ready_to_work: true,
    additional_info: "Open to remote work opportunities",
    awards: ["Data Scientist of the Year", "Best Analyst Award"],
    languages: ["English", "Chinese"],
    link: ["https://github.com/user4", "https://linkedin.com/in/user4"],
    publications: [
      {
        title: "Data Science in Healthcare",
        url: "https://example.com/healthcare",
        description: "An article on the impact of data science in healthcare",
      },
    ],
    qualifications: [
      {
        title: "Data Science",
        description:
          "Python, R, SQL, Machine Learning, Deep Learning, Data Visualization, Big Data, Hadoop, Spark, Tableau, Power BI, Data Mining, Statistical Analysis, Predictive Modeling, Data Wrangling, Data Cleaning, Data Engineering, Cloud Computing, AWS, GCP, Azure, Docker, Kubernetes, CI/CD, Git, GitHub, Agile, Scrum",
      },
      {
        title: "Soft Skills",
        description:
          "Communication, Teamwork, Problem-Solving, Time Management, Leadership, Adaptability, Creativity, Critical Thinking, Decision Making, Emotional Intelligence, Conflict Resolution, Negotiation, Stress Management, Collaboration, Empathy, Active Listening, Presentation, Public Speaking, Networking, Mentoring, Coaching, Delegation, Feedback, Motivation, Influence, Persuasion",
      },
    ],
    profile_picture: "https://example.com/profile4.jpg",
    resume: ["https://example.com/resume4.pdf"],
    summary:
      "Experienced data scientist with a strong background in machine learning and data analytics. Proven ability to derive insights from large datasets and deliver actionable recommendations. Looking for opportunities in tech industry.",
    following: [companies[0]._id, companies[2]._id],
  },
  {
    user_id: users[4]._id,
    review: [
      {
        reviewer: companies[1]._id,
        content: "Exceptional developer with great attention to detail.",
        rating: 5,
      },
      {
        reviewer: companies[2]._id,
        content: "Highly collaborative and innovative.",
        rating: 4,
      },
    ],
    education: [
      {
        education_level: "Bachelor's",
        study_field: "Computer Engineering",
        school_name: "Tech University",
        begin: new Date("2012-09-01T00:00:00.000Z"),
        end: new Date("2016-05-31T00:00:00.000Z"),
        additional_details: "Graduated with honors",
      },
      {
        education_level: "Master's",
        study_field: "Software Engineering",
        school_name: "Engineering Institute",
        begin: new Date("2016-09-01T00:00:00.000Z"),
        end: new Date("2018-05-31T00:00:00.000Z"),
        additional_details: "Specialized in software architecture",
      },
    ],
    experience: [
      {
        job_title: "Lead Developer",
        company_name: "Innovative Solutions",
        begin: new Date("2018-06-01T00:00:00.000Z"),
        end: new Date("2023-06-01T00:00:00.000Z"),
        description: "Led a team of developers to build scalable applications",
      },
      {
        job_title: "Software Engineer",
        company_name: "Tech Innovations",
        begin: new Date("2016-06-01T00:00:00.000Z"),
        end: new Date("2018-06-01T00:00:00.000Z"),
        description: "Developed software solutions for various clients",
      },
      {
        job_title: "Intern",
        company_name: "Startup Hub",
        begin: new Date("2015-06-01T00:00:00.000Z"),
        end: new Date("2015-12-01T00:00:00.000Z"),
        description: "Assisted in software development projects",
      },
    ],
    skills: ["Java", "Spring Boot", "Microservices", "Docker", "Kubernetes"],
    certifications: [
      {
        name: "Oracle Certified Professional",
        issuing_organization: "Oracle",
        issue_date: new Date("2019-01-01T00:00:00.000Z"),
      },
      {
        name: "Certified Kubernetes Administrator",
        issuing_organization: "CNCF",
        issue_date: new Date("2020-01-01T00:00:00.000Z"),
      },
      {
        name: "AWS Certified Solutions Architect",
        issuing_organization: "Amazon",
        issue_date: new Date("2021-01-01T00:00:00.000Z"),
      },
    ],
    job_preferences: [
      {
        job_title: "Lead Developer",
        industry: "Tech",
        relocate_preference: "not_willing",
        salary_expectation: 130000,
      },
      {
        job_title: "Software Architect",
        industry: "Finance",
        relocate_preference: "willing",
        salary_expectation: 140000,
      },
      {
        job_title: "Senior Software Engineer",
        industry: "Healthcare",
        relocate_preference: "willing",
        salary_expectation: 125000,
      },
    ],
    ready_to_work: true,
    additional_info: "Looking for leadership roles in software development",
    awards: ["Developer of the Year", "Best Team Leader"],
    languages: ["English", "Japanese"],
    link: ["https://github.com/user5", "https://linkedin.com/in/user5"],
    publications: [
      {
        title: "Microservices Architecture",
        url: "https://example.com/microservices",
        description: "An article on designing microservices architecture",
      },
    ],
    qualifications: [
      {
        title: "Backend",
        description:
          "Java, Spring Boot, Microservices, Docker, Kubernetes, SQL, PostgreSQL, Redis, AWS, GCP, Azure, CI/CD, Jenkins, Git, GitHub, GitLab, Bitbucket, Jira, Confluence, Agile, Scrum, Kanban, TDD, BDD, DDD, Serverless",
      },
      {
        title: "Soft Skills",
        description:
          "Communication, Teamwork, Problem-Solving, Time Management, Leadership, Adaptability, Creativity, Critical Thinking, Decision Making, Emotional Intelligence, Conflict Resolution, Negotiation, Stress Management, Collaboration, Empathy, Active Listening, Presentation, Public Speaking, Networking, Mentoring, Coaching, Delegation, Feedback, Motivation, Influence, Persuasion",
      },
    ],
    profile_picture: "https://example.com/profile5.jpg",
    resume: ["https://example.com/resume5.pdf"],
    summary:
      "Experienced lead developer with a strong background in Java and microservices architecture. Proven ability to lead teams and deliver high-quality software solutions. Looking for leadership roles in tech industry.",
    following: [companies[1]._id, companies[2]._id],
  },
];
