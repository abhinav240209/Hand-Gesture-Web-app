//https://teachablemachine.withgoogle.com/models/Y4hKHYor1/model.json

prediction_1="";
prediction_2="";

Webcam.set({
   width:350,
   height:300,
   image_format:'png',
   png_quality:90
});

 myWebcam=document.getElementById("camera");
 Webcam.attach(myWebcam);



function capture(){
   Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>";

   });

}

function predict(){
   console.log("ml5 version", ml5.version);
   classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Y4hKHYor1/model.json", modelLoaded);

  
}




function modelLoaded() {
     console.log("model loaded");
     img=document.getElementById("captured_image");
     classifier.classify(img, gotResult);
}



function gotResult(error, results) {
 if(error) {
   console.error(error);
 }
 else{
   console.log(results);
   prediction_1=results[0].label;
   prediction_2=results[1].label;
   document.getElementById("result_gesture_name").innerHTML=prediction_1;
      document.getElementById("result_gesture_name2").innerHTML=prediction_2;
      speak();
   if(prediction_1=="victory"){
      document.getElementById("update_emoji").innerHTML="&#9774;";
   }

   else if(prediction_1=="like"){
      document.getElementById("update_emoji").innerHTML="&#128077;";
   }

   else if(prediction_1=="amazing"){
      document.getElementById("update_emoji").innerHTML="&#128076;";;
   }

   if(prediction_2=="victory"){
      document.getElementById("update_emoji2").innerHTML="&#9774;";
 }

 else if(prediction_2=="like"){
   document.getElementById("update_emoji2").innerHTML="&#128077;";
 }

 else if(prediction_2=="amazing"){
   document.getElementById("update_emoji2").innerHTML="&#128076;";
 }
      
 }
}


function speak(){
   var synth=window.speechSynthesis;
   var speechData_1="The first prediction is" + prediction_1;
   var speechData_2="The second prediction is" + prediction_2;
   var converted_speech=new SpeechSynthesisUtterance(speechData_1+speechData_2);
   converted_speech.lang='en-ENG';
   synth.speak(converted_speech);
}


