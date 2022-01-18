

let socket = io();
let current_timer;
let info_timer;
let torg_timer;
let save_info;
let save_torg;
let cur_art = -1;
let arts;
let cur_user;
let bet = 0;
socket.on('connect',() =>{
    let text = $('title').text();
    socket.emit('ehlo', {name:text});
});

socket.on('welcome', function(data) {
    const text = "<p>" + data.message;
    update_info(data);
    $('#message').append(text);
});


socket.on('mail_bet', function(data) {
    var text = "<p>" + data.message;
    $('#message').append(text);
});

socket.on('error_mail_bet', function(data) {
    var text = "<p>" + data.message;
    $('#message').append(text);
    set_zero_bet();
});




$("#setMoney").on("click", () => {
     bet = $('#bet').val()/1;
    console.log(bet);
    if(!(bet === "")){
        console.log(bet);
         let text = $('title').text();
         socket.emit('make_bet', {name:text,user: cur_user ,bet:bet, artIndex:cur_art});
    }

});

function update_info(data){
    let title = $('title').text();
    arts = data.painting;
    for(let usr of data.users) {
        if(usr.name === $('title').text()) {
            cur_user = usr;
            console.log(usr)
        }
    }

    if(cur_art !== -1){
        drawCurrentPainting();
    }
    updateParticipants(data);

    console.log(data);
}

function updateParticipants(data){
    $(`#contentParticipants`).empty();
    for(let i =0; i < data.users.length; i++){
        let content = $(`#contentParticipants`);
        content.append(`<div class="boxPainting">`)
        let boxPainting = content.find(`div.boxPainting`);
        boxPainting.last().append(`<div class="textBox">`);
        boxPainting.last().find(`div.textBox`).last().append(`<grid>`);
        let grid = boxPainting.last().find(`div.textBox`).last().find(`grid`).last();
        grid.append(`<text id="name">Имя: ${data.users[i]["name"]}</text>`);
        grid.append(`<text id="painter">Бюджет: ${data.users[i]["budget"]}</text>`);
        grid.append(`<text id="buy">Купленно: ${data.users[i]["buy"]}</text>`);
        grid.append(`<flex>`);
        if(window.location.pathname !== "/user"){
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
}

socket.on('start', function(data) {
    let text = $('title').text();
    $('#message').append("<p>"+ data.message+"</p>");
    current_timer = data.setting.timeEnd;
    info_timer = data.setting.pauseInterval;
    torg_timer = data.setting.sellInterval;
    save_info = data.setting.pauseInterval;
    save_torg = data.setting.sellInterval;
    get_new_art();
    setTimeout(current_time, 1000);
    setTimeout(info_time, 1000);
});

socket.on('update', function(data) {
    update_info(data);
    console.log("Я ТОЖЕ **** ВАШИ РТЫ");
    $('#message').append(data.message);
});

$("#startA").on("click", ()=>{
    socket.emit('admin_start');
    $('#startA').attr('disabled', true);
});

function get_new_art(){
    cur_art++;
    let art = arts[cur_art];
    if(art){
        if(art["buyer"] === "-"){
            $('#message').append("<p> " + art.name);
            arts[cur_art].currentCost = arts[cur_art].cost;
            $.post("/picture/update", {"data": JSON.stringify(arts)});
            drawCurrentPainting();
        }else{
            get_new_art();
        }
    }


}

function drawCurrentPainting(){
    $(`#contentPainting`).empty();
    let content = $(`#contentPainting`);
    content.append(`<div class="boxPainting">`)
    let boxPainting = content.find(`div.boxPainting`);
    boxPainting.last().append(`<img src="${arts[cur_art]["link"]}"/>`);
    boxPainting.last().append(`<div class="textBox">`);
    boxPainting.last().find(`div.textBox`).last().append(`<text id="Name">Название: ${arts[cur_art]["name"]}</text>`);
    boxPainting.last().find(`div.textBox`).last().append(`<text id="painter">Художник: ${arts[cur_art]["author"]}</text>`);
    boxPainting.last().find(`div.textBox`).last().append(`<text id="startPrice">Начальная цена:  ${arts[cur_art]["cost"]}</text>`);
    boxPainting.last().find(`div.textBox`).last().append(`<text id="minStep">Минимальный шаг аукциона:  ${arts[cur_art]["min"]}</text>`);
    boxPainting.last().find(`div.textBox`).last().append(`<text id="maxStep">Максимальный шаг аукциона:  ${arts[cur_art]["max"]}</text>`);
    boxPainting.last().find(`div.textBox`).last().append(`<text id="currentCost">Текущая ценна:  ${arts[cur_art]["currentCost"]}</text>`);
    boxPainting.last().find(`div.textBox`).last().append(`<text id="sellFor">Продано за:  ${arts[cur_art]["sellFor"]}</text>`);
    boxPainting.last().find(`div.textBox`).last().append(`<text id="buyer">покупатель:  ${arts[cur_art]["buyer"]}</text>`);

}

function info_time() {
    if(current_timer === 0) {
        return;
    }
    $('#setMoney').attr('disabled', true);
    info_timer -= 1;
    $('#local_time').empty();
    $('#local_time').append(`До конца изучения информации по картине: ${info_timer}`);
    if(info_timer > 0) {
        setTimeout(info_time, 1000);
    } else {
        setTimeout(torg_time, 1000);
    }
}

function current_time() {
    current_timer -= 1;
    $('#current_time').empty();
    $('#current_time').append(`До конца аукциона: ${current_timer}`);
    if(current_timer > 0) {
        setTimeout(current_time, 1000);
    } else {
        $('#setMoney').attr('disabled', true);
        $('#message').append('<p> Аукцион закончен.');
        $('#startA').attr('disabled',false);
    }
}

function torg_time() {
    if(current_timer === 0) {
        return;
    }
    if($('title').text() !== "Admin") {
        $('#setMoney').attr('disabled', false);
    }
    torg_timer -= 1;
    $('#local_time').empty();
    $('#local_time').append(`До конца торга по картине: ${torg_timer}`);
    if(torg_timer > 0) {
        setTimeout(torg_time, 1000);
    } else {
        torg_timer = save_torg;
        info_timer = save_info;
        let text = $('title').text();
        console.log(bet + "--" +arts[cur_art].cost);
        if(bet >= arts[cur_art].cost/1) {
            socket.emit('buy', {user: cur_user, price: bet, paintIndex: cur_art});
            bet = 0;
        }
        get_new_art();

        setTimeout(info_time, 1000);
    }
}

function set_zero_bet() {
    bet = 0;
}