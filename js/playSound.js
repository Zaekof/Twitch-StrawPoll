let createSound = function (name, url, vol, timerRemove) {
    $(
        '<audio class="'+name+'" style="display:none;">'
            + '<source src="' + url + '" />'
            + '<embed src="' + url + '" hidden="true" autostart="false" loop="false"/>'
        + '</audio>'
    ).appendTo('body').ready(() => {
        $('.'+name).prop('volume', vol);
        $('.'+name)[0].play();
        setTimeout(() => {
            $('.'+name).remove();
        }, timerRemove);
    })
}