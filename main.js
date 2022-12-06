//Link Teachable Machine: https://teachablemachine.withgoogle.com/models/r-ybt38P1/

falar = ""

Webcam.set({
    width: 350,
    height: 300,
    imageFormat: "png",
    pngQuality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+ data_uri +'"/> ';
    })
}

console.log("ml5 version: ", ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/r-ybt38P1/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);

    } else {
        
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML = results[0].label;

        falar = results[0].label;

        speak();

        if (results[0].label == "Tranquilo") {
            
            document.getElementById("updateEmoji").innerHTML = "&#129305;"
        }

        if (results[0].label == "Legal") {
            
            document.getElementById("updateEmoji").innerHTML = "&#128077;"
        }

        if (results[0].label == "Vitória") {
            
            document.getElementById("updateEmoji").innerHTML = "&#9996;"
        }
    }
}

function speak() {
    var synth = window.speechSynthesis;
    falar = "A previsão é" + falar;
    var utterThis = new SpeechSynthesisUtterance(falar);
    synth.speak(utterThis);
}




