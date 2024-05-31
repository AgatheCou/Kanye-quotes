import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
 
const app = express();
const port = process.env.PORT || 3000;
let content;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {content});
  });

app.get("/get-quote", async (req, res) => {
try {
    const response = await axios.get("https://api.kanye.rest");
    const result = response.data;
    console.log(result)
    res.render("index.ejs", { content: {quote : result.quote, label: "Another one" }});
} catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
    error: error.message,
    });
}
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
