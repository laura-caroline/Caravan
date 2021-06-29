const {trips, orders} = require('../databases/models')
const {getHourDate} = require('../utils/getHourDate')
const {
  format,
  parseISO,
  setDate,
  setMonth,
  setYear,
  getHours,
  eachHourOfInterval,
  areIntervalsOverlapping
} = require('date-fns')

module.exports = async (request, response)=> {
  const {
      id,
      date
  } = request.params

  const currentDate = date

  // Pega o horário inicial e final da atração que selecionei
  const getAttraction = await trips.findOne({where:{id}})
  const startSchedule = parseISO(format(getAttraction.schedule_initial, 'yyyy-MM-dd HH:mm'))
  const endSchedule = parseISO(format(getAttraction.schedule_end, 'yyyy-MM-dd HH:mm'))
  const duration = parseISO(format(getAttraction.duration, 'yyyy-MM-dd HH:mm'))
  
  // Pegar o intervalo desses horarios, pulando esses intervalos em relação a duranção da atração
  const betweenSchedules = eachHourOfInterval({start: startSchedule, end: endSchedule},{step: getHours(duration)})
  
  // Mudo o fomato da horario desses intervalos
  const modifiedDateSchedules = betweenSchedules.map((item)=>{
      const [day, month, year] = currentDate.split('-')
      const parsedDate = parseISO(format(item, 'yyyy-MM-dd HH:mm'))
      const modifiedDay = setDate(parsedDate, day)
      const modifiedMonth = setMonth(modifiedDay, month -1)
      const modifiedYear = setYear(modifiedMonth, year )
      return parseISO(format(modifiedYear, 'yyyy-MM-dd HH:mm'))
  })
  const schedules = []
 // Transformo essa array de horarios em um objeto com as propriedades schedule_initial e schedule_end
 // E adiciono esse objeto em schedues
  for(let i=0; i < modifiedDateSchedules.length-1; i++){
      const obj = {}
      obj['schedule_initial'] = modifiedDateSchedules[i]
      obj['schedule_end'] = modifiedDateSchedules[i+1]
      schedules.push(obj)
  }
  const busySchedules = await orders.findAll({where:{id_trip: id}})
  

  if(busySchedules.length > 0){
      const filteredSchedulesDisponibles = schedules.filter(
          (scheduleDisponible) =>
            !busySchedules.some((busySchedule) =>
              areIntervalsOverlapping(
                {
                  start: new Date(busySchedule.schedule_initial),
                  end: new Date(busySchedule.schedule_end)
                },
                {
                  start: new Date(scheduleDisponible.schedule_initial),
                  end: new Date(scheduleDisponible.schedule_end)
                }
              )
            )
        )
        if(filteredSchedulesDisponibles.length > 0){
          const modifiedSchedulesDisponibles = filteredSchedulesDisponibles.map((scheduleDisponible)=>{
              return {
                schedule_initial: getHourDate(scheduleDisponible.schedule_initial),
                schedule_end: getHourDate(scheduleDisponible.schedule_end)
              }
          })
          return response.status(200).send(modifiedSchedulesDisponibles)
        }
        return response.status(203).send({error: 'Não há horarios disponiveis'})
  }
  const modifiedSchedules = schedules.map((schedule)=>{
      return (
        {
          schedule_initial: getHourDate(schedule.schedule_initial),
          schedule_end: getHourDate(schedule.schedule_end)
        }
      )
  })
  return response.status(200).send(modifiedSchedules)
    
}