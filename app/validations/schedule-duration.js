export default function validateDurationWithinDay() {
    return(key, newValue, _oldValue, changes, content) => {    
        // Duration in seconds
        let durationSeconds = Number(newValue)
        let startTime = content.StartTime

        // Parse StartTime (HH:mm)
        let [hours, minutes] = startTime.split(':').map(Number)
        let startSeconds = (hours * 60 * 60) + (minutes * 60)

        // Compute end time in seconds
        let endSeconds = startSeconds + durationSeconds

        // There are 86400 seconds in a day
        // ❌ Must end *strictly before* midnight
        
        if (endSeconds >= 86400) {
            return 'ERROR_MESSAGE_EXCEEDS_MIDNIGHT'
        }

        return true
    }
}