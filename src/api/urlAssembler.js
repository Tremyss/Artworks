function urlAssembler(string, isTitle, IsHighlighted) {
    const keyword = string.replace(" ", "%20")
    const medium = "Paintings"
    const hasImages = true
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}&title=${isTitle}&isHighlight=${IsHighlighted}&medium=${medium}&hasImages=${hasImages}`
    console.log(url)
    // return url
}

export default urlAssembler

//Az baj, hogy ha az input mező üres, akkor a q=semmi lesz itt


