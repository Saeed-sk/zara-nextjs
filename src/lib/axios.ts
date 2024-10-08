import Axios from 'axios'
// @ts-ignore
const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "Content-Type": "application/json",
        'Accept': 'application/json',
    },
    withCredentials: true,
    withXSRFToken: true
})

export default axios