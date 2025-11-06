function parseTimeToMinutes(timeStr) {
    if (!timeStr) return 0
    const [hours, minutes] = timeStr.split(':').map(Number)
    return hours * 60 + minutes
}

export default function validateOverlappingSchedule(schedules = []) {
    return (key, newValue, _oldValue, changes, content) => {
        const arrDays = content.Day.split(',')
        /* const schedules = content.store.peekAll('hosts-accesscontrol-schedule') || [] */
        console.log(`Validating overlapping schedule for content id ${content.id}`)
    
        let hasOverlap = false

        schedules.forEach((item) => {
            if (content === item) return

            const itemDays = item.Day?.split(',') || []
            
            const dayOverlap = arrDays.some(day => itemDays.includes(day))
            if (!dayOverlap) return

            const startA = parseTimeToMinutes(content.StartTime)
            const endA = startA + Number(content.Duration) / 60  // convert seconds → minutes

            const startB = parseTimeToMinutes(item.StartTime)
            const endB = startB + Number(item.Duration) / 60

            const overlap = startA < endB && startB < endA
            if (overlap) hasOverlap = true

            console.log(itemDays, arrDays, overlap)
        })

        return hasOverlap ? 'ERROR_MESSAGE_SCHEDULE_OVERLAP' : true
    }
}
