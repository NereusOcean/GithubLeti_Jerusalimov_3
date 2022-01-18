
let userName = "";

function authorization(){
        localStorage.setItem('name',userName);
        localStorage.setItem("die", 0);
        window.open('startMenu','_self');


}

function getName(){
    userName = document.getElementById("userNameInput").value;
}


document.getElementById("submitButton").addEventListener("click", authorization);
document.getElementById("userNameInput").addEventListener("change", getName);
