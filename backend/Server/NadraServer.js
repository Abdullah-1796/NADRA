import express from "express";
import pg from "pg";
import cors from "cors";
import bodyParser from "body-parser";

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


app.put("/Locker/Compartment/compstateid", (req, res) => {
    let lockerid = req.body.lockerid;
    let compid = req.body.compid;
    let compstateid = req.body.compstateid;

    const str = "update compartment set compstateid = " + compstateid +" where lockerid = " + lockerid + " and compid = " + compid;

    db.query(str, (err, data) => {
        if(err)
        {
            return res.json("Error");
        }
        return res.json("compstateid updated");
    });
});

app.get("/", (req, res) => {
    const str = "Select * from deliveryBox";

    db.query(str, (err, data) => {
        if(err)
        {
            return res.json("Error");
        }
        return res.json(data);
    });
});