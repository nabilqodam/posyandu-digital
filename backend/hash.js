const bcrypt = require('bcryptjs');

const passwords = [
    'admin123',
    'super123',
    'password123'
];

async function generateHash() {

    for (const password of passwords) {

        const hash = await bcrypt.hash(password, 10);

        console.log(`${password} => ${hash}`);

    }

}

generateHash();