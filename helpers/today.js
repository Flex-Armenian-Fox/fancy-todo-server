'use strict'
function getToday (today) {

    let year = today.getFullYear()
    let month = today.getMonth()+1
    let date = today.getDate()

    if (date < 10) {
        date = '0' + date;
    }

    if (month < 10) {
        month = '0' + month;
    }

    let todayString = `${year}-${month}-${date}`
    return todayString
    
}

module.exports = getToday