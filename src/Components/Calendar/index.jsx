'use strict'
import React, {useState} from 'react';
import { format } from 'date-fns';
import { startOfMonth } from 'date-fns';
import { eachDayOfInterval } from 'date-fns';
import { addDays } from 'date-fns';
import { subDays } from 'date-fns';
import { isToday } from 'date-fns';
import { isSameMonth } from 'date-fns';
import { addMonths } from 'date-fns';
import { subMonths } from 'date-fns';
import { isFirstDayOfMonth } from 'date-fns';
import { isLastDayOfMonth } from 'date-fns';
import { isWeekend } from 'date-fns';

import classnames from 'classnames';
import './Calendar.css'

const WEEK_DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getMonthArray(dayStart, dayEnd){
  return eachDayOfInterval({start: dayStart, end: dayEnd})
}

function createStartArray(dataDay){
  const startMonthNum = Number(format(startOfMonth(dataDay), 'e'));
  return subDays(startOfMonth(dataDay), (startMonthNum-1))
}

function createEndArray(startDateArray){
  const TOTAL_CELLS = 42
  return addDays(startDateArray, TOTAL_CELLS-1)
}


export default function Calendar() {
  const [dataDay, setDataDay] = useState(new Date());
  const startDateArray = createStartArray(dataDay);
  const endDateArray = createEndArray(startDateArray)
  const dayMonthArray = getMonthArray(startDateArray, endDateArray);
  const seqMonth = (action) => {setDataDay(action(dataDay, 1))};
  return (
    <article className="calendar__container">
      <article className="calendar__control">
        <div onClick={()=> seqMonth(subMonths)} className="calendar__arrow-prev"></div>
        <section className="calendar__month"><h1>{format(dataDay, 'MMMM yyyy')}</h1></section>
        <div onClick={()=> seqMonth(addMonths)} className="calendar__arrow-next"></div>
      </article>
      <section  className="calendar__grid">
        {WEEK_DAY_NAMES.map((name, index) =>
          <div className={classnames("calendar__day-week",{
            'calendar__weekend' : index == 0 || index == 6
          })} key={index}><h3>{name}</h3></div>
        )}
        {dayMonthArray.map((day, index) =>
          <div className={classnames('calendar__day-week', {
            'calendar__today': isToday(day),
            'calendar__not-this-month' : !isSameMonth(day, dataDay),
            'calendar__weekend' : isWeekend(day)
          })} key={index}><h3>{format(day, "d")}</h3>{
            (isFirstDayOfMonth(day) || isLastDayOfMonth(day) ? <p>{format(day, "MMMM")}</p>: '')}
          </div>
        )}
      </section>
    </article>
  )
}

