Objects = [];
Status = "";
input_text = "";

function setup(){
        canvas = createCanvas(300,290);
        canvas.position(480,250);
        video = createCapture(VIDEO);
        video.size(300,290);
        video.hide();
}

function Start(){
        objectDetector = ml5.objectDetector("cocossd", modelLoaded);
        document.getElementById("status").innerHTML = "Status: Detecting Objects";
        input_text = document.getElementById("input_id").value;
}

function modelLoaded(){
        console.log("Model_Loaded");
        Status = true;
}

function draw(){
        image(video,0,0,300,290);
        if(Status != ""){
                objectDetector.detect(video, gotResult);
                for(i = 0 ; i < Objects.length; i++)
                {
                        document.getElementById("status").innerHTML = "Status : Object Detected";
                        console.log(Objects.length);
                        fill("#FF0000");
                        percent = floor(Objects[i].confidence * 100);
                        text(Objects[i].label + " " + percent + "%", Objects[i].x + 15, Objects[i].y + 15);
                        noFill();
                        stroke("#FF0000");
                        rect(object[i].x, objects[i].y, objects[i].width, objects[i].height);
                        
                        if (object[i].label == input_text) {
                                video.stop();
                                objectDetector.detect(gotResult);
                                document.getElementById("object_found").innerHTML = input_text + " Found";
                                var synth = window.speechSynthesis;
                                var utterThis = new SpeechSynthesisUtterance(input_text + "Found");
                                synth.speak(utterThis);
                        } else {
                                document.getElementById("object_found").innerHTML = input_text + " Not Found";
                        }
                }
        }
    }

    function gotResult(error, results) {
            if(error) {
                    console.log(error);
            }
            console.log(results);
            Objects = results;
    }
