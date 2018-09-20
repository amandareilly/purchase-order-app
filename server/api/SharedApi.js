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
        return new Promise((resolve, reject) => {
            let user;
            if (req.user) {
                user = req.user;
            } else if (req.cookies.jwt) {
                const token = req.cookies.jwt;
                user = jwtDecode(token).user;
            }

            if (user) {
                resolve(user);
            } else {
                reject(false);
            }
        })

    }

    static getHeadersWithToken(req, contentType = false, cookieString = false) {
        let headers = {};
        let token;
        if (req) {
            if (req.headers['x-test-bypass-auth']) {
                headers['X-TEST-BYPASS-AUTH'] = 'true';
            } else if (req.cookies.jwt) {
                token = req.cookies.jwt;
            }

        } else if (cookieString) {
            token = this.getFrontEndCookie('jwt', cookieString);
        } else {
            throw new Error('no valid token received')
        }

        headers['authorization'] = `Bearer ${token}`;

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
        return (keyValMap[name] ? keyValMap[name] : null);
    }
}

module.exports = SharedApi;