import express from "express";
import { templatesPath, viewsPath, publicPath } from "./paths.js";
import bodyParser from "body-parser";
import path from "path";
import { saveEmployee, findEmployee, updateEmployee, deleteEmployee } from "./main.js";
const port = 3000;
const app = express();
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/save', (req, res) => {
    let filePath = path.join(templatesPath, '/save.html');
    res.sendFile(filePath);
})
app.get('/find', (req, res) => {
    let filePath = path.join(templatesPath, '/getDetails.html');
    res.sendFile(filePath);
})
app.get('/update', (req, res) => {
    let filePath = path.join(templatesPath, '/update.html');
    res.sendFile(filePath);
})
app.get('/delete', (req, res) => {
    let filePath = path.join(templatesPath, '/delete.html');
    res.sendFile(filePath);
})
app.post('/save/acknowledgement', async (req, res) => {
    
    const object = req.body;
    for (const key in object) {
        const element = object[key];
        
    }
    let filePath = path.join(viewsPath, '/response.ejs');
    
    res.locals.type = 5;
    try {
        await saveEmployee(object);
        res.locals.type = 2;
    }
    catch {
        
    }
    finally {
        res.render(filePath);
    }
});
app.get('/find/acknowledgement', async (req, res) => {
    const name = req.query.name;
    
    let filePath = path.join(viewsPath, '/response.ejs');
    
    res.locals.type = 5;
    try {
        let employee = await findEmployee(name);
        res.locals.type = 1;
        res.locals.obj = employee;
        

    }
    catch {
        
    }
    finally {
        res.render(filePath);
    }
});
app.post('/update/acknowledgement', async (req, res) => {
    
    const object = req.body;
    for (const key in object) {
        const element = object[key];
        
    }
    let filePath = path.join(viewsPath, '/response.ejs');
    
    res.locals.type = 5;
    try {
        await updateEmployee(object);
        res.locals.type = 3;
    }
    catch {
        
    }
    finally {
        res.render(filePath);
    }
});
app.post('/delete/acknowledgement', async (req, res) => {
    const object = req.body;
    
    let filePath = path.join(viewsPath, '/response.ejs');
    
    res.locals.type = 5;
    try {
        await deleteEmployee(object.name);
        res.locals.type = 4;
    }
    catch {
        
    }
    finally {
        res.render(filePath);
    }
});
app.listen(port, () => {
    
})