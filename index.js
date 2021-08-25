const express = require('express');
const app = express();
const port = 3000;

let posts = require('./db/posts.json');

app.use(express.json()); // middleware untuk mengirim data json bisa menggunakan req.body

app.get('/api/v1/posts', (req, res) => {
    res.status(200).json(posts);
});

//endpoint GET
app.get('/api/v1/posts/:id', (req, res) => {
    //const post = posts.find(i => i.id == +req.params.id); // advanced

    const post = posts.find((item) => {
        return item.id == req.params.id;
    });
    res.status(200).json(post);
});

//endpoint POST
app.post('/api/v1/posts', (req, res) => {
    const title = req.body.title;
    const body = req.body.body;

    const lastItem = posts[posts.length - 1];
    const id = lastItem.id + 1;

    const post = { // object baru
        id: id,
        title: title,
        body: body
    }

    posts.push(post);

    res.status(201).json(post);
})


//endpoint PUT
app.put('/api/v1/posts/:id', (req, res) => {
    const index = posts.findIndex((item) => {
        return item.id == req.params.id;
    });

    posts[index].title = req.body.title;
    posts[index].body = req.body.body;

    res.status(200).json(posts[index]);
});

//endpoint DELETE
app.delete('/api/v1/posts/:id', (req, res) => {
    posts = posts.filter((item) => {
        return item.id != req.params.id;
    })

    res.status(200).json({
        message: `Post dengan id ${req.params.id} sudah berhasil dihapus!`
    });
});



app.listen(port, () => {
    console.log(`Server ready -> http://localhost:${port}`);
});