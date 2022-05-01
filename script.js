
function checkProgress() {
    var filledOut = 0;
    document.getElementById("progressBarParent").style.width = window.innerWidth + "px";
    document.getElementsByName("checkbox").forEach(element => { filledOut += element.checked ? 1 : 0; });
    document.getElementById("progressBar").style.width = Math.round(filledOut / document.getElementsByName("checkbox").length * document.getElementById("progressBarParent").style.width.toString().slice(0, document.getElementById("progressBarParent").style.width.toString().length - 2)) + "px";

    console.log(filledOut / document.getElementsByName("checkbox").length * document.getElementById("progressBarParent").style.width.toString().slice(0, document.getElementById("progressBarParent").style.width.toString().length - 2) + "px");
}


function addNewItem() {
    addItem();
}

function addItem(itemText = "", completionStatus = false) {
    var new_br = document.createElement("br");
    var new_checkbox = document.createElement("input");
    var new_item = document.createElement("input");

    var thisItemNumber = (document.getElementsByName("checkbox").length + 1);
    new_checkbox.type = "checkbox";
    new_checkbox.name = "checkbox";
    new_checkbox.id = "item" + thisItemNumber + "Checkbox";
    new_checkbox.onclick = checkProgress;
    new_checkbox.checked = completionStatus;

    new_item.type = "text";
    new_item.type = "text";
    new_item.name = "itemInput";
    new_item.id = "item" + thisItemNumber + "Input";
    new_item.value = "Thing to do";

    document.getElementById("toDoList").appendChild(new_checkbox);
    document.getElementById("toDoList").appendChild(new_item);
    document.getElementById("toDoList").appendChild(new_br);

    localStorage[thisItemNumber] = [itemText, completionStatus]
}

function loadLocalStorageData() {
    if (localStorage.toDoListData) {
        // If todolist data exists
        for (var key in localStorage.toDoListData) {
            if (localStorage.toDoListData.hasOwnProperty(key)) {
                addItem(key, localStorage.toDoListData[key][1])
            }
        }
    }
    else {
        // If it doesn't exist
        localStorage.toDoListData = {};
    }


}

function saveData() {
    document.getElementsByName("itemInput").forEach(item => {
        thisItemNumber = Number(item.id.slice(4, 5))

        checkboxStatus = document.getElementsByName("checkbox" + thisItemNumber + "Checkbox")
        localStorage[thisItemNumber] = [item.value, checkboxStatus.checked];

    });
}


// Functinos that should run at the start of the code, loads data
loadLocalStorageData();



var addNewItemButton = document.getElementById("addNewItemButton");
addNewItemButton.addEventListener("click", checkProgress);
addNewItemButton.addEventListener("click", addNewItem);

addNewItemButton.addEventListener("click", saveData);



document.getElementById("progressBarParent").style.width = window.innerWidth + "px";

window.addEventListener("resize", checkProgress);


// Functions that need to run after the code 
checkProgress();