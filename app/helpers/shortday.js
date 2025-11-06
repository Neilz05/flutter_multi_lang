// app/helpers/shorten-day.js
import { helper } from '@ember/component/helper'

export default helper(function shortenDay([day]) {
    const dayMap = {
        Monday: "Mon",
        Tuesday: "Tue",
        Wednesday: "Wed",
        Thursday: "Thu",
        Friday: "Fri",
        Saturday: "Sat",
        Sunday: "Sun"
    }

    return dayMap[day] || day
})
