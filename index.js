const express = require('express');
const port = 8000;
const app = express();

app.use(express.urlencoded());
app.set('view engine', 'ejs');
const db = require('./config/db');
const crud = require('./models/tbl');

app.get('/', (req, res) => {
    crud.find({})
        .then((record) => {
            return res.render('view', {
                record
            })
        }).catch((error) => {
            console.log(error);
            return false;
        })
})

app.get('/add', (rreq, res) => {
    return res.render('add');
})

app.post('/addRecord', (req, res) => {
    let name = req.body.name;
    let publishedyear = req.body.publishedyear;
    let authorname = req.body.authorname;
    let bookpages = req.body.bookpages;
    let price = req.body.price;
    crud.create({
        name, publishedyear, authorname, bookpages, price
    }).then((rec) => {
        console.log('sucessfully Added');
        return res.redirect('/');
    }).catch((error) => {
        console.log(error);
        return false;
    })
})

app.get('/deleteRecord', (req, res) => {
    crud.findByIdAndDelete(req.query.delid)
        .then((rec) => {
            console.log('Delete Sucessfully');
            return res.redirect('/');
        }).catch((error) => {
            console.log(error);
            return false;
        })
})

app.get('/editRecord', (req, res) => {
    crud.findById(req.query.editid)
        .then((single) => {
            return res.render('edit', {
                single
            })
        }).catch((error) => {
            console.log(error);
            return false;
        })
})

app.post('/updateRecord', (req, res) => {
    crud.findByIdAndUpdate(req.body.editid, {
        name: req.body.name,
        publishedyear: req.body.publishedyear,
        authorname: req.body.authorname,
        bookpages: req.body.bookpages,
        price: req.body.price
    }).then((rec) => {
        console.log('Update Sucessfully');
        return res.redirect('/');
    }).catch((error) => {
        console.log(error);
        return false;
    })
})

app.listen(port, (error) => {
    if (error) {
        console.log(error);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})