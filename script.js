if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var hapusItem = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < hapusItem.length; i++) {
        var button = hapusItem[i]
        button.addEventListener('click', removeCardItem)
    }

    var jumlahInput = document.getElementsByClassName('card-quantity-input')
    for (var i = 0; i < jumlahInput.length; i++) {
        var input = jumlahInput[i]
        input.addEventListener('change', quantityChanged)
    }

    var addCardToButton = document.getElementsByClassName('btn-item')
    for (var i = 0; i < addCardToButton.length; i++) {
        var button = addCardToButton[i]
        button.addEventListener('click', addToCardClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cardItems = document.getElementsByClassName('card-items')[0]
    while (cardItems.hasChildNodes()) {
        cardItems.removeChild(cardItems.firstChild)
    }
    updateCardTotal()
}

function removeCardItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCardTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCardTotal()
}

function addToCardClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('item-barang')[0].innerText
    var harga = shopItem.getElementsByClassName('item-harga')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('item-img')[0].src
    addItemToCard(title, harga, imageSrc)
    updatecardTotal()
}

function addItemToCard(title, harga, imageSrc) {
    var cardRow = document.createElement('div')
    cardRow.classList.add('card-row')
    var cardItems = document.getElementsByClassName('card-items')[0]
    var cardItemNames = cardItems.getElementsByClassName('item-barang')
    for (var i = 0; i < cardItemNames.length; i++) {
        if (cardItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cardRowContents = `
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
    var cardItemContainer = document.getElementsByClassName('card-items')[0]
    var cardRows = cardItemContainer.getElementsByClassName('card-row')
    var total = 0
    for (var i = 0; i < cardRows.length; i++) {
        var cardRow = cardRows[i]
        var hargaElement = cardRow.getElementsByClassName('card-harga')[0]
        var quantityElement = cardRow.getElementsByClassName('card-quantity-input')[0]
        var harga = parseFloat(hargaElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (harga * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('card-total-harga')[0].innerText = '$' + total
}