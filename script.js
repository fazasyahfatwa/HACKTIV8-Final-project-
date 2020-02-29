if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let hapusItem = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < hapusItem.length; i++) {
        let button = hapusItem[i]
        button.addEventListener('click', removeCardItem)
    }

    let jumlahInput = document.getElementsByClassName('card-quantity-input')
    for (let i = 0; i < jumlahInput.length; i++) {
        let input = jumlahInput[i]
        input.addEventListener('change', quantityChanged)
    }

    let addCardToButton = document.getElementsByClassName('btn-item')
    for (let i = 0; i < addCardToButton.length; i++) {
        let button = addCardToButton[i]
        button.addEventListener('click', addToCardClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    let cardItems = document.getElementsByClassName('card-items')[0]
    while (cardItems.hasChildNodes()) {
        cardItems.removeChild(cardItems.firstChild)
    }
    updateCardTotal()
}

function removeCardItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCardTotal()
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCardTotal()
}

function addToCardClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('item-barang')[0].innerText
    let harga = shopItem.getElementsByClassName('item-harga')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('item-img')[0].src
    addItemToCard(title, harga, imageSrc)
    updatecardTotal()
}

function addItemToCard(title, harga, imageSrc) {
    let cardRow = document.createElement('div')
    cardRow.classList.add('card-row')
    let cardItems = document.getElementsByClassName('card-items')[0]
    let cardItemNames = cardItems.getElementsByClassName('item-barang')
    for (let i = 0; i < cardItemNames.length; i++) {
        if (cardItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    let cardRowContents = `
        <div class="card-barang card-column">
            <img class="item-image" src="${imageSrc}" width="100" height="100">
            <span class="item-barang">${title}</span>
        </div>
        <span class="card-harga card-column">${harga}</span>
        <div class="card-jumlah card-column">
            <input class="card-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cardRow.innerHTML = cardRowContents
    cardItems.append(cardRow)
    cardRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCardItem)
    cardRow.getElementsByClassName('card-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCardTotal() {
    let cardItemContainer = document.getElementsByClassName('card-items')[0]
    let cardRows = cardItemContainer.getElementsByClassName('card-row')
    let total = 0
    for (let i = 0; i < cardRows.length; i++) {
        let cardRow = cardRows[i]
        let hargaElement = cardRow.getElementsByClassName('card-harga')[0]
        let quantityElement = cardRow.getElementsByClassName('card-quantity-input')[0]
        let harga = parseFloat(hargaElement.innerText.replace('$', ''))
        let quantity = quantityElement.value
        total = total + (harga * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('card-total-harga')[0].innerText = '$' + total
}