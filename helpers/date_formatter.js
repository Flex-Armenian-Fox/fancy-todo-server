// fungsi untuk memformat tanggal dan mengurangi nya berdasarkan paramater yang dilempar
module.exports = (date, substract = 0) => {
    let dateTime = new Date(date)
    dateTime.setDate(dateTime.getDate() - substract)
    return dateTime.toISOString()
}