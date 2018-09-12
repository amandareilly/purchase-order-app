const jwtDecode = require('jwt-decode');

class SharedApi {
    static checkForRequiredFields(fieldList, request) {
        let message = null;
        for (let i = 0; i < fieldList.length; i++) {
            const field = fieldList[i];
            if (!(field in request)) {
                message += `* Missing \`${field}\` in request. `;
            }
        }
        return message;
    }

    static constructApiUrl(req, endpoint) {

        return req.protocol + "://" + req.get('host') + '/api/' + endpoint;
    }

    static getUser(req) {
        if (req.user) {
            return req.user;
        } else if (req.cookies.jwt) {
            const token = req.cookies.jwt;
            return jwtDecode(token).user;
        }
    }

    static getHeadersWithToken(req, contentType = false, cookieString = false) {

        let token;
        if (req && req.cookies.jwt) {
            token = req.cookies.jwt;
        } else if (cookieString) {
            console.log("cookies string", cookieString);
            token = this.getFrontEndCookie('jwt', cookieString);
            console.log("cookie string token", token);
        } else {
            throw new Error('no valid token received')
        }
        const headers = {
            authorization: `Bearer ${token}`
        };
        if (contentType) {
            headers['Content-Type'] = 'application/json';
        }
        return headers;
    }

    static getFrontEndCookie(name, cookieString) {
        const cookies = cookieString.split('; ');
        const keyValMap = {};
        cookies.forEach((cookie) => {
            cookie = cookie.split('=');
            keyValMap[cookie[0]] = cookie[1];
        })
        console.log(keyValMap);
        return (keyValMap[name] ? keyValMap[name] : null);
    }
}

module.exports = SharedApi;