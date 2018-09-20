module.exports = function(req, res, next) {
    res.success = function(data) {
        res.json({
            code: 0,
            data
        })
    }
    res.error = function(err) {
        res.json({
            code: 1,
            err
        });
    }
    next();
}
