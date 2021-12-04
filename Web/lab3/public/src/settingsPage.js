$(document).ready(()=>{

    $(`#updateSettings`).on(`click`, () =>{
        let timeBegin = $("#startTime").val()
        let dateBegin = $("#startDate").val()
        let sellInterval = $("#intervalSell").val()
        let pauseInterval = $("#pauseInterval").val()
        if(timeBegin === "" || dateBegin === "" || sellInterval === "" || pauseInterval === ""){
            alert("Вы не ввели все данные")
        } else{
            let settings = {
                "timeBegin": timeBegin,
                "dateBegin" : dateBegin,
                "sellInterval": sellInterval,
                "pauseInterval": pauseInterval
            }
            console.log(settings)

            $.post("/settings/update", {"data": JSON.stringify(settings)})
        }

    });

})