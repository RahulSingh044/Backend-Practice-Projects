const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { title } = require('process');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/', (req, res) => {
 fs.readdir(`./files`, function(err, files) {
   res.render('index', {files: files , title});
 });
});

app.get('/files/:filename', function(req, res) {
  fs.readFile(`./files/${req.params.filename}.txt`, "utf-8", function(err, filedata) {
   res.render('show',{ filename: req.params.filename, filedata:  filedata});
  });
});

app.get('/edit/:filename', function(req, res) {
  res.render('edit',{filename: req.params.filename});
});

app.post('/edit', function(req, res) {
  fs.rename(`./files/${req.body.previous.split(' ').join('')}.txt`, `./files/${req.body.new.split(' ').join('')}.txt`, (err) => {
    res.redirect("/");
  });
});

app.post('/create', (req, res) => {
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,`${req.body.description}`, function(err) {
    res.redirect('/');
  });
});

app.listen(3000);