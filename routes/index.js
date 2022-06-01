var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Intagible Controllers" });
});

router.get("/test", function (req, res, next) {
    res.render("test", {
        title: "Intagible Controllers",
        scriptRequired: true,
    });
});
router.get("/code", function (req, res, next) {
    res.render("code", {
        title: "Intagible Controllers",
        scriptRequired: true,
    });
});

module.exports = router;
