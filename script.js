class ProgressBar{
    // TODO:: Figure out how to implement classes in javascript and HTML
    checkboxes = document.getElementsByName("checkbox");
    inputs = document.getElementsByName("itemInput");

    constructor(){
        this.progressBarParentWidth = document.getElementById("progressBarParent").width;
    }
    checkProgress(){
        var filledOut = 0; 
        this.checkboxes.forEach(element => {filledOut += element.ariaChecked ? 1 : 0;}); 
        document.getElementById("progressBar").style.width = filledOut / this.checkboxes.length * this.progressBarParentWidth + "px";
        console.log("LENGTH OF WIDTH THING")
        console.log(filledOut / this.checkboxes.length * this.progressBarParentWidth + "px");
    }
}


function checkProgress(){
    var pb = new ProgressBar();
    pb.checkProgress();
}

/// TODO:: Figure out why the event listener isn't working
document.getElementsByName("checkbox").forEach(element => element.addEventListener("click", function(){pb.checkProgress()}));