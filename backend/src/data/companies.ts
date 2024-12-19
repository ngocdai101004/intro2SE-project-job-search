import {ObjectId} from "mongodb";
import {users} from "./users";

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
            country: "Vietnam"
        },
        description: "Leading tech company in Vietnam.",
        short_description: "Innovative tech solutions.",
        number_of_employees: 200,
        reviews: [
            {
                user_id: users[1]._id,
                rating: 5,
                review: "Great company to work for!"
            }
        ]
    }
];

