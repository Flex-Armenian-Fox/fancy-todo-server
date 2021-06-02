'use strict'

const axios = require("axios");

class CovidController{
    static toList(req, res, next){
        axios.get('https://covid-19-tracking.p.rapidapi.com/v1',{
            headers: {
                "x-rapidapi-key": process.env.X_RAPID_API_KEY
            }
        })
        .then(result => {
            console.log(result.data[0])
            res.status(200).json({
                data: result.data[0]
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CovidController;