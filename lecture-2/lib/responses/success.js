module.exports = (res, message, stacode, data) => {
    res.status(stacode).json({
        status: "success",
        message: message,
        data,
    });
};
