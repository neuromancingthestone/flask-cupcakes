const $table = $('.cupcake-table')
const $form = document.querySelector('form')

async function addCupcake(nflavor, nsize, nrating, nimage) {
    const res = await axios.post(
        "/api/cupcakes",
        {
            flavor: nflavor,
            size: nsize,
            rating: nrating,
            image: nimage
        }
    )
}

async function getCupcakes() {
    let cupcakes = await axios.get("/api/cupcakes")
    let len = cupcakes.data.cupcakes.length

    $table.children().remove()
    $table.append()
    for(c=0; c<len; c++) {
        $table.append(`<tr>`)
        $table.append(`<td><img src=${cupcakes.data.cupcakes[c].image}></td>`)
        $table.append(
        `<td>
            <ul>
            <li>Flavor: ${cupcakes.data.cupcakes[c].flavor}</li>
            <li>Size: ${cupcakes.data.cupcakes[c].size}</li>
            <li>Rating: ${cupcakes.data.cupcakes[c].rating}</li>
            </ul>
        </td>`)
        $table.append(`</tr>`)        
    }
}

$form.addEventListener("submit", function(e) {
    e.preventDefault()
    let $flavor = $('#cflavor').val()
    let $size = $('#csize').val()
    let $rating = parseFloat($('#crating').val())
    let $image = $('#cimage').val()
    
    addCupcake($flavor, $size, $rating, $image)
    getCupcakes()
})

getCupcakes()