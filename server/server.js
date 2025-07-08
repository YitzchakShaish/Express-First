import express from "express";
const app  = express();
const users = [{
    userName: "Yitzchak"
}];
app.get('/', (req, res) =>{
    res.send("Welcome to home!")
});
app.get('/users/:username', (req, res) =>{
    const { username } = req.params;
    console.log(username);
    
    res.json(users)
});

app.get('/greet', (req, res) =>{
   
    
    res.json({ "msg": `hi from get endpoint ${new Date().toLocaleString()}` })
});


app.get('/about', (req, res) =>{
    res.send("About us")
});


app.listen(3005, ()=>{
    console.log(`server ranning`);
    
})