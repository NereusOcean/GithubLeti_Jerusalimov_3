
let userName = [{ name: "",
                 score: "0"}];

function authorization(){

    if(userName[0].name){
        console.log(`'${userName}' is new user!`);
        if(localStorage.getItem('name')) {
            let arrUsers = JSON.parse(localStorage.getItem('name'));
            arrUsers.push(userName[0]);
            localStorage.removeItem('name');
            localStorage.setItem('name', JSON.stringify(arrUsers));

        }else{
            localStorage.setItem('name', JSON.stringify(userName));
        }

        window.open('play','_self');
    }else{
        console.log("User did not enter name");
        alert("Enter the user name");
    }
}

function getName(){
    userName[0].name = document.getElementById("userNameInput").value;
}


document.getElementById("submitButton").addEventListener("click", authorization);
document.getElementById("userNameInput").addEventListener("change", getName);
