import express from "express";
import readEnvFile from './envReader.js';  // יש להתאים את הנתיב

const env = readEnvFile();

const PORT = 3005;
const app = express();
const users = [{
    userName: "Yitzchak"
}];


app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to home!")
});
app.get('/users/:username', (req, res) => {
    const { username } = req.params;
    console.log(username);

    res.json(users)
});

app.get('/greet', (req, res) => {


    res.json({ "msg": `hi from get endpoint ${new Date().toLocaleString()}` })
});

app.get('/greet/:name', (req, res) => {
    const { name } = req.params;
    console.log(`i got name ${name}`);
    res.json({ "msg": `got name ${name}` });
});

app.get('/test', async (req, res) => {
    const testName = "Bob";
    try {
        const response = await fetch(`http://localhost:${PORT}/greet/${testName}`);
        const data = await response.json();

        if (data.msg && data.msg.includes(testName)) {
            res.json({ result: "ok" });
        } else {
            res.json({ result: "fail" });
        }
    } catch (error) {
        console.error("Fetch error:", error);
        res.json({ result: "fail" });
    }
});

app.post('/action', async (req, res) => {
    if (!(req.body.action === "joke" || req.body.action === "cat fact")) {
        res.status(400).json({ "msg": "body is malformed" });
    }
    else if (req.body.action === "joke") {
        try {
            const response = await fetch(`https://official-joke-api.appspot.com/random_joke`);
            const data = await response.json();
            if (data && data.setup && data.punchline) {
                res.json({ joke: data.setup.toUpperCase() + " " + data.punchline.toUpperCase() })
            }
        } catch (error) {
            console.error("Fetch error:", error);
            res.json({ result: "fail" });
        }
    }
    else if (req.body.action === "cat fact") {
        try {
            //const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=11&api_key=live_0IH3UQFgp4FliuWItclLnl8SIOU08EykvkVO6ddASK3ba65KHqemZC62m13g3DPq");
            const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=11`, 
                {
                headers: {
                    "x-api-key": env.CAT_API_KEY
                }
            }
        );

            const data = await response.json();

            res.json({ length: data.length })

        } catch (error) {
            console.error("Fetch error:", error);
            res.json({ result: "fail" });
        }
    }
}
);

app.get('/about', (req, res) => {
    res.send("About us");
});


app.listen(PORT, () => {
    console.log(`server ranning in port ` + PORT);

})