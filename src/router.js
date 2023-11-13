import {PAGE_TIME} from "@/constants";
import {ref} from "vue";
import {normalizePageHash} from "@/function";


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