import {PAGE_TIME} from "@/constants";
import {ref} from "vue";
import {isPageValid} from "@/validators";


export const currentPage = ref(normalizePageHash())
export const timelineRef = ref()


export function navigate(page) {
    if (currentPage.value === PAGE_TIME && page === PAGE_TIME) {
        timelineRef.value.scrollToHour()
    }else if (page !== PAGE_TIME) {
        document.body.scrollIntoView()
    }
    currentPage.value = page
}

export function normalizePageHash() {
    const hash = window.location.hash.slice(1)
    if (isPageValid(hash)) {
        return hash
    }
    window.location.hash = PAGE_TIME
    return PAGE_TIME
}