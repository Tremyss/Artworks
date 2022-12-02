const getData = async () => {

    const apiUrl = "https://api.artic.edu/api/v1/artworks"

    try {
        const responseJson = await fetch(apiUrl)
        const responseObject = await responseJson.json();

        return responseObject.data.filter(image => image.image_id)
    }
    catch (error) {
        console.error(error)
        return error
    }
}

export default getData