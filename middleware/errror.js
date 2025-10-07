// // Error handling middleware
// const errorHandler = (err, req, res, next) => {
//     console.error(err.stack); // Console me error log
//     const status = err.status || 500;
//     const message = err.message || "Internal Server Error";
//     res.status(status).json({ error: message });
// };

// export default errorHandler








const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Console me error
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ error: err.message });
};

export default errorHandler;
