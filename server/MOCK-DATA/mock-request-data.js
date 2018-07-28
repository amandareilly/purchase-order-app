/* eslint quotes: "off", quote-props: "off", indent: "off" */
const mockUserData = require('./mock-user-data');

const mockRequestData = {
    "purchase_requests": [{
            "id": 1,
            "requestorId": "12345",
            "requestorName": mockUserData.getUserName(12345),
            "createdAt": 1529798400,
            "status": "complete",
            "items": [{
                    "id": 1529798401,
                    "name": "Kleenex, 150ct Box",
                    "qty": 5,
                    "pricePer": 3.99,
                    "neededBy": 1532995200,
                    "expeditedShipping": false,
                    "notes": "Lorem ipsum dolor sit amet...",
                },
                {
                    "id": 1529798402,
                    "name": "Pens, 20ct box",
                    "qty": 8,
                    "pricePer": 7.82,
                    "neededBy": 1532995200,
                    "expeditedShipping": false,
                    "notes": "Lorem ipsum dolor sit amet...",
                },
            ],
        },
        {
            "id": 2,
            "requestorId": "67891",
            "requestorName": mockUserData.getUserName(67891),
            "createdAt": 15297589200,
            "status": "created",
            "items": [{
                    "id": 1529798403,
                    "name": "Kleenex, 150ct Box",
                    "qty": 5,
                    "pricePer": 3.99,
                    "neededBy": 1532995200,
                    "expeditedShipping": false,
                    "notes": "Lorem ipsum dolor sit amet...",
                },
                {
                    "id": 1529798404,
                    "name": "Pens, 20ct box",
                    "qty": 8,
                    "pricePer": 7.82,
                    "neededBy": 1532995200,
                    "expeditedShipping": false,
                    "notes": "Lorem ipsum dolor sit amet...",
                },
            ],
        },
    ],
};
module.exports = mockRequestData;