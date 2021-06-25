const express = require('express'); //Modul express 
const cors = require('cors')
const { apiRecommendationsRoute } = require("./api/recommendations"); //Import 
const { apiDetailedRoute} = require ("./api/detailedInformation"); 

const app = express(); //New Server with express
app.use(cors())

app.get('/',(req,res) => { //Search Function 
    res.send("Hello World");
})

app.use('/api/recommendations', apiRecommendationsRoute); //If request matches --> apiRoute; Is the path, where data lies

/* app.get('/detail', (req,res) => {
    res.send("Detailed Information")
})   */

app.use('/api/detailedInfo', apiDetailedRoute); //Fehler...


app.listen(3000,() => console.log('Server Listening on Port 3000'))