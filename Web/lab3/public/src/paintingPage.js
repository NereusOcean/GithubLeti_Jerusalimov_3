

$(document).ready(()=>{
    renderPage("/picture/add");
    $(`#addPainting`).on(`click`, () =>{
        $(`#dialogFormToAddPainting`).show();
    });
    $(`#updatePainting`).on(`click`, () =>{
        updatePaint();
    });



    $(`#addPaintingButton`).on(`click`, () =>{
        let name_pic = $("#name_pic").val();
        let author_name = $("#author_pic").val();
        let cost = $("#cost").val();
        let image = $("#image_pic").val();
        if(name_pic === "" ||author_name === "" ||cost === "" || image === ""){
            alert("Заполните все поля отмеченные звездой!")
        }else{
            let painting = {
                "index": "",
                "name": name_pic,
                "author": author_name,
                "cost": cost,
                "min": "5",
                "max": "10",
                "link": image
            }
            $("#name_pic").val("");
            $("#author_pic").val("");
            $("#image_pic").val("");
            $("#cost").val("");
            $.post("/picture/add", {"data": JSON.stringify(painting)});
            $(`#dialogFormToAddPainting`).hide();
            renderPage("/picture/add");
        }

    });

    $(`#closeAddingPainting`).on(`click`, () =>{
        $(`#dialogFormToAddPainting`).hide();
    });

    $(`#closeSettingsPainting`).on(`click`, () =>{
        $(`#dialogFormToEditPaintings`).hide();
    });

});

function renderLib(lib){
    $(`#contentPainting`).empty();
    for(let i =0; i < lib.length; i++){
        let content = $(`#contentPainting`);
        content.append(`<div class="boxPainting">`)
        let boxPainting = content.find(`div.boxPainting`);
        boxPainting.last().append(`<img src="${lib[i]["link"]}"/>`);
        boxPainting.last().append(`<div class="textBox">`);
        boxPainting.last().find(`div.textBox`).last().append(`<text id="Name">Название: ${lib[i]["name"]}</text>`);
        boxPainting.last().find(`div.textBox`).last().append(`<text id="painter">Художник: ${lib[i]["author"]}</text>`);
        boxPainting.last().find(`div.textBox`).last().append(`<text id="startPrice">Начальная цена:  ${lib[i]["cost"]}</text>`);
        boxPainting.last().find(`div.textBox`).last().append(`<text id="minStep">Минимальный шаг аукциона:  ${lib[i]["min"]}</text>`);
        boxPainting.last().find(`div.textBox`).last().append(`<text id="maxStep">Максимальный шаг аукциона:  ${lib[i]["max"]}</text>`);
        boxPainting.last().find(`div.textBox`).last().append(`<flex>`);
        boxPainting.last().find(`div.textBox`).last().find(`flex`).last().append(`<button id="editPaintingSettings">Редактировать</button>`);
        boxPainting.last().find(`div.textBox`).last().find(`flex`).last().append(`<button id="deletePaintingSettings">Удалить картину</button>`);

        boxPainting.last().find(`div.textBox`).last().find(`flex`).last().find("#deletePaintingSettings").on("click", ()=>{
           deletePainting(i);
        });

        boxPainting.last().find(`div.textBox`).last().find(`flex`).last().find("#editPaintingSettings").on("click", ()=>{
            editPaintingSettings(i);
        });
    }
}


function renderPage(url){
    $.getJSON(url).then(res => renderLib(res))
}

function deletePainting(token){
    $.get(`/picture/delete/${token}`).then(res => {
        //alert(res);
        renderPage("/picture/add");
    })
}
function updatePaint(){
    let token = $("#ids").val();
    let name_pic = $("#namePic").val();
    let author_name = $("#authorPic").val();
    let cost = $("#costPic").val();
    let image = $("#imagePic").val();
    let max = $("#minPriceStep").val();
    let min = $("#maxPriceStep").val();

        let painting = {
            "index": token,
            "name": name_pic,
            "author": author_name,
            "cost": cost,
            "min": min,
            "max": max,
            "link": image
        }

        $.post("/picture/update", {"data": JSON.stringify(painting)});
        $(`#dialogFormToAddPainting`).hide();
        renderPage("/picture/add");
}

function editPaintingSettings(token){
        $.getJSON("/picture/add").then(res => {
            $("#ids").val(token);
            $("#namePic").val(res[token]["name"]);
            $("#authorPic").val(res[token]["author"]);
            $("#costPic").val(res[token]["cost"]);
            $("#imagePic").val(res[token]["link"]);
            $("#minPriceStep").val(res[token]["max"]);
            $("#maxPriceStep").val(res[token]["min"]);
            $(`#dialogFormToEditPaintings`).show();
        })


}