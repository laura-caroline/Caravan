const {format} = require('date-fns')

const getHourDate = (date)=>{
    console.log(date)
    const formatedDate = format(date, 'yyyy-MM-dd HH:mm')
    const [, hour] = formatedDate.split(' ')
    return hour;

}
const getDate = (date)=>{
    const formatedDate = format(date, 'dd-MM-yyyy HH:mm')
    const [data, _] = formatedDate.split(' ')
    return data;
}
module.exports = {getHourDate, getDate};
