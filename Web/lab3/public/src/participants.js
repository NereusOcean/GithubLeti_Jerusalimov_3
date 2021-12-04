
$(document).ready(()=>{
    renderPage("/participants/add");
    $(`#addParticipants`).on(`click`, () =>{
        $(`#dialogFormToAddParticipants`).show();
    });
    $(`#updateParticipants`).on(`click`, () =>{
        updateParticipants();
    });

    $(`#addParticipantsButton`).on(`click`, () =>{
        let name = $("#name").val();
        let budget = $("#budget").val();
        if(name === "" ||budget === ""){
            alert("Заполните все поля отмеченные звездой!")
        }else{
            let participants = {
                "index": "",
                "name" : name,
                "budget": budget
            }
            $("#name").val("");
            $("#budget").val("");
            $.post("/participants/add", {"data": JSON.stringify(participants)});
            $(`#dialogFormToAddParticipants`).hide();
            renderPage("/participants/add")

        }

    });

    $(`#closeAddingParticipants`).on(`click`, () =>{
        $(`#dialogFormToAddParticipants`).hide();
    });

    $(`#closeSettingsParticipants`).on(`click`, () =>{
        $(`#dialogFormToEditParticipants`).hide();
    });
});


function renderLib(lib){
    $(`#contentPainting`).empty();
    for(let i =0; i < lib.length; i++){
        let content = $(`#contentPainting`);
        content.append(`<div class="boxPainting">`)
        let boxPainting = content.find(`div.boxPainting`);
        boxPainting.last().append(`<div class="textBox">`);
        boxPainting.last().find(`div.textBox`).last().append(`<grid>`);
        let grid = boxPainting.last().find(`div.textBox`).last().find(`grid`).last();
        grid.append(`<text id="name">Имя: ${lib[i]["name"]}</text>`);
        grid.append(`<text id="painter">Бюджет: ${lib[i]["budget"]}</text>`);
        grid.append(`<flex>`);
        grid.find(`flex`).last().append(`<button id="editParticipantsSettings">Редактировать</button>`);
        grid.find(`flex`).last().append(`<button id="deleteParticipantsSettings">Удалить участника</button>`);

        grid.find(`flex`).last().find("#deleteParticipantsSettings").on("click", ()=>{
            deletePainting(i);
        });

        grid.find(`flex`).last().find("#editParticipantsSettings").on("click", ()=>{
            editParticipantsSettings(i);
        });
    }
}

function renderPage(url){
    $.getJSON(url).then(res => renderLib(res))
}

function updateParticipants(){
    let name = $("#newName").val()
    let cost = $("#newBudget").val()
    let id = $("#ids").val()
    let participants = {
        "index": id,
        "name": name,
        "budget": cost,
    }
    console.log(participants)
    $.post("/participants/update", {"data": JSON.stringify(participants)});
    $(`#dialogFormToEditParticipants`).hide();
    setTimeout(renderPage("/participants/add"), 1500);

}

function editParticipantsSettings(token){
    $.getJSON("/participants/add").then(res => {
        $("#ids").val(token);
        $("#newName").val(res[token]["name"]);
        $("#newBudget").val(res[token]["budget"]);
        $(`#dialogFormToEditParticipants`).show();
    })
}

function deletePainting(token){
    $.get(`/participants/delete/${token}`).then(res => {

        renderPage("/participants/add")
    })
}