import express from "express";
import bodyParser from "body-parser";
import { saveEmployee, findEmployee, updateEmployee, deleteEmployee, findAllEmployee } from "./main.js";
const port = 3000;
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile("/templates/index.html", { root: '.' });
})
app.get('/save', (req, res) => {
    res.sendFile("/templates/save.html", { root: '.' });
})
app.get('/find', (req, res) => {
    res.sendFile("/templates/getDetails.html", { root: '.' });
})
app.get('/update', (req, res) => {
    res.sendFile("/templates/update.html", { root: '.' });
})
app.get('/delete', (req, res) => {
    res.sendFile("/templates/delete.html", { root: '.' });
})
app.get('/find-all', (req, res) => {
    res.redirect('/find-all/acknowledgement')
})
app.use(function (req, res, next) {
    const a = req.body.name;
    const b = req.body.language;
    const c = req.body.city;
    if (a != null) {
        for (const it of a) {
            if (!(it >= 'A' && it <= 'Z' || (it >= 'a' && it <= 'z'))) {
                res.locals.type = 5;
                return res.render("response.ejs", { root: '.' });
            }
        }
    }
    if (b != null) {
        for (const it of b) {
            if (!(it >= 'A' && it <= 'Z' || (it >= 'a' && it <= 'z'))) {
                res.locals.type = 5;
                return res.render("response.ejs", { root: '.' });
            }
        }
    }
    if (c != null) {
        for (const it of c) {
            if (!(it >= 'A' && it <= 'Z' || (it >= 'a' && it <= 'z'))) {
                res.locals.type = 5;
                return res.render("response.ejs", { root: '.' });
            }
        }
    }
    next();
}
);
app.post('/save/acknowledgement', async (req, res) => {

    const object = req.body;
    res.locals.type = 5;
    try {
        await saveEmployee(object);
        res.locals.type = 2;
    }
    catch {

    }
    finally {
        res.render("response.ejs", { root: '.' });
    }
});
app.get('/find/acknowledgement', async (req, res) => {
    const name = req.query.name;
    res.locals.type = 5;
    try {
        let employee = await findEmployee(name);
        res.locals.type = 1;
        res.locals.obj = employee;
    }
    catch {

    }
    finally {
        res.render("response.ejs", { root: '.' });
    }
});
app.post('/update/acknowledgement', async (req, res) => {
    const object = req.body;
    res.locals.type = 5;
    try {
        await updateEmployee(object);
        res.locals.type = 3;
    }
    catch {

    }
    finally {
        res.render("response.ejs", { root: '.' });
    }
});
app.post('/delete/acknowledgement', async (req, res) => {
    const object = req.body;

    res.locals.type = 5;
    try {
        await deleteEmployee(object.name);
        res.locals.type = 4;
    }
    catch {

    }
    finally {
        res.render("response.ejs", { root: '.' });
    }
});
app.get('/find-all/acknowledgement', async (req, res) => {
    res.locals.type = 5;
    try {
        let employeeArr = await findAllEmployee();
        res.locals.type = 6;
        res.locals.obj = employeeArr;
    }
    catch {

    }
    finally {
        res.render("response.ejs", { root: '.' });
    }
});
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);

})