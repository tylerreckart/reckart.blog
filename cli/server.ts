import express from "express";
import colors from "colors";
import fetch from "node-fetch";
import bodyParser from 'body-parser';
require('dotenv').config()

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("build"));

app.get('/add-contact', async (req, res) => {
    const query = req.query;
    const { contact: email } = query;

    const uri = process.env.AC_API_URI || '';
    const key = process.env.AC_API_KEY || '';

    const request = await fetch(`${uri}/api/3/contacts`, {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'Api-Token': key,
        },
        method: 'POST',
        body: JSON.stringify({
            contact: {
                email,
            }
        })
    });

    const response = await request;

    if (response.status == 201) {
        const json = await response.json();
        const { contact } = json;
        res.send(JSON.stringify(contact));
    } else {
        res.sendStatus(500);
    }
});

app.listen(2056, (): void =>
  console.log(
    colors.green("[express] production server running on port 2056")
  )
);