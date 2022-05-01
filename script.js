
var completedTaskColor = "lightgreen"

function checkProgress() {
    /*This function will update the progress bar, it works by getting the width of the max progress bar size (its parent's size) and then dividing that
    by the amount of tasks that are completed*/
    var filledOut = 0;

    let progressBarParent = document.getElementById("progressBarParent");
    let parents = document.getElementsByClassName("parentDiv");
    let checks = []
    for (i = 0; i < parents.length; i++) {
        checks.push(parents[i].childNodes[0])
        console.log(parents[i].childNodes[0])
    }

    let progressBar = document.getElementById("progressBar")

    let totalItems = checks.length;

    progressBarParent.style.width = window.innerWidth + "px";

    for (i = 0; i < checks.length; i++) {
        console.log(checks[i])
        filledOut += checks[i].style.color === completedTaskColor ? 1 : 0;
    }

    // * This prevents it from showing NaN%
    if (totalItems == 0) {
        filledOut = 0;
        totalItems = 1;
    }

    var intendedSize = Math.round(filledOut / totalItems * progressBarParent.style.width.toString().slice(0, progressBarParent.style.width.toString().length - 2));
    intendedSize = String(intendedSize) == "NaN" ? 0 : intendedSize;
    progressBar.style.width = intendedSize + "px";
    progressBar.innerText = String(Math.round(100 * filledOut / totalItems)) + "%";

}


function addNewItem() {
    /*This function will add a new item that will have the default values of being called thing to do, and having
    its completion status set to false*/
    addItem();
}

function addItem(itemText = "Thing To Do", completionStatus = false) {
    /* This function will add a check box as well as an input, this will be
        where the user can put in the thing that they want to do, and when 
        they are done with the task they can click on the checkbox
     */

    let parent = document.createElement("div");
    let new_br = document.createElement("br");
    let check = document.createElement("i");
    let new_item = document.createElement("input");
    let new_delete = document.createElement("i");

    let toDoList = document.getElementById("toDoList");

    // Initialize the checkbox
    let thisItemNumber = (document.getElementsByClassName("parentDiv").length + 1);

    parent.id = thisItemNumber + "_parentDiv";
    parent.className = "parentDiv"

    check.id = thisItemNumber + "_checkButton"
    check.className = "material-icons"
    check.innerHTML = "check"
    check.style = completionStatus === "true" ? "color: green;" : "color: black;";

    // Initialize the input bar
    new_item.type = "text";
    new_item.type = "text";
    new_item.name = "itemInput";
    new_item.className = "itemInput"
    new_item.id = "item" + thisItemNumber + "Input";
    new_item.value = itemText;

    // Initialize the delete button
    new_delete.className = "material-icons"
    new_delete.style = "color: red;"
    new_delete.innerHTML = "delete"
    new_delete.id = thisItemNumber + "_deleteButton"

    // Make it so that when these things are clicked the saveData command is run
    check.addEventListener("click", (event) => {
        if (event.target.style.color != completedTaskColor) {
            event.target.style.color = completedTaskColor;
        }
    })
    check.addEventListener('click', checkProgress)
    check.addEventListener("click", saveData);
    new_item.addEventListener("change", saveData);
    new_delete.addEventListener("click", (element) => { deleteSpecificItemByNumber(String(element.srcElement.id.split("_")[0])) });
    new_delete.addEventListener("click", saveData)
    // Add the items ot the toDoList div

    parent.appendChild(check);
    parent.appendChild(new_item);
    parent.appendChild(new_delete);
    parent.appendChild(new_br);
    toDoList.appendChild(parent);
    // Save
    saveData();
}


function loadLocalStorageData() {

    if (localStorage.toDoListData) {
        // If todolist data exists
        let splitText = localStorage.toDoListData.split("\n")
        splitText = splitText.slice(0, splitText.length - 1)

        // ! If the user puts in a pipe "|" then this could be "hacked"
        // Reads the data from the splitText thing
        for (let line in splitText) {
            let arr = splitText[line].split("|")
            addItem(arr[0], arr[1])
        }
    }
    else {
        // Initialize the toDoListData object
        //? This might be redundant
        localStorage.toDoListData = "";
    }

}

function saveData() {
    // Function that stores the data into localStorage
    /*
        || It might be more efficient to use sessionStorage and then once the tab is closed or something
    */
    localStorage.toDoListData = "";
    var parents = document.getElementsByClassName("parentDiv")
    for (i = 0; i < parents.length; i++) {
        //thisItemNumber = Number(parents[i].id.split("_")[0])
        localStorage.toDoListData += parents[i].childNodes[1].value + "|" + String(parents[i].childNodes[0].style.color === completedTaskColor) + "\n";
    }

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

function deleteSpecificItemByNumber(number) {
    let parentDivs = document.getElementsByClassName("parentDiv")
    for (let i in parentDivs) {

        if (parentDivs[i].id.split("_")[0] == number) {
            removeThisDiv = parentDivs[i]
            break;
        }
    }
    toDoList.removeChild(removeThisDiv)
}


// Functinos that should run at the start of the code, loads data
loadLocalStorageData();


var addNewItemButton = document.getElementById("addNewItemButton");
addNewItemButton.addEventListener("click", addNewItem);
addNewItemButton.addEventListener("click", checkProgress);
addNewItemButton.addEventListener("click", saveData);

let deleteAllDataButton = document.getElementById("resetButton");
deleteAllDataButton.addEventListener("click", deleteAllData);
deleteAllDataButton.addEventListener("click", checkProgress)

document.getElementById("progressBarParent").style.width = window.innerWidth + "px";

window.addEventListener("resize", checkProgress);


// Functions that need to run after the code 
// Updates the progress bar
checkProgress();