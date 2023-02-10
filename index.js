const express = require('express');
const app = express();
const router = express.Router();
const { create } = require('express-handlebars'); //npm i express-handlebars


//RUTAS
router.get("/", (req, res) =>{
    res.render("home");
})

router.get("/contactos", (req, res) =>{
    res.render("contactos");
})

router.get("/producto/:id", (req, res) =>{
    let productos = [{id: 1, nombre: "producto 1"}, {id: 2, nombre: "producto 2"}, {id: 3, nombre: "producto 3"}]
    let id = req.params.id;
    let found = productos.find(producto => producto.id == id);
    if(found) return res.send(found.nombre);
    res.send("Producto no encontrado.");
})



/* router.get("/zapatilla", (req, res) =>{
    res.sendFile(__dirname+"/imagenes/zapatilla1.webp");
}) */


//CONNFIGURACIONES Y MIDDLEWARES
const hbs = create({
    partialsDir: ["views/partials"]
})

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/", router)

//publicar una carpeta o archivo
app.use("/public", express.static(__dirname+"/public"));


app.listen(3000, () => console.log("http://localhost:3000"))