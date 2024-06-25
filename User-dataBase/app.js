const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set("view engine", "ejs")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;

    const user = await userModel.create({name, email, image})

    res.redirect('read');

});

app.get('/read', async (req, res) => {
 let alluser = await userModel.find();
    res.render('read', {users: alluser});
});

app.get('/delete/:id', async (req, res) => {
    let user = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
})

app.get('/edit/:userid', async (req, res) => {
    let user = await userModel.findOne({_id: req.params.userid});
    res.render('edit', {user: user});
});

app.post('/update/:id', async (req, res) => {
    let { name, email, image } = req.body; 
    let user = await userModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
    res.redirect("/read");
});

app.listen(3000);