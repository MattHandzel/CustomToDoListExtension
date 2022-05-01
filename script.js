
function checkProgress() {
    var filledOut = 0;
    document.getElementById("progressBarParent").style.width = window.innerWidth + "px";
    document.getElementsByName("checkbox").forEach(element => { filledOut += element.checked ? 1 : 0; });
    var intendedSize = Math.round(filledOut / document.getElementsByName("checkbox").length * document.getElementById("progressBarParent").style.width.toString().slice(0, document.getElementById("progressBarParent").style.width.toString().length - 2));
    intendedSize = String(intendedSize) == "NaN" ? 0 : intendedSize;
    document.getElementById("progressBar").style.width = intendedSize + "px";

    console.log(Math.round(filledOut / document.getElementsByName("checkbox").length * document.getElementById("progressBarParent").style.width.toString().slice(0, document.getElementById("progressBarParent").style.width.toString().length - 2)) + "px");
}


function addNewItem() {
    addItem();
}

function addItem(itemText = "Thing To Do", completionStatus = false) {
    let new_br = document.createElement("br");
    let new_checkbox = document.createElement("input");
    let new_item = document.createElement("input");

    let thisItemNumber = (document.getElementsByName("checkbox").length + 1);
    new_checkbox.type = "checkbox";
    new_checkbox.name = "checkbox";
    new_checkbox.id = "item" + thisItemNumber + "Checkbox";
    new_checkbox.onclick = checkProgress;
    new_checkbox.checked = completionStatus == "true";

    new_item.type = "text";
    new_item.type = "text";
    new_item.name = "itemInput";
    new_item.id = "item" + thisItemNumber + "Input";
    new_item.value = itemText;

    new_checkbox.addEventListener("click", saveData);
    new_item.addEventListener("change", saveData);

    document.getElementById("toDoList").appendChild(new_checkbox);
    document.getElementById("toDoList").appendChild(new_item);
    document.getElementById("toDoList").appendChild(new_br);

    saveData();
}

function loadLocalStorageData() {
    if (localStorage.toDoListData) {
        // If todolist data exists
        let splitText = localStorage.toDoListData.split("\n")
        splitText = splitText.slice(0, splitText.length - 1)
        for (let line in splitText) {
            let arr = splitText[line].split("|")
            console.log(arr[3])
            addItem(arr[0], arr[1])
        }
    }
    else {
        // If it doesn't exist
        localStorage.toDoListData = "";
    }


}

function saveData() {
    localStorage.toDoListData = "";
    console.log("SAVING DATA");
    let i = 1;
    document.getElementsByName("itemInput").forEach(item => {
        thisItemNumber = i++;
        console.log(i)

        checkboxStatus = document.getElementById("item" + thisItemNumber + "Checkbox")
        console.log(checkboxStatus)
        localStorage.toDoListData += item.value + "|" + String(checkboxStatus.checked) + "\n";

    });
}

function deleteAllData() {
    localStorage.removeItem("toDoListData");

    let div = document.createElement("div");
    div.id = "toDoList"
    let toDoList = document.getElementById("toDoList")
    let children = [];
    toDoList.childNodes.forEach(child => { children.push(child); });
    for (let i in children) {
        toDoList.removeChild(children[i]);
    }

}

// Functinos that should run at the start of the code, loads data
loadLocalStorageData();


var addNewItemButton = document.getElementById("addNewItemButton");
addNewItemButton.addEventListener("click", checkProgress);
addNewItemButton.addEventListener("click", addNewItem);

addNewItemButton.addEventListener("click", saveData);

let deleteAllDataButton = document.getElementById("deleteAllDataButton");
deleteAllDataButton.addEventListener("click", deleteAllData);
deleteAllDataButton.addEventListener("click", checkProgress)

/*this.addEventListener('keypress', event => {
    if (event.code == "Enter") {
        saveData();
    }
})*/

document.getElementById("progressBarParent").style.width = window.innerWidth + "px";

window.addEventListener("resize", checkProgress);


// Functions that need to run after the code 
checkProgress();