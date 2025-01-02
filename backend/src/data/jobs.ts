import { ObjectId } from "mongodb";
import { companies } from "./companies";

function getRandomDateWithinDays(days: number): Date {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * days);
  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);
  now.setDate(now.getDate() + randomDays);
  now.setHours(randomHours, randomMinutes, 0, 0);
  return now;
}

export const jobs = [
  {
    _id: new ObjectId(),
    company_id: companies[0]._id,
    status: "open",
    title: "Software Engineer",
    number_of_peoples: 5,
    type: "full-time",
    location_type: "remote",
    description: `
      **Responsibilities:**
      * Develop and maintain web applications using modern web technologies.
      * Ensure the performance, quality, and responsiveness of applications.
      * Collaborate with cross-functional teams to define, design, and ship new features.
      * Identify and correct bottlenecks and fix bugs.
      * Help maintain code quality, organization, and automation.

      **Minimum Qualifications:**
      * Proficient in JavaScript, Node.js, and React.
      * Experience with RESTful APIs and web services.
      * Strong understanding of web development principles and best practices.
      * Excellent problem-solving skills and attention to detail.
      * Ability to work independently and as part of a team.

      **Why Join Us:**
      * Work in a dynamic and innovative environment.
      * Opportunity for career growth and continuous learning.
      * Competitive salary and company benefits.
      * Flexible work arrangements, including remote work options.
    `,
    salary: 2000,
    emails: "hr@company1.com",
    requirements: ["JavaScript", "Node.js", "React"],
    deadline: getRandomDateWithinDays(10),
    open_time: getRandomDateWithinDays(-10),
  },
  {
    _id: new ObjectId(),
    company_id: companies[0]._id,
    status: "open",
    title: "Frontend Developer",
    number_of_peoples: 3,
    type: "full-time",
    location_type: "on-site",
    description: `
      **Responsibilities:**
      * Create and optimize user interfaces for web applications.
      * Work closely with designers to implement user-friendly designs.
      * Ensure the technical feasibility of UI/UX designs.
      * Optimize applications for maximum speed and scalability.
      * Maintain and improve the codebase for future use.

      **Minimum Qualifications:**
      * Proficient in HTML, CSS, and JavaScript.
      * Experience with frontend frameworks such as React or Angular.
      * Strong understanding of web development principles and best practices.
      * Excellent problem-solving skills and attention to detail.
      * Ability to work independently and as part of a team.

      **Why Join Us:**
      * Work in a dynamic and innovative environment.
      * Opportunity for career growth and continuous learning.
      * Competitive salary and company benefits.
      * Collaborative and supportive team culture.
    `,
    salary: 1800,
    emails: "hr@company1.com",
    requirements: ["HTML", "CSS", "JavaScript"],
    deadline: getRandomDateWithinDays(10),
    open_time: getRandomDateWithinDays(-10),
  },
  {
    _id: new ObjectId(),
    company_id: companies[0]._id,
    status: "open",
    title: "Backend Developer",
    number_of_peoples: 4,
    type: "full-time",
    location_type: "remote",
    description: `
      **Responsibilities:**
      * Develop server-side logic and APIs for web applications.
      * Integrate user-facing elements developed by frontend developers.
      * Optimize applications for maximum speed and scalability.
      * Implement security and data protection measures.
      * Collaborate with other team members and stakeholders.

      **Minimum Qualifications:**
      * Proficient in Node.js and Express.
      * Experience with MongoDB or other NoSQL databases.
      * Strong understanding of backend development principles and best practices.
      * Excellent problem-solving skills and attention to detail.
      * Ability to work independently and as part of a team.

      **Why Join Us:**
      * Work in a dynamic and innovative environment.
      * Opportunity for career growth and continuous learning.
      * Competitive salary and company benefits.
      * Flexible work arrangements, including remote work options.
    `,
    salary: 2200,
    emails: "hr@company1.com",
    requirements: ["Node.js", "Express", "MongoDB"],
    deadline: getRandomDateWithinDays(10),
    open_time: getRandomDateWithinDays(-10),
  },
  {
    _id: new ObjectId(),
    company_id: companies[1]._id,
    status: "open",
    title: "Data Scientist",
    number_of_peoples: 2,
    type: "full-time",
    location_type: "on-site",
    description: `
      **Responsibilities:**
      * Analyze and interpret complex data to provide insights.
      * Develop and implement data models and algorithms.
      * Collaborate with cross-functional teams to understand business needs.
      * Communicate findings and recommendations to stakeholders.
      * Stay up-to-date with the latest data science trends and technologies.

      **Minimum Qualifications:**
      * Proficient in Python and machine learning frameworks.
      * Experience with statistical analysis and data visualization.
      * Strong understanding of data science principles and best practices.
      * Excellent problem-solving skills and attention to detail.
      * Ability to work independently and as part of a team.

      **Why Join Us**:
      * Work in a dynamic and innovative environment.
      * Opportunity for career growth and continuous learning.
      * Competitive salary and company benefits.
      * Collaborative and supportive team culture.
    `,
    salary: 2500,
    emails: "hr@company3.com",
    requirements: ["Python", "Machine Learning", "Statistics"],
    deadline: getRandomDateWithinDays(10),
    open_time: getRandomDateWithinDays(-10),
  },
  {
    _id: new ObjectId(),
    company_id: companies[1]._id,
    status: "open",
    title: "DevOps Engineer",
    number_of_peoples: 3,
    type: "full-time",
    location_type: "remote",
    description: `
      **Responsibilities:**
      * Manage and automate infrastructure using modern DevOps tools.
      * Implement and maintain CI/CD pipelines.
      * Monitor and optimize system performance and reliability.
      * Collaborate with development teams to ensure smooth deployment processes.
      * Troubleshoot and resolve infrastructure-related issues.

      **Minimum Qualifications:**
      * Proficient in AWS, Docker, and Kubernetes.
      * Experience with infrastructure as code tools such as Terraform.
      * Strong understanding of DevOps principles and best practices.
      * Excellent problem-solving skills and attention to detail.
      * Ability to work independently and as part of a team.

      **Why Join Us:**
      * Work in a dynamic and innovative environment.
      * Opportunity for career growth and continuous learning.
      * Competitive salary and company benefits.
      * Flexible work arrangements, including remote work options.
    `,
    salary: 2300,
    emails: "hr@company3.com",
    requirements: ["AWS", "Docker", "Kubernetes"],
    deadline: getRandomDateWithinDays(10),
    open_time: getRandomDateWithinDays(-10),
  },
  {
    _id: new ObjectId(),
    company_id: companies[1]._id,
    status: "open",
    title: "Product Manager",
    number_of_peoples: 1,
    type: "full-time",
    location_type: "on-site",
    description: `
      **Responsibilities:**
      * Oversee the product development lifecycle from concept to launch.
      * Define product vision, strategy, and roadmap.
      * Collaborate with cross-functional teams to deliver high-quality products.
      * Conduct market research and analyze customer feedback.
      * Ensure products meet business goals and user needs.

      **Minimum Qualifications:**
      * Proficient in Agile and Scrum methodologies.
      * Experience with product management tools and techniques.
      * Strong understanding of product development principles and best practices.
      * Excellent problem-solving skills and attention to detail.
      * Ability to work independently and as part of a team.

      **Why Join Us:**
      * Work in a dynamic and innovative environment.
      * Opportunity for career growth and continuous learning.
      * Competitive salary and company benefits.
      * Collaborative and supportive team culture.
    `,
    salary: 2700,
    emails: "hr@company3.com",
    requirements: ["Agile", "Scrum", "Leadership"],
    deadline: getRandomDateWithinDays(10),
    open_time: getRandomDateWithinDays(-10),
  },
  {
    _id: new ObjectId(),
    company_id: companies[0]._id,
    status: "open",
    title: "AI Research Scientist",
    number_of_peoples: 2,
    type: "full-time",
    location_type: "remote",
    description: `
      **Responsibilities:**
      * Conduct research in artificial intelligence and machine learning.
      * Develop and implement AI models and algorithms.
      * Collaborate with cross-functional teams to integrate AI solutions.
      * Publish research findings in academic journals and conferences.
      * Stay up-to-date with the latest AI trends and technologies.

      **Minimum Qualifications:**
      * Proficient in Python and machine learning frameworks such as TensorFlow.
      * Experience with deep learning and neural networks.
      * Strong understanding of AI principles and best practices.
      * Excellent problem-solving skills and attention to detail.
      * Ability to work independently and as part of a team.

      **Why Join Us:**
      * Work in a dynamic and innovative environment.
      * Opportunity for career growth and continuous learning.
      * Competitive salary and company benefits.
      * Flexible work arrangements, including remote work options.
    `,
    salary: 3000,
    emails: "hr@company1.com",
    requirements: ["Python", "TensorFlow", "Deep Learning"],
    deadline: getRandomDateWithinDays(10),
    open_time: getRandomDateWithinDays(-10),
  },
  {
    _id: new ObjectId(),
    company_id: companies[0]._id,
    status: "open",
    title: "Machine Learning Engineer",
    number_of_peoples: 3,
    type: "full-time",
    location_type: "on-site",
    description: `
      **Responsibilities:**
      * Develop and deploy machine learning models for various applications.
      * Collaborate with data scientists to understand and implement ML algorithms.
      * Optimize and maintain ML models for performance and scalability.
      * Integrate ML models into production systems.
      * Stay up-to-date with the latest ML trends and technologies.

      **Minimum Qualifications:**
      * Proficient in Python and machine learning frameworks such as Scikit-learn.
      * Experience with data science and statistical analysis.
      * Strong understanding of machine learning principles and best practices.
      * Excellent problem-solving skills and attention to detail.
      * Ability to work independently and as part of a team.

      **Why Join Us:**
      * Work in a dynamic and innovative environment.
      * Opportunity for career growth and continuous learning.
      * Competitive salary and company benefits.
      * Collaborative and supportive team culture.
    `,
    salary: 2800,
    emails: "hr@company1.com",
    requirements: ["Python", "Scikit-learn", "Data Science"],
    deadline: getRandomDateWithinDays(10),
    open_time: getRandomDateWithinDays(-10),
  },
  {
    _id: new ObjectId(),
    company_id: companies[0]._id,
    status: "open",
    title: "Data Engineer",
    number_of_peoples: 4,
    type: "full-time",
    location_type: "remote",
    description: `
      **Responsibilities:**
      * Build and maintain data pipelines for data processing and analysis.
      * Design and implement data storage solutions.
      * Collaborate with data scientists and analysts to understand data needs.
      * Optimize data workflows for performance and scalability.
      * Ensure data quality and integrity.

      **Minimum Qualifications:**
      * Proficient in Python and SQL.
      * Experience with ETL processes and data integration.
      * Strong understanding of data engineering principles and best practices.
      * Excellent problem-solving skills and attention to detail.
      * Ability to work independently and as part of a team.

      **Why Join Us:**
      * Work in a dynamic and innovative environment.
      * Opportunity for career growth and continuous learning.
      * Competitive salary and company benefits.
      * Flexible work arrangements, including remote work options.
    `,
    salary: 2600,
    emails: "hr@company1.com",
    requirements: ["Python", "SQL", "ETL"],
    deadline: getRandomDateWithinDays(10),
    open_time: getRandomDateWithinDays(-10),
  },
  {
    _id: new ObjectId(),
    company_id: companies[0]._id,
    status: "open",
    title: "AI Product Manager",
    number_of_peoples: 1,
    type: "full-time",
    location_type: "on-site",
    description: `
      **Responsibilities:**
      * Manage AI product development and strategy.
      * Define product vision, strategy, and roadmap for AI products.
      * Collaborate with cross-functional teams to deliver high-quality AI solutions.
      * Conduct market research and analyze customer feedback.
      * Ensure AI products meet business goals and user needs.

      **Minimum Qualifications:**
      * Proficient in AI and product management principles.
      * Experience with AI product development and deployment.
      * Strong understanding of AI technologies and best practices.
      * Excellent problem-solving skills and attention to detail.
      * Ability to work independently and as part of a team.

      **Why Join Us:**
      * Work in a dynamic and innovative environment.
      * Opportunity for career growth and continuous learning.
      * Competitive salary and company benefits.
      * Collaborative and supportive team culture.
    `,
    salary: 3200,
    emails: "hr@company1.com",
    requirements: ["AI", "Product Management", "Leadership"],
    deadline: getRandomDateWithinDays(10),
    open_time: getRandomDateWithinDays(-10),
  },
  {
    _id: new ObjectId(),
    company_id: companies[0]._id,
    status: "open",
    title: "Data Analyst",
    number_of_peoples: 2,
    type: "full-time",
    location_type: "remote",
    description: `
      **Responsibilities:**\n
      * Analyze and interpret data to provide insights and recommendations.\n
      * Develop and maintain data dashboards and reports.\n
      * Collaborate with cross-functional teams to understand data needs.\n
      * Ensure data quality and integrity.\n
      * Stay up-to-date with the latest data analysis trends and technologies.\n
\n
      **Minimum Qualifications:**\n
      * Proficient in SQL and data visualization tools such as Excel.\n
      * Experience with data analysis and statistical techniques.\n
      * Strong understanding of data analysis principles and best practices.\n
      * Excellent problem-solving skills and attention to detail.\n
      * Ability to work independently and as part of a team.\n
\n
      **Why Join Us:**\n
      * Work in a dynamic and innovative environment.\n
      * Opportunity for career growth and continuous learning.\n
      * Competitive salary and company benefits.\n
      * Flexible work arrangements, including remote work options.\n
    `,
    salary: 2400,
    emails: "hr@company1.com",
    requirements: ["SQL", "Excel", "Data Visualization"],
    deadline: getRandomDateWithinDays(10),
    open_time: getRandomDateWithinDays(-10),
  },
];
