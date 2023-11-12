import {
    PAGE_TIME, HOUR_IN_DAY, MIDNIGHT_HOUR, SECONDS_IN_HOUR, SECONDS_IN_MINUTES, MINUTES_IN_HOUR, MILLISECOND_IN_SECOND
}
    from "@/constants";
import {isPageValid, isNull} from "@/validators";


export function normalizePageHash() {
    const hash = window.location.hash.slice(1)
    if (isPageValid(hash)) {
        return hash
    }
    window.location.hash = PAGE_TIME
    return PAGE_TIME
}

export function generateTimelineItems(activities) {

    return [...Array(HOUR_IN_DAY).keys()].map((hour) => ({
        hour,
        activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
        activitySeconds: hour % 4 === 0 ? null : (15 * SECONDS_IN_MINUTES * hour) % SECONDS_IN_HOUR
    }))

}

export function generateActivitySelectOptions(activities) {
    return activities.map((activity) => ({label: activity.name, value: activity.id}))
}

export function generateActivities() {
    return ['Coding', 'Reading', 'Training'].map((name, hours) => ({
        id: id(),
        name,
        secondsToComplete: hours * SECONDS_IN_HOUR
    }))
}

export function id() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function normalizeSelectValue(value) {
    return isNull(value) || isNaN(value) ? value : +value
}

export function generatePeriodSelectOptions(periodsInMinutes) {

    return periodsInMinutes.map((periodsInMinutes) => (
        {
            label: generatePeriodSelectOptionsLabel(periodsInMinutes),
            value: periodsInMinutes * SECONDS_IN_MINUTES
        }
    ))

}

function generatePeriodSelectOptionsLabel(periodsInMinutes) {
    const hours = Math.floor(periodsInMinutes / MINUTES_IN_HOUR).toString().padStart(2, 0)
    const minutes = (periodsInMinutes % MINUTES_IN_HOUR).toString().padStart(2, 0)
    return `${hours}:${minutes}`
}

export function formatSecond(seconds) {
    const date = new Date()
    date.setTime(Math.abs(seconds) * MILLISECOND_IN_SECOND)
    const utc = date.toUTCString()

    return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6)
}