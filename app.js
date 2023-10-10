const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

//view template engine
app.set("view engine", "pug");
app.set("views", __dirname+"/views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));


//데이터베이스에 연결
const conn = mysql.createConnection({
    host: 'http://pjc.dothome.co.kr:3306',
    user: 'pjc',
    database: 'smaw2208!'
});

// simple query
conn.query(
    'SELECT * FROM `contact',
    function(err, results, fields) {
      console.log(results); // 서버로부터 반환되는 결과행
      console.log(fields); // 결과에 따른 메타데이터
    }
);

// routing : 경로에 해당하는 파일을 지정하는 방법
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/portfolio", (req, res) => {
    res.render("portfolio");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});
//등록하려는 문의 정보를 서버로 전송!
app.post("/contactAdd", (req, res) => {
    let type = req.body.title? 요청:문의 ==1;
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let title = req.body.title;
    let memo = req.body.memo;
    console.log(type, name, phone, email, title, memo);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});