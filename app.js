import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/weather", async (req, res) => {
    const cities = req.body.cities.split(" ");
    let weather = [];
    for (let city of cities) {
        let data = null;
        await axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=747b22084193050bc8bdef1778185940&units=metric`
            )
            .then(function (response) {
                // handle success
                data = response.data.main.temp;
                weather.push(data);
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
                weather.push(data);
            });
    }
    console.log(weather);
    res.send("Post");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
