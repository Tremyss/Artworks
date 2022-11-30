const getDataLoop = async (url, ids) => {
    // const responseArray = []
    try {
        // for (const id of ids) {
        //     const imageDataJson = await fetch(url + id)
        //     const imageDataObject = await imageDataJson.json()
        //     if (!imageDataObject.primaryImageSmall) {continue}
        //     responseArray.push(imageDataObject)
        // }
        const dataPromiseArray = ids.map(async id =>  {
            const response = await fetch(url + id)
            const imageDataObject = await response.json()
            return imageDataObject
        })
        // console.log(dataPromiseArray)
        const dataArray = await Promise.all(dataPromiseArray)
        // console.log(dataArray)

        return dataArray.filter(data => data.primaryImageSmall)
    }
    catch (error) {
        console.error(error)
        return error
    }
}

export default getDataLoop