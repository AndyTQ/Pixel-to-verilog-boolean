/**********************AUG 13 2018****************************/
        /*******************AUTHOR: Andy (Tianquan)*******************/
        /**JavaScript pixel to verilog boolean expression converter***/
        /**************Please set white as image's background*********/
        /*************and black as the pixels to draw*****************/
        function draw() {
            var canvas = document.getElementById("canvas");
            var canvas2 = document.getElementById("visualResult");
            var ctx = canvas.getContext("2d");
            var ctx2 = canvas2.getContext("2d");
            var img = document.getElementById("importedImage");
            ctx.drawImage(img, 0, 0);
            var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            // initialize coordinates
            var x_coordinate = 0;
            var y_coordinate = 0;
            var pixels_count = 0;
            for (i = 0; i < imgData.data.length; i += 4) {
                //Check if the current pixel is black.
                if (imgData.data[i] == 0 &&
                    imgData.data[i + 1] == 0 &&
                    imgData.data[i + 2] == 0
                ) {
                    if (pixels_count == 0) {
                        document.getElementById("result").innerHTML += "  (x_pointer == " + String(x_coordinate) + " && y_pointer == " + String(y_coordinate) + ")" + "<br>";
                    }
                    else {
                        document.getElementById("result").innerHTML += "||(x_pointer == " + String(x_coordinate) + " && y_pointer == " + String(y_coordinate) + ")" + "<br>";
                    }
                    pixels_count++;
                    ctx2.fillRect(x_coordinate, y_coordinate, 1, 1);
                }

                x_coordinate++;

                if (x_coordinate == 160) {
                    y_coordinate++;
                    x_coordinate = 0;
                }
            }

            document.getElementById("result").innerHTML = "There are total of " + pixels_count + " black pixels drawn. Verilog: <br>" + document.getElementById("result").innerHTML;
            // ctx.putImageData(imgData, 0, 0);

        };