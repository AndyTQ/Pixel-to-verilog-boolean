function startToLoad(url) {

    let canvas = document.getElementById("canvas");
    let canvas2 = document.getElementById("visualResult");
    let ctx = canvas.getContext("2d");
    let ctx2 = canvas2.getContext("2d");
    let img = document.getElementById("importedImage");
    let imgEntity = document.getElementById("file-input");

    return new Promise(function (resolve, reject) {

        document.getElementById("file-input").click()
        imgEntity.onchange = function () {
            console.log("changed!");
            resolve(true);
        }

    })
    .then(function () {
        return new Promise(function (resolve, reject) {
            let reader = new FileReader();
            let file = document.getElementById("file-input").files[0];
            if (file) {
                reader.readAsDataURL(file);
            } else {
                console.log("render failed");
            }

            reader.onloadend = function () {
                console.log('image src is set');
                img.src = reader.result;
                resolve(img.src);
            }
        });
    })
    .then(function(value) {
            console.log("visual result of ctx2")
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            console.log(imgData)
            // initialize coordinates
            var x_coordinate = 0;
            var y_coordinate = 0;
            var pixels_count = 0;
            let result = ""
            for (i = 0; i < imgData.data.length; i += 4) {
                //Check if the current pixel is black.
                if (
                    imgData.data[i] <= 100 &&
                    imgData.data[i + 1] <= 100 &&
                    imgData.data[i + 2] < 255 
                    
                ) {
                    if (pixels_count == 0) {
                        result += "  (x == " + String(x_coordinate) + " && y == " + String(y_coordinate) + ")" + "<br>";
                    }
                    else {
                        result += "||(x == " + String(x_coordinate) + " && y == " + String(y_coordinate) + ")" + "<br>";
                    }
                    pixels_count++;
                    ctx2.fillRect(x_coordinate, y_coordinate, 1, 1);
                }

                x_coordinate+=1;

                if (x_coordinate == 160) {
                    // i += 4 * 160
                    y_coordinate+=1;
                    x_coordinate = 0;
                }
            }

            document.getElementById("result").innerHTML = result;

            console.log("There are total of " + pixels_count + " black pixels drawn.")
            // ctx.putImageData(imgData, 0, 0);
    })
}