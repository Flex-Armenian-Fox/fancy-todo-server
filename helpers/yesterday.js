'use strict'
function getYesterday (today) {

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    return yesterday
}

module.exports = getYesterday