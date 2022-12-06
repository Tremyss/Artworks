import { backendApi } from "../App.jsx"

const postUser = async (email, password, endpoint) => {
    const bodyOject = { email, password }
    const bodyJson = JSON.stringify(bodyOject)
    const url = backendApi + endpoint
    try {
        const responseJson = await fetch(url, { method: "POST", body: bodyJson })
        const responseObject = responseJson.json()
        return responseObject
    }
    catch (error) {
        console.error(error)
        return error
    }
}

export default postUser