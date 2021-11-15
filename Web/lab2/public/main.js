
let sortBy = false;
let availability = 0;

function book_addition_form(){
    document.getElementById("dialogFormToAddBook").showModal();
}

function close_dialog(id){
    const dialog = document.querySelector(`#${id}`);
    dialog.close();
}

function addBook(){
    let name_book = document.getElementById("name_book").value;
    let autor_book = document.getElementById("autor_book").value;
    let date_of_issue = document.getElementById("date_of_issue").value;
    let image_book = document.getElementById("image_book").value;
    let book = {};
    if(name_book !== "" && autor_book !== "" && date_of_issue !== ""){
        book = {
            "token":"",
            "name": name_book,
            "autor": autor_book,
            "count": "В наличии",
            "date": date_of_issue,
            "info":{
                "image": image_book === "" ? "https://thumbs.dreamstime.com/b/%D0%BE%D1%82%D1%81%D1%83%D1%82%D1%81%D1%82%D0%B2%D0%B8%D0%B5-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B0-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D0%BE%D0%B3%D0%BE-%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D1%8B-%D1%84%D0%BE%D1%82%D0%BE-%D0%BF%D0%BB%D0%BE%D1%81%D0%BA%D0%B8%D0%B9-132483296.jpg": image_book,
                "description": "Description not written:c",
                "countPage": "0",
                "bookmark": "0",
                "debtor": "",
                "dateWhenTake": "",
                "dateWhenReturn": ""
            }
        }
    }else{
        alert("Вы не заполнили нужную информацию!");
        return;
    }
    fetch("/api/addBook", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify(book)
    }).then(res => res.json()).then(result =>{
        renderTableLib(result);
    })

    console.log(book);
}

document.addEventListener("DOMContentLoaded", function (event) {
    fetch("/api/getLibrary").
    then(res => res.json()).then(result =>{
        renderTableLib(result)
    })
});

function showBookPage(nameBook){
    fetch("/api/getLibrary").
    then(res => res.json()).then(result =>{
        let dialogBookPage = document.getElementById("bookPage");
        dialogBookPage.showModal();
        result.forEach(element=>{
            if(element['name']===nameBook.innerText){
                let name = document.getElementById("nameBook");
                let image = document.getElementById("imageBook");
                let description = document.getElementById("description");
                let countPage = document.getElementById("countPage");
                let bookmark = document.getElementById("bookmark");
                let debtor = document.getElementById("debtor");
                let date = document.getElementById("dateToTookTxt");
                let InStock = document.getElementById("InStock");
                let dateToReturn = document.getElementById("dateToReturn");

                name.innerText = nameBook.innerText;
                image.src = element['info'][`image`];
                description.innerText = element['info']['description'];
                countPage.innerText = "Страниц: " + element['info']['countPage'];
                bookmark.innerText = "Закладка: " + element['info']['bookmark'];
                debtor.innerText = "Взял: " + element['info']['debtor'];
                date.innerText = "Когда взял: " + element['info']['dateWhenTake'];
                InStock.innerText = element['count'];
                dateToReturn.innerText = "Вернул: " + element["info"]['debtor']+" "+element['info']['dateWhenReturn'];
            }
        })
    })
}

