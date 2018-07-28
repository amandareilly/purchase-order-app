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

    static setUpdatableFields(fieldList, request) {
        const updated = {};
        fieldList.forEach((field) => {
            if (field in request) {
                updated[field] = request[field];
            }
        });

        return updated;
    }
}

module.exports = SharedApi;