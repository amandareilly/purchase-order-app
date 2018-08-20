class SharedApi {
    static checkForRequiredFields(fieldList, request) {
        let message = '';
        for (let i = 0; i < fieldList.length; i++) {
            const field = fieldList[i];
            if (!(field in request)) {
                message += `* Missing \`${field}\` in request. `;
            }
        }
        return message;
    }
}

module.exports = SharedApi;