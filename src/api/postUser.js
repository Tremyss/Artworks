import { backendApi } from "../App.jsx"

const postUser = async (email, password, endpoint) => {
    const bodyOject = { email, password }
    const bodyJson = JSON.stringify(bodyOject)
    const url = backendApi + endpoint
    try {
        const responseJson = await fetch(url, {
            method: "POST",
            body: bodyJson
        })
        const responseObject = await responseJson.json()
        // console.log(responseJson)
        // console.log(responseJson.status)
        // console.log(responseObject.accessToken)
        return {
            status: responseJson.status, 
            accessToken: responseObject.accessToken
        }
    }
    catch (error) {
        console.error(error)
        return error
    }
}

export default postUser