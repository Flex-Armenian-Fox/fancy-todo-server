'use strict'
function getYesterday (today) {

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    let year = yesterday.getFullYear()
    let month = yesterday.getMonth()+1
    let date = yesterday.getDate()

    if (date < 10) {
        date = '0' + date;
    }

    if (month < 10) {
        month = '0' + month;
    }

    let yesterdayString = `${year}-${month}-${date}`
    return yesterdayString
    
}

module.exports = getYesterday