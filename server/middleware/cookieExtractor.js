const cookieExtractor = function(req) {
    console.log("cookie extractor");
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    console.log('token:', token);
    return token;
};

module.exports = cookieExtractor;