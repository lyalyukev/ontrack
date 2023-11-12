import {ChartBarIcon, ClockIcon, ListBulletIcon} from "@heroicons/vue/24/outline";
import {generatePeriodSelectOptions} from "@/function";

export const PAGE_TIME = 'timeline'

export const PAGE_ACTIVITIES = 'activities'

export const PAGE_PROGRESS = 'progress'
export const MIDNIGHT_HOUR = 0

export const NAV_ITEMS =
    {
        [PAGE_TIME]: ClockIcon,
        [PAGE_ACTIVITIES]: ListBulletIcon,
        [PAGE_PROGRESS]: ChartBarIcon
    }
export const HOUR_IN_DAY = 24
export const SECONDS_IN_HOUR = 3600
export const SECONDS_IN_MINUTES = 60
export const MINUTES_IN_HOUR = 60
export const MILLISECOND_IN_SECOND = 1000

export const NULLABLE_ACTIVITY = { id: null }

const PERIODS_IN_MINUTES = [
    15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480
]

export const PERIOD_SELECT_OPTIONS = generatePeriodSelectOptions(PERIODS_IN_MINUTES)
export const BUTTON_TYPE_PRIMARY = 'primary'
export const BUTTON_TYPE_NEUTRAL = 'neutral'
export const BUTTON_TYPE_DANGER = 'danger'
export const BUTTON_TYPE_SUCCESS = 'success'
export const BUTTON_TYPE_WARNING = 'warning'
export const BUTTON_TYPES = [BUTTON_TYPE_NEUTRAL, BUTTON_TYPE_DANGER, BUTTON_TYPE_PRIMARY, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING ]