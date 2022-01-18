let name = localStorage.getItem('name');
$('#name').text(`Welcome ${name}!`);
window.addEventListener("load", function(event) {
    $("#settings").on('click', () => {
        alert("Могли бы быть тут.");
    })

    $("#play").on('click', () => {
        window.open('level1', '_self');
    })

    $("#volume").on('change', () => {
        let volume = $('#volume').val();
        console.log(volume);
        $("#music")[0].volume = volume;
    })

    $("#music")[0].play();
});