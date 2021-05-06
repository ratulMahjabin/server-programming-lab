const http = require("http");
const lc = require("./loadContent.js")

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.write(lc.data.index);
        res.end();
    } else if (req.url == "/about") {
        res.write(lc.data.about);
        res.end();
    } else if (req.url == "/blog") {
        res.write(lc.data.blog);
        res.end();
    } else if (req.url == "/contact") {
        res.write(lc.data.contact);
        res.end();
    } else if (req.url == "/pricing") {
        res.write(lc.data.pricing);
        res.end();
    } else if (req.url == "/services") {
        res.write(lc.data.service);
        res.end();
    } else if (req.url == "/work") {
        res.write(lc.data.work);
        res.end();
    } else {
        res.write("<h1>This Page Doesn't Exist</h1><br><a href = '/'> Go To Base </a>")
        res.end();
    }
    //console.log(req);
});

module.exports = { server };