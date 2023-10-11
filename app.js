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
    host: 'localhost',
    user: 'qkrwlscnf2',
    password: "smaw2208!",
    database: 'contact',
    dateStrings: "date"
});

// simple query
conn.query(
    `SELECT * FROM  contact.contacts`,
    function(err, results, fields) {
      console.log(results); // 서버로부터 반환되는 결과행
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
    let type = req.body.title == 1 ? "요청" : "문의";
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let title = req.body.title;
    let memo = req.body.memo;
    // console.log(type, name, phone, email, title, memo);
    let sql = `INSERT INTO contact.contacts(gubun, name, phone, email, title, memo, regdate)
    VALUES ('${type}', '${name}', '${phone}', '${email}', '${title}', '${memo}', CURRENT_DATE())`
    //query 실행명령
    conn.query(
        sql,
        function(err, results, fields) {
            if(err) throw error;
            console.log('정상적으로 데이터가 입력됨');
            res.send("<script>alert('등록되었습니다'); location.href='/';</script>");
        }
    );
});

app.get("/contactList", (req, res) => {
    let sql = "SELECT * FROM contact.contacts ORDER BY id DESC;";
    // simple query
    conn.query(
        sql,
        function(err, results, fields) {
            // console.log(results); // results contains rows returned by server
            res.render("contactList", {dataset: results})
        }
    );
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});