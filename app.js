import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const port = 3000
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('/chart.js', express.static("node_modules/chart.js/dist"));


app.get("/", async (req, res) => {
    res.render("index.ejs")
});


app.get("/admin/login", async (req, res) => {
    res.render("login.ejs")
}) 


app.get("/add-panel", async (req, res) => {
    res.render("add-panel.ejs")
}) 


app.get("/panels", async (req, res) => {
    try {
        const response = (await axios.get("http://localhost:8080/api/panels")).data
        res.render("panels.ejs", {data: response});
    } catch (error) {
        res.render("panels.ejs", {error: error});
    }
});


app.get("/panels/:panelId", async (req, res) => {
    try {
        const response = (await axios.get(`http://localhost:8080/api/panels/${req.params.panelId}`)).data
        res.render("single_panel.ejs", {data: response});
    } catch (error) {
        console.log(error.response.data);
        res.render("single_panel.ejs", {error: error.response.data});
    }
});


app.get("/panels/:panelId/stats", async (req, res) => {
    try {
        console.log(req.query.kwh);
        const response = (await axios.get("http://localhost:8080/api/panels/" + req.params.panelId + "/stats", {
            params: {
                kwh: req.query.kwh
            }
        })).data
        res.render("single_panel.ejs", {stats: response});
        console.log(response);
    } catch (error) {
        console.log(error.response.data);
        res.render("single_panel.ejs", {error: error.response.data});
    }
});


app.get("/sobre", async (req, res) => {
    res.render("sobre.ejs");
});


app.get("*", (req, res) => {
    res.render("error.ejs");
})


app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
});