import {Schema} from "mongoose";
import {ObjectId} from "mongodb";


const bcrypt = require('bcryptjs');

export const users = [
    {
        _id: new ObjectId(),
        first_name: "Vo Anh",
        last_name: "Tuan",
        email: "admin@email.com",
        password: "hashed_password_1",
        is_verified: true,
        verification_code: "123123",
        phone: "+1234567890",
        address: {
            district: "District 1",
            city_state: "Ho Chi Minh City",
            zip_code: "700000",
            country: "Vietnam"
        },
        gender: "male",
        date_of_birth: new Date("1990-01-01")
    },
    {
        _id: new ObjectId(),
        first_name: "Phuc Dong",
        last_name: "Song Gia",
        email: "fuc@email.com",
        password: "hashed_password_2",
        is_verified: true,
        phone: "+2345678901",
        address: {
            district: "District 2",
            city_state: "Hanoi",
            zip_code: "100000",
            country: "Vietnam"
        },
        gender: "male",
        date_of_birth: new Date("1985-08-20")
    }
];
