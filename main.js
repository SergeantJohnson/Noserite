var x1=0;
var y1=0;
var x2=0;
var y2=0;

//function preload() {

//} 
canvas= document.getElementById("myCanvas");
ctx=canvas.getContext("2d");
ctx.strokeStyle='blue';
ctx.lineWidth=1;


function setup() {
    video=createCapture(VIDEO); 
    video.size(150,150);
    
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    
}

function modelLoaded() {
    console.log("Posenet is Initialised");    
}


function gotPoses(results) {
    if (results.length>0) {

        if (x1==0 && y1==0) {
            x1=150-results[0].pose.nose.x;
            y1=results[0].pose.nose.y;
        } else{
            x2=150-results[0].pose.nose.x;
            y2=results[0].pose.nose.y;
        } 
        //console.log("last :" +x1, y1, "current:" + x2,y2);
    }
}


function draw() {
   ctx.beginPath();
   x1=Math.round(x1);
   x2=Math.round(x2);
   y1=Math.round(y1);
   y2=Math.round(y2);
  // console.log("last :" +x1, y1);
  // console.log("current :" + x2,y2);

   if ((x1 != 0 || y1 != 0) && (x2!=0 || y2!=0)) {
        if (x1 != x2 && y1 != y2) {
                 
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.stroke();
            
            console.log("Drawing last :" +x1, y1, "current:" + x2,y2);
        }
        assignLast();
   }
}

function assignLast() {
    x1=x2;
    y1=y2;
}    

function clearCanvas() {
    ctx.clearRect(0,0,300,300);
}