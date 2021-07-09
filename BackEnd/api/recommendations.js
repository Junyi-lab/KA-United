const express = require('express'); //Modul express 
const apiRecommendationsRoute = express.Router();

const recommendations = [
    { imageUrl: './komfi_sportschuh.jpeg', vendor: "Boutique Amarra", name: "Komfi Sportschuh", price: 100.00 },
    { imageUrl: "./kleid.webp", vendor: "Amari", name: "Elegantes Kleid", price: 100.00 },
    { imageUrl: "./High_Heel.jpeg",vendor: "Stephans Boutique",name: "High Heel Elegant", price: 100.00 },
    { imageUrl: "./Schuh_Normal.jpeg",vendor: "Vera",name: "Schuh Normal", price: 100.00 },
    { imageUrl: "./Hose.webp",vendor: "Klamottenwelt",name: "Hose", price: 100.00 }
]

apiRecommendationsRoute.get('/', (req,res) => { 
    let search  = req.query.search; // same as const {search} = req.query

    if(!search) //If search empty
        return res.json({ recommendations }); //Return all rec 
    
    if(search.includes('schuh') || (search.includes('Schuh')))
    search = 'schuh'
    if (search.includes('High_Heel'))
    search = 'High Heel'
    if(search.includes('Hose'))
    search = 'Hose'
    if(search.includes('kleid'))
    search = 'kleid' /* Noch nicht ganz optimale Lösung! */

    const result = recommendations
        .filter(item => { 
            const query = search.toLowerCase();
            return(
                item.vendor.toLowerCase().indexOf(query) >=0 ||
                item.name.toLowerCase().indexOf(query)>=0//Filter vendor or name 
            )
        })



    res.json({ recommendations: result }); 
})
    
module.exports = { apiRecommendationsRoute };
