// This app allows you to draw on a virtual canvas using your nose.
// Global variables for x and y coordinates
var x1=0;
var y1=0;
var x2=0;
var y2=0;

//Screen size for camera
var maxCam = 150;

//For posenet this function is required
function preload() {

}

// Creating Canvas for drawing
canvas= document.getElementById("myCanvas");
ctx=canvas.getContext("2d");
ctx.strokeStyle='blue';
ctx.lineWidth=1;

// Setting up camera and posenet
function setup() {
    //Initialising camera
    video=createCapture(VIDEO);
    video.position(20,200,'fixed');
    video.size(maxCam,maxCam);
    
    //Initialising Posenet
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    
}

//Posenet initialised and User asked to write
function modelLoaded() {
    console.log("Posenet is Initialised");
    document.getElementById("Noti").innerHTML="Start Drawing"; 
}

//Get values of x and y from posenet and Initialize x and y coordinates.
function gotPoses(results) {
    // If results have no data, dont do anything.
    if (results.length>0) {
        //If x1,y1 is 0, it means we havnt drawn anything yet.
        //In that case we should store starting point in x1 y1.
        //Else we already have a starting point, we need to get current
        //coordiates in x2,y2 which represent current coordinates
        //To take care of mirror image size of video which is maxCam needs to
        // be subtracted from x coordinates.
        if (x1==0 && y1==0) {
            x1=maxCam-results[0].pose.nose.x;
            y1=results[0].pose.nose.y;
        } else{
            x2=maxCam-results[0].pose.nose.x;
            y2=results[0].pose.nose.y;
        } 
        console.log("last :" +x1, y1, "current:" + x2,y2);
    }
}

// Draws the line between x1,y1 and x2,y2
function draw() {
    ctx.beginPath();
    // Round the coordinates 
    x1=Math.round(x1);
    x2=Math.round(x2);
    y1=Math.round(y1);
    y2=Math.round(y2);
  
    //If x1,y1 are 0 or x2,y2 are 0 it means we have not yet started.
    // To avoid lines drawn from origin this condition is given given
    if ((x1 != 0 || y1 != 0) && (x2!=0 || y2!=0)) {
        // If x1,y1 and x2,y2 are same then no need to draw      
        if (x1 != x2 && y1 != y2) {
            
            //Actual drawing happens here
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.stroke();
            
            console.log("Drawing last :" +x1, y1, "current:" + x2,y2);
            
            //Swap old parameter with new as the line is already drawn.
            //New parameters will be extracted from posenet. Before that need to
            //Store current position.
            x1=x2;
            y1=y2;
        }
    }
}

//To clear the canvas
function clearCanvas() {
    ctx.clearRect(0,0,300,300);
}