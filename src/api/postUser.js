import { backendApi } from "../App.jsx"

const postUser = async (email, password, endpoint) => {
    const bodyOject = { email, password }
    const bodyJson = JSON.stringify(bodyOject)
    const url = backendApi + endpoint
    try {
        const response = await fetch(url, { method: "POST", body: bodyJson })
        return response.status
    }
    catch (error) {
        console.error(error)
        return error
    }
}

export default postUser