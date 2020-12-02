module.exports = {
    getTokenFromContext(context) {
        return context.req.headers.authorization || '';
    }
}