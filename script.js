
function checkProgress(){
    var filledOut = 0; 
    document.getElementById("progressBarParent").style.width = window.innerWidth + "px";
    document.getElementsByName("checkbox").forEach(element => {filledOut += element.checked ? 1 : 0;}); 
    document.getElementById("progressBar").style.width = Math.round(filledOut / document.getElementsByName("checkbox").length * document.getElementById("progressBarParent").style.width.toString().slice(0, document.getElementById("progressBarParent").style.width.toString().length - 2)) + "px";

    console.log(filledOut / document.getElementsByName("checkbox").length * document.getElementById("progressBarParent").style.width.toString().slice(0, document.getElementById("progressBarParent").style.width.toString().length - 2) + "px");
}

function addItem(){
    var new_br = document.createElement("br");
    var new_checkbox = document.createElement("input");
    var new_item = document.createElement("input");
    new_checkbox.type = "checkbox";
    new_checkbox.name = "checkbox";
    new_checkbox.id = "item" + (document.getElementsByName("checkbox").length + 1) + "Checkbox";
    new_checkbox.onclick = checkProgress;

    new_item.type = "text";
    /*
    <input type="text" name="itemInput" id = "item2Input" value="Second thing to do"></input><br>
    <input type="checkbox" name="checkbox" id="item3Checkbox" onclick="checkProgress()">
        */
    new_item.type = "text";
    new_item.name = "itemInput";
    new_item.id = "item" + (document.getElementsByName("checkbox").length + 1) + "Input";
    new_item.value = "Thing to do";

    document.getElementById("toDoList").appendChild(new_checkbox);
    document.getElementById("toDoList").appendChild(new_item);
    document.getElementById("toDoList").appendChild(new_br);
}

document.getElementById("addItemButton").addEventListener("click", checkProgress);

checkProgress();
document.getElementById("addItemButton").addEventListener("click", addItem);

document.getElementById("progressBarParent").style.width = window.innerWidth + "px";

window.addEventListener("resize", checkProgress);

