var pixelList = [];
var imgWidth = 0;
var imgHeight = 0;

function reset_global_values() {
    pixelList = []; //Empty Pixel List
    imgWidth = 0;
    imgHeight = 0;
}

function import_image_from_upload(event) {
    var url = URL.createObjectURL(event.target.files[0]);
    document.getElementById("image_preview_display_hidden").src = url;
    reset_global_values()
    place_image_in_canvas();
    return;
}

function place_image_in_canvas() {
    var canvas = document.getElementById("image_preview_display");
    var ctx = canvas.getContext("2d");
    var image = document.getElementById("image_preview_display_hidden");
    image.onload = function () {
        ctx.canvas.width = imgWidth = this.width;
        ctx.canvas.height = imgHeight = this.height;
        ctx.drawImage(this, 0, 0);
        set_image_to_gray_scale();
    };
    return;
}

function set_image_to_gray_scale() {
    var canvas = document.getElementById("image_preview_display");
    var ctx = canvas.getContext("2d");
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < imgData.data.length; i += 4) {
        var gandalf = Math.round((imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3);
        imgData.data[i] = gandalf;
        imgData.data[i + 1] = gandalf;
        imgData.data[i + 2] = gandalf;

        pixelList.push(Math.floor(gandalf % 4));
    }
    ctx.putImageData(imgData, 0, 0);
    return;
}

function image_2_ascii() {
    var pixels = pixelList;
    var width = imgWidth;
    var height = imgHeight;

    var ascii_text = '<pre>';

    var totalPixels = 0;
    for (var i = 0; i < pixels.length; i++) {
        if (!(i % width)) {
            ascii_text += "\n"; //'<br>';
        }
        //ascii_text += pixels[i];
        switch (pixels[i]) {
            case 0:
                //ascii_text += String.fromCharCode(32);
                ascii_text += " ";
                break;
            case 1:
                //ascii_text += String.fromCharCode(61);
                ascii_text += "░";
                break;
            case 2:
                //ascii_text += String.fromCharCode(43);
                ascii_text += "▒";
                break;
            case 3:
                //ascii_text += String.fromCharCode(35);
                ascii_text += "▓";
                break;
            default:
            // code block
        }
        totalPixels++;
    }
    ascii_text += '</pre>';
    console.log({totalPixels,width,height});
    //console.log(ascii_text);
    document.getElementById("ascii_output").innerHTML = ascii_text;
}