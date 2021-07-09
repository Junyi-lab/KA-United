//Information about the user will be fetched on demand

const express = require('express'); //Modul express 
const apiUserinformationRoute = express.Router();

const userInformation = [
    { name: 'Junyi Zhou', lastOrder: 'Komfi Sportschuh', adress: 'Karl Friedrichstraße 11', shoeSize: '37' },
    { name: 'Sabine Meier', lastOrder: 'High Heel', adress: 'Schusterstraße 30', shoeSize: '44' },
    { name: 'Jacob Jones', lastOrder: 'Hose', adress: 'Karl-Wilhelm-Straße 30', shoeSize: '44' },
    { name: 'Aaron Metzger', lastOrder: 'Schuhe normal', adress: 'Adenauerplatz 20', shoeSize: '44' }
]

apiUserinformationRoute.get('/', (req, res) => {
    let search = req.query.search; // same as const {search} = req.query
    if (!search)
        return res.json({ userInformation })
    const result = userInformation
        .filter(user => {
            const query = search.toLowerCase();
            return (
                user.name.toLowerCase().indexOf(query) >= 0//Filter vendor or name 
            )
        })



    res.json({ userInformation: result });
})

module.exports = { apiUserinformationRoute };
