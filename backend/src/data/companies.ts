import { ObjectId } from "mongodb";
import { users } from "./users";

export const companies = [
  {
    _id: new ObjectId("67773cd820a2ca18b092cf8b"),
    owner_id: users[0]._id,
    admin_id: [users[1]._id, users[2]._id],
    company_name: "TechVibes Inc.",
    sumRating: 14,
    followers: [users[3]._id, users[4]._id],
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
    reviews: [
      {
        user_id: users[3]._id,
        rating: 5,
        review: "Great place to work with a strong focus on innovation!",
        date: new Date("2023-12-15"),
      },
      {
        user_id: users[4]._id,
        rating: 4,
        review: "Good opportunities for growth but high workload.",
        date: new Date("2023-11-25"),
      },
      {
        user_id: users[5]._id,
        rating: 5,
        review: "Supportive management and collaborative environment.",
        date: new Date("2023-10-10"),
      },
    ],
    avatar: "https://jobsearch.nyc3.digitaloceanspaces.com/avatar/techvibe.jpg",
  },
  {
    _id: new ObjectId("67773cd820a2ca18b092cf8c"),
    owner_id: users[1]._id,
    admin_id: [users[0]._id, users[2]._id],
    company_name: "GreenTech Solutions",
    sumRating: 11,
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
    reviews: [
      {
        user_id: users[3]._id,
        rating: 4,
        review: "A company with great values and a meaningful mission.",
        date: new Date("2023-12-01"),
      },
      {
        user_id: users[4]._id,
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
    avatar:
      "https://jobsearch.nyc3.digitaloceanspaces.com/avatar/greentech.jpg",
  },
  {
    _id: new ObjectId("67773cd820a2ca18b092cf90"),
    owner_id: users[2]._id,
    admin_id: [users[1]._id, users[0]._id],
    company_name: "EduGlobal",
    sumRating: 7,
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
    reviews: [
      {
        user_id: users[3]._id,
        rating: 5,
        review: "Great mission and impactful work.",
        date: new Date("2023-12-05"),
      },
      {
        user_id: users[4]._id,
        rating: 5,
        review: "Supportive environment for both employees and clients.",
        date: new Date("2023-11-20"),
      },
      {
        user_id: users[5]._id,
        rating: 4,
        review: "Exciting projects but needs more resources.",
        date: new Date("2023-10-15"),
      },
    ],
    avatar:
      "https://jobsearch.nyc3.digitaloceanspaces.com/avatar/eduglobal.png",
  },
];
