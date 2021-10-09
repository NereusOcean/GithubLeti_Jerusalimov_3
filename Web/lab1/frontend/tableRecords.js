
 let usesersArr = JSON.parse(localStorage.getItem('name'));
 usesersArr.sort((a, b) => b.score > a.score ? 1 : -1);

for(let i in usesersArr){
    var tag = document.createElement("p"); // <p></p>
    var text = document.createTextNode( `${i/1+1}) ${usesersArr[i].name} ---->  Score: ${usesersArr[i].score}`);
    tag.appendChild(text); // <p>TEST TEXT</p>
    var element = document.getElementById("table");
    element.appendChild(tag); // <body> <p>TEST TEXT</p> </body>

}
