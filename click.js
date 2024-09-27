function validateStorage(){
    if(!localStorage.countClick){
        localStorage.countClick = 0;
        localStorage.clickerMultiplier = 1;
        localStorage.buyedItemsCount = 0;
    }
}

var countBox = document.getElementById("clickCount");
var shopItemTable = document.getElementById("shopItemTable");
var shopItemsInfo = [
    {
        name: "Click multiplier +1",
        value: 10,
        method: addToMultiplier
    }
];

function getShopMultiplaier(){
    return 1 + parseInt(localStorage.buyedItemsCount) * localStorage.buyedItemsCount;
}

function getClickCount(){
    countBox.innerHTML = `Click: ${localStorage.countClick}`;
}

function loadShopItems(picsRef = "./pics/shop.png"){
    shopItemTable.innerHTML = "";
    for(let item of shopItemsInfo){
        shopItemTable.innerHTML += `
            <tr class="shopItem" onclick="purchase(${item.method}, ${item.value})">
                <td class="itemPics"><img src="${picsRef}"></td>
                <td class="itemName">${item.name}</td>
                <td class="itemValue">${item.value * getShopMultiplaier()}C</td>
            </tr>
            `;
    }
}

function refresh(){
    validateStorage();
    getClickCount();
    loadShopItems();
}

function addToCount(){
    localStorage.countClick = parseInt(localStorage.countClick) + parseInt(localStorage.clickerMultiplier);
    getClickCount();
}

function resetClickCount(){
    localStorage.countClick = 0;
    getClickCount();
}

function addToMultiplier(){
    localStorage.clickerMultiplier++;
}

function resetAllTheGameData(){
    localStorage.clear();
    refresh();
}

function purchase(method, value){
    if (localStorage.countClick >= value * getShopMultiplaier()) {
        localStorage.countClick -= value * getShopMultiplaier();
        localStorage.buyedItemsCount++;
        method();
        refresh();
    } else {
        alert("You don't have enough clicks to purchase this item.");
    }
}

refresh();