const express = require('express'); //Modul express 
const apiDetailedRoute = express.Router();

const shoe = 'Dieser Schuh ist aus einem hochwertigen Leder hergestellt worden.'
const pants = 'Diese Hose ist aus einem hochwertigen Stoff hergestellt worden.'
const skirt = 'Dieses Kleid ist aus einem hochwertigen Stoff hergestellt worden.'
const materialInfo = 'Kleidungen dürfen nicht in der Waschmaschine gewaschen sondern müssen mit Hand gewaschen werden'
const fitShoe = '43'
const fitPants = '42'
const detailedInfo = [
    { imageUrl: './komfi_sportschuh.jpeg', vendor: "Boutique Amarra", name: "Komfi Sportschuh", price: 100.00, description:shoe, matInfo: materialInfo, size:fitShoe},
    { imageUrl: "./kleid.webp", vendor: "Amari", name: "Elegantes Kleid", price: 100.00, description:skirt, matInfo: materialInfo, size:fitPants},
    { imageUrl: "./High_Heel.jpeg",vendor: "Stephans Kleidershop",name: "High Heel Elegant", price: 100.00, description:shoe, matInfo: materialInfo, size:fitShoe },
    { imageUrl: "./Schuh_Normal.jpeg",vendor: "Vera",name: "Schuh Normal", price: 100.00, description:shoe, matInfo: materialInfo, size:fitShoe },
    { imageUrl: "./Hose.webp",vendor: "Kleiderwelt",name: "Hose", price: 100.00, description:pants, matInfo:materialInfo, size:fitPants}
]

apiDetailedRoute.get('/', (req,res) => { 
    const search  = req.query.search; // same as const {search} = req.query

    //if(!search) //If search empty
       // return res.json( "Empty!"); //Return all rec 
        
     const result = detailedInfo
        .filter(item => { 
            const query = search.toLowerCase();
            return(
                item.name.toLowerCase().indexOf(query) >=0
            )
        }) 

        res.json({detailedInfo:result})
})
module.exports = { apiDetailedRoute };
