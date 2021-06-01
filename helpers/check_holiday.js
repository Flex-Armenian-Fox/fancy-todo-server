const Calendarific = require('calendarific')
const CALENDARIFIC_API_KEY = process.env.CALENDARIFIC_API_KEY

const checkHoliday = (country, dateArgs) => {
    const clapi = new Calendarific(CALENDARIFIC_API_KEY)

    return new Promise((resolve, reject) => {
        const date = new Date(dateArgs)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const params = { country, year, month, day }

        clapi.holidays(params, (data) => {
            resolve(data.response.holidays)
        })
    })
}

module.exports = checkHoliday