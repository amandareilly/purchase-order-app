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
}

module.exports = SharedApi;