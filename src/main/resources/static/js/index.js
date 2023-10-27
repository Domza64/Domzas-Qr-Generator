function loadQrCode() {
    $.post("/api/getId", { text:$('#input').val() }, function (data) {
        var image = $('<img src="/api/qrcode/' + data + '"></img>');
        $('#qr-container').html('').append(image);
    });
}