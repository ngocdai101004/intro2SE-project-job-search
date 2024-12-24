import { ObjectId } from "mongodb";
import { users } from "./users";

export const companies = [
  {
    _id: new ObjectId(),
    owner_id: users[0]._id,
    admin_id: [users[1]._id],
    company_name: "TechCorp",
    address: {
      district: "District 3",
      city_state: "Da Nang",
      zip_code: "550000",
      country: "Vietnam",
    },
    description: {
      company_size: [200],
      industry: "Technology",
      headquarters: "Da Nang, Vietnam",
      links: ["https://techcorp.vn"],
      founded: new Date("2010-01-01"),
      specialities: ["Software Development", "AI", "Cloud Computing"],
    },
    short_description: "Innovative tech solutions.",
    number_of_employees: 200,
    number_of_followers: 1,
    legal_document_url: "https://techcorp.vn/legal",
    reviews: [
      {
        user_id: users[1]._id,
        rating: 5,
        review: "Great company to work for!",
      },
    ],
    followers: [users[0]._id],
  },
];
