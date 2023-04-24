import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    withCredentials: true,
})

const getConfig = (contentType) => {

    const config = {
        headers: {
            "Content-Type": contentType ? contentType : "application/json",
        },
    }

    return config;
}

export {
    getConfig,
    axiosClient
}

