/* eslint quotes: "off", quote-props: "off", indent: "off" */

const mockUserData = {
    "users": [{
            "id": 12345,
            "name": "John Doe",
        },
        {
            "id": 67891,
            "name": "Jane Doe",
        },
        {
            "id": 23456,
            "name": "Sally Smith",
        },
        {
            "id": 78912,
            "name": "Sam Smuthers",
        },
    ],
    "getUserById": function(id) {
        const userIndex = mockUserData.users.findIndex(function(element) {
            return element.id === id;
        });
        return mockUserData.users[userIndex];
    },
    "getUserName": function(id) {
        const user = mockUserData.getUserById(id);
        if (user) {
            return user.name;
        }
        return null;
    },
};

module.exports = mockUserData;