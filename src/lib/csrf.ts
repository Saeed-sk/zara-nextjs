import axios from "@/lib/axios";

const csrf = async () => axios.get("/sanctum/csrf-cookie");

export default csrf;