function renderTableLib(newTable){
    let table = document.querySelector(`.tableLib`);
    while (table.lastElementChild !== table.firstChild) {
        table.removeChild(table.lastElementChild);
    }
    let token = 0;
    newTable.forEach(element=> {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${token}</td>` +
            `<td class="link" onclick="showBookPage(this)">${element["name"]}</td>` +
            `<td>${element["autor"]}</td>` +
            `<td>${element["count"]}</td>` +
            `<td>${element["date"]}</td>`;
        table.appendChild(tr);
        ++token;
    })
    console.log(table);
}

function settingsBook(image){
    let discription = document.getElementById("description");
    let settings = document.getElementById("settings");
    let name = document.getElementById("nameBook");

    if(localStorage.getItem(`description`)=== "false"){
        let setDescription = document.getElementById("setDescription").value;
        let setImage = document.getElementById("setImage").value;
        let setCountPage = document.getElementById("setCountPage").value;
        let setBookmark = document.getElementById("setBookmark").value;
        discription.hidden = false;
        localStorage.setItem("description",true);
        settings.hidden = true;
        fetch("/api/getLibrary").
        then(res => res.json()).then(result =>{
            result.forEach(element=>{
                if(element['name']===name.innerText){
                    if(setCountPage !== ""){
                        let countPage =document.getElementById("countPage");
                        countPage.innerText = `Страниц: ${setCountPage}`;
                        element['info']['countPage'] = setCountPage;
                    }
                    if(setBookmark !== ""){
                        let bookmark =document.getElementById("bookmark");
                        bookmark.innerText = `Закладка: ${setBookmark}`;
                        element['info']['bookmark'] = setBookmark;
                    }
                    if(setImage !== ""){
                        let imageBook =document.getElementById("imageBook");
                        imageBook.src = setImage;
                        element['info']['image'] = setImage;
                    }
                    if(setDescription !== ""){
                        let description =document.getElementById("description");
                        description.innerText = `${setDescription}`;
                        element['info']['description'] = setDescription;
                    }
                }
            })
                fetch("/api/refreshJson", {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body:JSON.stringify(result)
                }).then(res => res.json()).then(result =>{
                    console.log("Json updated!",result);
                });
        })
    }else{
        discription.hidden = true;
        localStorage.setItem("description",false);
        settings.hidden = false;
    }
}
function takeBook() {
    let name = document.getElementById("nameBook").innerText;
    let takeBookForm = document.getElementById("takeBookForm");
    let discription = document.getElementById("description");
    if (localStorage.getItem(`takeBookForm`) === "false") {

        takeBookForm.hidden = true;
        discription.hidden = false;
        localStorage.setItem("takeBookForm", true);
        let setDebtorName = document.getElementById("debtorName").value;
        let setDateToTook = document.getElementById("dateToTook").value;
        fetch("/api/getLibrary").then(res => res.json()).then(result => {
            result.forEach(element => {
                if (element["name"] === name) {


                    if (setDebtorName !== "" && setDateToTook !== "") {
                        if (element['count'] !== "Нет в наличии") {
                            let debtor = document.getElementById("debtor");
                            debtor.innerText = "Взял: " + setDebtorName;
                            element['info']['debtor'] = setDebtorName;

                            let date = document.getElementById("dateToTookTxt");
                            date.innerText = "Когда взял: " + setDateToTook;
                            element['info']['dateWhenTake'] = setDateToTook;

                            let InStock = document.getElementById("InStock");
                            InStock.innerText = "Нет в наличии";
                            element['count'] = "Нет в наличии";
                        }
                    } else {
                        document.getElementById("popUp").hidden = false;
                        setTimeout(function () {
                            document.getElementById("popUp").hidden = true;
                        }, 2000)
                    }

                }
            });
            fetch("/api/refreshJson", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(result)
            }).then(res => res.json()).then(result => {
                console.log("Json updated debtor!", result);
                renderTableLib(result);
            });
        });
    } else {
        if (document.getElementById("InStock").innerText === "Нет в наличии") {
            let pushApp = document.getElementById("popUp");
            pushApp.hidden = false;
            pushApp.innerText = "Книги нет в наличии!";
            setTimeout(function () {
                pushApp.hidden = true;
            }, 2000)
        } else {
            takeBookForm.hidden = false;
            localStorage.setItem("takeBookForm", false);
            discription.hidden = true;
        }
    }
}

function returnBook() {
    let name = document.getElementById("nameBook").innerText;
    fetch("/api/getLibrary").then(res => res.json()).then(result => {
        result.forEach(element => {
            if (element["name"] === name && element['info']['debtor'] !== "") {
                let debtor = document.getElementById("debtor");
                let dateToReturn = document.getElementById("dateToReturn");
                dateToReturn.innerText = "Вернул: " + element["info"]['debtor']+" " + new Date().toJSON().slice(0, 10).replace(/-/g, '-');
                element['info']['dateWhenReturn'] = new Date().toJSON().slice(0, 10).replace(/-/g, '-');


                debtor.innerText = "Взял: ";
                element['info']['debtor'] = "";

                let date = document.getElementById("dateToTookTxt");
                date.innerText = "Когда взял: ";
                element['info']['dateWhenTake'] = "";

                let InStock = document.getElementById("InStock");
                InStock.innerText = "В наличие";
                element['count'] = "В наличие";

            }
        });
        fetch("/api/refreshJson", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(result)
        }).then(res => res.json()).then(result => {
            console.log("Json updated Stock!", result);
            renderTableLib(result);
        });
    });
}

function removeBook(){
    let tokenToRemove = document.getElementById("tokenToRemove").value;
    fetch("/api/getLibrary").then(res => res.json()).then(result => {
        delete result[tokenToRemove];
        result = result.filter(function(el) { return el;});
        fetch("/api/refreshJson", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(result)
        }).then(res => res.json()).then(result => {
            console.log(`Json updated removed book with token: ${tokenToRemove}!`, result);
            renderTableLib(result);
        });
    });
}

function sort(sortedBy){
    console.log(sortedBy.id);
    if(sortedBy.id !== "availability"){
        let sort;
        sortBy ? sort = "ascending":sort = "descending";
        fetch(`/api/sort/${sortedBy.id}/${sort}`).then(res => res.json()).then(result =>{
            renderTableLib(result);
            sortBy = !sortBy;
        })
    }else{
        let sort;
        availability? sort = "available":sort="notAvailable";
        fetch(`/api/filterAvailability/${sort}`).then(res => res.json()).then(result => {
            renderTableLib(result);
            availability = !availability;
        })
    }

}

function refreshFilters(){
    fetch(`/api/resetFilters`).then(res => res.json()).then(result =>{
        renderTableLib(result);
    })
}