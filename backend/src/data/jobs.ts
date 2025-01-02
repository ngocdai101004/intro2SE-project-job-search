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
    description:
      "Develop and maintain web applications using modern web technologies. You will be responsible for designing, coding, and modifying websites, from layout to function and according to a client's specifications. Strive to create visually appealing sites that feature user-friendly design and clear navigation.",
    responsibilities: [
      "Develop and maintain web applications using modern web technologies.",
      "Ensure the performance, quality, and responsiveness of applications.",
      "Collaborate with cross-functional teams to define, design, and ship new features.",
      "Identify and correct bottlenecks and fix bugs.",
      "Help maintain code quality, organization, and automation.",
    ],
    requirements: [
      "Proficiency in JavaScript, including DOM manipulation and the JavaScript object model.",
      "Thorough understanding of React.js and its core principles.",
      "Experience with popular React.js workflows (such as Flux or Redux).",
      "Familiarity with newer specifications of EcmaScript.",
      "Experience with data structure libraries (e.g., Immutable.js).",
      "Knowledge of isomorphic React is a plus.",
      "Familiarity with RESTful APIs.",
      "Knowledge of modern authorization mechanisms, such as JSON Web Token.",
      "Familiarity with modern front-end build pipelines and tools.",
      "Experience with common front-end development tools such as Babel, Webpack, NPM, etc.",
      "Ability to understand business requirements and translate them into technical requirements.",
      "A knack for benchmarking and optimization.",
      "Familiarity with code versioning tools such as Git, SVN, and Mercurial.",
    ],
    benefits: [
      "Work in a dynamic and innovative environment.",
      "Opportunity for career growth and continuous learning.",
      "Competitive salary and company benefits.",
      "Flexible work arrangements, including remote work options.",
    ],
    salary: { min: 2000, max: 2000 },
    deadline: getRandomDateWithinDays(10),
    open_time: getRandomDateWithinDays(-10),
  },
  {
    _id: new ObjectId(),
    company_id: companies[1]._id,
    status: "open",
    title: "Product Manager",
    number_of_peoples: 2,
    type: "full-time",
    location_type: "on-site",
    description:
      "Create and optimize user interfaces for web applications. You will be responsible for the product planning and execution throughout the Product Lifecycle, including gathering and prioritizing product and customer requirements, defining the product vision, and working closely with engineering, sales, marketing, and support to ensure revenue and customer satisfaction goals are met.",
    responsibilities: [
      "Create and optimize user interfaces for web applications.",
      "Work closely with designers to implement user-friendly designs.",
      "Ensure the technical feasibility of UI/UX designs.",
      "Optimize applications for maximum speed and scalability.",
      "Maintain and improve the codebase for future use.",
    ],
    requirements: [
      "Proven work experience in product management or as an associate product manager.",
      "Proven track record of managing all aspects of a successful product throughout its lifecycle.",
      "Proven ability to develop product and marketing strategies and effectively communicate recommendations to executive management.",
      "Solid technical background with understanding and/or hands-on experience in software development and web technologies.",
      "Strong problem-solving skills and willingness to roll up one’s sleeves to get the job done.",
      "Skilled at working effectively with cross-functional teams in a matrix organization.",
      "Excellent written and verbal communication skills.",
      "MS/BS degree in Computer Science, Engineering or equivalent preferred.",
    ],
    benefits: [
      "Work in a dynamic and innovative environment.",
      "Opportunity for career growth and continuous learning.",
      "Competitive salary and company benefits.",
      "Collaborative and supportive team culture.",
    ],
    salary: { min: 1800, max: 1800 },
    emails: "hr@company1.com",
    deadline: getRandomDateWithinDays(10),
    open_time: getRandomDateWithinDays(-10),
  },

  {
    _id: new ObjectId(),
    company_id: companies[1]._id,
    status: "open",
    title: "Data Scientist",
    number_of_peoples: 3,
    type: "full-time",
    location_type: "hybrid",
    description:
      "Analyze and interpret complex data to help companies make decisions. You will be responsible for collecting, analyzing, and interpreting large datasets to identify trends, patterns, and insights that can drive business decisions.",
    responsibilities: [
      "Collect, analyze, and interpret large datasets.",
      "Develop and implement data models and algorithms.",
      "Work with cross-functional teams to identify business needs and provide data-driven solutions.",
      "Communicate findings and insights to stakeholders.",
      "Stay up-to-date with the latest data science trends and technologies.",
    ],
    requirements: [
      "Proven experience as a Data Scientist or similar role.",
      "Strong knowledge of data mining, machine learning, and statistical analysis.",
      "Proficiency in programming languages such as Python or R.",
      "Experience with data visualization tools such as Tableau or Power BI.",
      "Strong problem-solving skills and attention to detail.",
      "Excellent communication and teamwork skills.",
      "Degree in Computer Science, Data Science, or a related field.",
    ],
    benefits: [
      "Work in a dynamic and innovative environment.",
      "Opportunity for career growth and continuous learning.",
      "Competitive salary and company benefits.",
      "Flexible work arrangements, including hybrid work options.",
    ],
    salary: { min: 2200, max: 2200 },
    deadline: getRandomDateWithinDays(10),
    open_time: getRandomDateWithinDays(-10),
  },
  {
    _id: new ObjectId(),
    company_id: companies[3]._id,
    status: "open",
    title: "UX Designer",
    number_of_peoples: 4,
    type: "contract",
    location_type: "remote",
    description:
      "Design and improve user experiences for web and mobile applications. You will be responsible for creating user-friendly interfaces that enable users to understand how to use complex technical products.",
    responsibilities: [
      "Design and improve user experiences for web and mobile applications.",
      "Conduct user research and evaluate user feedback.",
      "Create wireframes, storyboards, user flows, process flows, and site maps.",
      "Collaborate with product management and engineering to define and implement innovative solutions for the product direction, visuals, and experience.",
      "Execute all visual design stages from concept to final hand-off to engineering.",
    ],
    requirements: [
      "Proven experience as a UX Designer or similar role.",
      "Strong portfolio of design projects.",
      "Familiarity with interaction design and information architecture.",
      "Proficient in design software (e.g., Sketch, Adobe XD, Figma).",
      "Knowledge of HTML/CSS; JavaScript is a plus.",
      "Problem-solving aptitude and analytical mind.",
      "Excellent communication skills.",
      "Degree in Design, Computer Science, or a related field.",
    ],
    benefits: [
      "Work in a dynamic and innovative environment.",
      "Opportunity for career growth and continuous learning.",
      "Competitive salary and company benefits.",
      "Flexible work arrangements, including remote work options.",
    ],
    salary: { min: 2500, max: 2500 },
    deadline: getRandomDateWithinDays(10),
    open_time: getRandomDateWithinDays(-10),
  },
];
