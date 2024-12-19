const bcrypt = require('bcryptjs');

export const users = [
    {
        first_name: 'Vo Anh',
        last_name: 'Tuan',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123', 10),
        isAdmin: true,
        phone: '123-456-7890',
        is_verified: false,
        verification_code: "123123"
    },
    {
        first_name: 'Phuc Dong',
        last_name: 'Song Gia',
        email: 'fuc@email.com',
        password: bcrypt.hashSync('124', 10),
        phone: '234-567-8901',
        is_verified: true,
        verification_code: ""
    },
    {
        first_name: 'Tuong Thanh',
        last_name: 'Huynh',
        email: 'tuonght@email.com',
        password: bcrypt.hashSync('125', 10),
        phone: '345-678-9012',
        is_verified: true,
        verification_code: ""
    },
    {
        first_name: 'Dai',
        last_name: 'TN',
        email: 'daitn@email.com',
        password: bcrypt.hashSync('122', 10),
        phone: '456-789-0123',
        is_verified: true,
        verification_code: ""
    }
];