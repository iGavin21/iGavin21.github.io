//NOTES//

/* TEST in console (CTRL +SHIFT J)
-enter all the details(filter) needed and click "NEXT" using the html file.
- type "cafeList;" to return the list of cafe for the filter.
- type "showMenu(idOfCafe);" to return the list of the menu filtered.
*/

/*
NEXT GOAL:
    implement the results in the html. (eg: auto creation of table, etc.)
*/

var categories = [];
var budget;
var availability;
var ambience = [];
var modal = document.getElementById('filter-background');
var menuList = [];
var cafeList = [];
var finalList = [];

function getBudget(){
    budget = document.getElementById("budget-value").value;
    modal.style.display = "block";
    console.log(budget);
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function getCategory(id) {
    var checkBox = document.getElementById(id);
    if(checkBox.checked == true){
        categories.push(id);
        console.log(categories);
    }if(checkBox.checked == false){
        var index = categories.indexOf(id);
        categories.splice(index, 1);
        console.log(categories);
    }
}

function getAmbience(id) {
    var checkBox = document.getElementById(id);
    if(checkBox.checked == true){
        ambience.push(id);
        console.log(ambience);
    }if(checkBox.checked == false){
        var index = ambience.indexOf(id);
        ambience.splice(index, 1);
        console.log(ambience);
    }
}

function getAvailability(id) {
    cafeList = [];
    availability = document.getElementById(id).value;
    console.log(availability);
}

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
 
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}
 
const cafe = [
  { id: 1, cafeName: "cafeOne", cafeLocation: "Baguio", wifi: "yes", ambience: "cozy"},
  { id: 2, cafeName: "cafeTwo", cafeLocation: "Naguilian", wifi: "no", ambience: "quiet"},
  { id: 3, cafeName: "cafeThree", cafeLocation: "La union", wifi: "yes", ambience: "casual"},
];

const menu = [
    {id: 1, cafeId: 1, menuName: "Coffee", menuType: "coffee", price: 120},
    {id: 2, cafeId: 2, menuName: "Fish", menuType: "rice", price: 220},
    {id: 3, cafeId: 3, menuName: "milk Cake", menuType: "cakes", price: 320},
    {id: 4, cafeId: 1, menuName: "Cabonara", menuType: "pasta", price: 120},
    {id: 5, cafeId: 2, menuName: "Cappucino", menuType: "coffee", price: 120},
    {id: 6, cafeId: 3, menuName: "Vanilla tea", menuType: "milk", price: 120},
]
 
 
var db;
var request = window.indexedDB.open("newDatabase10", 1);
 
request.onerror = function(event) {
  console.log("error: ");
};
 
request.onsuccess = function(event) {
  db = request.result;
  console.log("success: "+ db);
};
 
request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("cafe", {keyPath: "id"});
        for (var i in cafe) {
                objectStore.add(cafe[i]);      
        }
    
        var objectStore2 = db.createObjectStore("menu", {keyPath: "id"});
        for (var i in menu) {
                objectStore2.add(menu[i]);      
        }
}
 
function menuQuery() {
    menuList = [];
    var objectStore = db.transaction("menu").objectStore("menu");
  
        objectStore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
          if (cursor) {
              if(cursor.value.price <= budget){
                  for(var i = 0; i < categories.length; i++){
                      
                      if(categories[i] == cursor.value.menuType){
                          menuList.push(cursor.value);
                      } 
                  }
              }
            cursor.continue();
          }
        };     
}

function cafeQuery(){
    cafeList = [];
    var objectStore = db.transaction("cafe").objectStore("cafe");
        objectStore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
          if (cursor) {
              if(cursor.value.wifi == availability){
                  for(var i = 0; i < ambience.length; i++) {
                      if(cursor.value.ambience == ambience[i]){
                          cafeList.push(cursor.value);
                  }
              }
          }
            cursor.continue();
        }
    };     
}

function compile(){
    menuQuery();
    cafeQuery();
}

var showCafe = function(){
    var listCafe = [];
  for(var i = 0; i < cafeList.length; i++){
      listCafe.push(cafeList[i].id +"\t\t"+ cafeList[i].cafeName +"\t\t"+ cafeList[i].cafeLocation);
  } 
    return listCafe;
}


var showMenu = function(id){
  var listMenu = [];
  for(var i = 0; i < menuList.length; i++){
      if(menuList[i].id == id){
          listMenu.push(menuList[i].menuName +"\t\t"+ menuList[i].menuType + "\t\t"+ menuList[i].price);
      }
  } 
    return listMenu;
}
//NOTES//

/* TEST in console (CTRL +SHIFT J)
-enter all the details(filter) needed and click "NEXT"
- type "cafeList;" to return the list of cafe for the filter.
- type "showMenu(idOfCafe);" to return the list of the menu filtered.
*/

/*
    implement the results in the html. (eg: auto creation of table, etc.)
*/








 
