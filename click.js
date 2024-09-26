function validateStorage(){
    if(!localStorage.countClick){
        localStorage.countClick = 0;
        localStorage.clickerMultiplier = 1;
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

function getClickCount(){
    countBox.innerHTML = `Click: ${localStorage.countClick}`;
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
    validateStorage();
    getClickCount();
}

function purchase(method, value){
    if (localStorage.countClick >= value) {
        localStorage.countClick -= value;
        method();
        getClickCount();
    } else {
        alert("You don't have enough clicks to purchase this item.");
    }
}

function loadShopItems(picsRef = null){
    shopItemTable.innerHTML = "";
    for(let item of shopItemsInfo){
        shopItemTable.innerHTML += `
            <tr class="shopItem" onclick="purchase(${item.method}, ${item.value})">
                <td class="itemPics"><img src="${picsRef}"></td>
                <td class="itemName">${item.name}</td>
                <td class="itemValue">${item.value}C</td>
            </tr>
            `;
    }
}



function START(){
    validateStorage();
    getClickCount();
    loadShopItems();
}

START();