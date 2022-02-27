const setError = (status, message) => {
    const error = new Error();

    error.message = message;

    error.status = status;

    return error;
};

module.exports = {
setError,
};
