const getData = async (url) => {
    try {
        const responseJson = await fetch(url)
        const responseObject = await responseJson.json();
        return responseObject.objectIDs
    }
    catch (error) {
        console.error(error)
        return error
    }
}

export default getData