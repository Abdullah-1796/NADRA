import express from "express";
import pg from "pg";
import cors from "cors";
import bodyParser from "body-parser";
import recognizeFace from "./modules/recognizeFace.js";

const port = 3005;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "nadra",
    password: "12345678",
    port: 5432,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to postgres database: ');
        return;
    }
    console.log('Connected to postgres database');
});

app.listen(port, () => {
    console.log(`Server is listening from port ${port}.`);
});

// app.use(cors({
//     origin: "*", // Allow all origins
// }));

app.post("/users", async (req, res) => {
    let cnic = req.body.cnic;
    let fName = req.body.fName;
    let lName = req.body.lName;
    let age = req.body.age;
    let dob = req.body.age;
    let gender = req.body.gender;
    let address = req.body.address;
    let url = req.body.url;

    //const str = "insert into users(cnic, fName, lName, age, dob, gender, address, url) values("+cnic+","+fName+", "+lName+", "+age+", "+dob+", "+gender+", "+address+", "+url+")";

    const str1 = `INSERT INTO users (cnic, fName, lName, age, dob, gender, address, url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const values = [cnic, fName, lName, age, dob, gender, address, url];

    console.log("register called");
    db.query(str1, values, (err, data) => {
        if (err) {
            return res.json("Error: " + err);
        }
        return res.json("user added");
    });
});

app.post("/faceRecognition", async (req, res) => {
    let cnic = req.body.cnic;
    let image_url2 = req.body.image_url;

    console.log(cnic);
    console.log(image_url2);

    const str1 = "select * from users where cnic = $1";
    const values = [cnic];
    console.log("faceRecognition API called");
    try {
        const response = await db.query(str1, values);
        //console.log(response);
        if(response.rows.length > 0)
        {
            const image_url1 = response.rows[0].url;
            console.log("Image URL 1: " + image_url1);
            console.log("Image URL 2: " + image_url2);
            const result = await recognizeFace(image_url1, image_url2);
            console.log(result.match);
            //res.json({matchResult: result});
            res.json({result: result.match});
        }
        else {
            res.status(401).json({message: "User not registered"});
        }
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
});

app.get("/", (req, res) => {
    const str = "Select * from users";

    db.query(str, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});