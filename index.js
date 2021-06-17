const express = require('express')
const app = express()
const port = 3000
var time = new Date();
var date = time.getHours() + ':' + time.getMinutes();
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

//step2
app.get('/', (req, res) => {
    res.send('Ok')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:3000`)
})

//step3

app.get('/test', (req, res) => {
    res.send({ status: 200, message: "ok" })
})

app.get('/time', (req, res) => {
    res.send({ status: 200, message: date })
})


//step4


app.get('/hello/:name', (req, res) => {
    res.send({ status: 200, message: "hello " + req.params.name });
})

app.get('/hello/', (req, res) => {
    res.send({ status: 200, message: "hello" });
})

app.get('/search', (req, res) => {
        const search = req.query.s;
        if (search == "") {
            res.status(500);
            res.send({ status: 500, error: true, message: "you have to provide a search" });
        }
        res.send({ status: 200, message: "ok", data: search });
    })
    //step5

app.get('/movies/add', (req, res) => {
    res.send({ status: 200, message: "ok", data: movies });
})

app.get('/movies/get', (req, res) => {
    res.send({ status: 200, message: "ok", data: movies });
})

app.get('/movies/edit', (req, res) => {
    res.send({ status: 200, message: "Ok", data: movies });
})

app.get('/movies/delete', (req, res) => {
    res.send({ status: 200, message: "ok", data: movies });
})

app.get('/movies/read', (req, res) => {
    res.send({ status: 200, message: "Ok", data: movies });
})

//step6

app.get('/movies/get/by-date', (rereqq, res) => {
    movies.sort(function(time, date) {
        var dateA = new Date(time.year),
            dateB = new Date(date.year);
        return dateA - dateB;
    });
    res.send({ status: 200, message: "Ok", data: movies });
})

app.get('/movies/get/by-rating', (req, res) => {
    movies.sort(function(date, time) {
        return time.rating - date.rating;
    });
    res.send({ status: 200, message: "Ok", data: movies });
})

app.get('/movies/get/by-title', (req, res) => {
    movies.sort(function(time, date) {
        var titleA = time.title.toLowerCase(),
            titleB = date.title.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
    });
    res.send({ status: 200, message: "Ok", data: movies });
})

//Step7

app.get('/movies/read/id/:id', (req, res) => {
    selectedId = req.params.id - 1;
    var result;
    console.log(movies.length);
    if (!isNaN(selectedId)) {
        if (selectedId < movies.length && selectedId >= 0) {
            result = movies[selectedId];
            res.send({ status: 200, message: result });
        } else {
            res.status(404);
            res.send({ status: 404, error: true, data: movies, message: "the movie " + (selectedId + 1) + " not exist" });
        }

    }

})

//step8
app.get('/movies/add', (req, res) => {

    let title = req.query.title;
    let year = req.query.year;
    let rating = req.query.rating;


    console.log(!title, !year, !rating, isNaN(year), year.length);
    if (!title == true || (!year == true || isNaN(year) == true || year.length != 4)) {
        res.send({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' })
    } else if (!rating == true) {
        rating = 4;
        movies.push({ title, year, rating });
        res.send({ status: 200, message: "Movie added to database tilte " + title + " Year " + year + " Rating " + rating + " /movies/read to read the database" });
    } else {
        movies.push({ title, year, rating });
        res.send({ status: 200, message: "Movie added to database tilte " + title + " Year " + year + " Rating " + rating + " /movies/read to read the database" });
    }


});

//step9

app.get('/movies/delete/:id', (req, res) => {
    if (!movies[req.params.id]) {
        res.status(404);
        res.send({ status: 404, error: true, message: 'the movie ' + req.params.id + ' does not exist' })
    } else {
        movies.splice(req.params.id, 1);
        res.send({ status: 200, data: movies });
    }
});

//step10

app.get('/movies/update/:id(\\d+)', (req, res) => {
    let id = req.params.id - 1;
    let title = req.query.title;
    let year = req.query.year;
    let rating = req.query.rating;
    let output;

    if (movies.length >= id) {
        if (title === undefined || title === "") {
            title = movies[id].title;
        }

        if (year === undefined || year === "" || !(/^\d{4}$/).test(year)) {
            year = movies[id].year;
        }

        if (rating === undefined || rating === "") {
            rating = movies[id].rating;
        }
        movies[id] = { title, year, rating };
        output = { data: movies };
        res.status(200).send(output)
    } else {
        output = {
            error: true,
            message: `the movie ${id+1} does not exist`,
        };
        res.status(404).send(output)
    }
});