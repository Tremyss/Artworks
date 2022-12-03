const getData = async (searchVal) => {

    const apiUrl = `https://api.artic.edu/api/v1/artworks/search?q=${searchVal}&fields=id,title,artist_title,artist_display,date_display,image_id,thumbnail,artwork_type_title,style_title`

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