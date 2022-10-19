import { useState } from 'react'
import { addDays, subDays, format, formatISO} from 'date-fns'
import { ptBR } from 'date-fns/locale'

import{ Icon } from '~/assets/components/icon'

export const DateSelect = ({ currentDate, onChange}) => {
  const date = new Date(currentDate)

  function prevDay() {
    // function lib date-fns
    const nextDay = subDays(date, 1)
    onChange(formatISO(nextDay))
  }

  const nextDay = () =>{
    // function lib date-fns
    const nextDay = addDays(date, 1)
    onChange(formatISO(nextDay))
  }

  return(
    <div className="flex gap-8 justify-center h-20 items-center m-5 ">
      <Icon className="h-10 text-red-500" name="arrowLeft" onClick={prevDay}/>
      <h4 className="font-bold text-xl">{format(date, "d 'de' MMMM",  {locale: ptBR})}</h4>
      <Icon className="h-10 text-red-500"  name="arrowRight" onClick={nextDay}/>
    </div>
  )
}