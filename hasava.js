// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */
//import processing.video.*;
let video;
let poseNet;
let poses = [];
let memX;
let memY;
let thresh;
let gamer;
let letter;
let found;
let counter;
let greenStation = [0,5,9,99];
let redStation = [6,8,15,99];
let old_poses = [];
let sum =[[0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0]];
let score = [0,0];
function setup() {
  gamer=1;
  sum[0][0]=0;
  thresh=100;
  createCanvas(800, 600);
  //console.log(Capture.list());
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    
    poses = results;
    //console.log(poses);
    //memX= poses[0].pose.keypoints[0].position.x;
    //memY= poses[0].pose.keypoints[0].position.y;
  });
  // Hide the video element, and just show the canvas
  video.hide();
  //clear_sum();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  background(255);
  //move image by the width of image to the left
  translate(video.width, 0);
  //then scale it by -1 in the x-axis
  //to flip the image
  scale(-1, 1);
  image(video, 0, 0, width, height);
  
  set.interval
  //image(video, 500, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  //drawLetter();
  //text ("ff",100,100);
  // heartshape(100,100,30, "#FF0000")
  // heartshape(300,200,100, "#00FF00")
  // heartshape(500,350,200, "#0000FF")
  let final_score=4000;
  // switch (gamer){
  //   0: greenStation = [0,99,99,99];
  //   redStation = [6,8,15,99];
  //   final_score=1000;
  //   break;
  //   1: greenStation = [5,6,99,99];
  //   redStation = [0,10,9,99];
  //   final_score=5000;
  //   break;
  // }
  //let final_score=5000;
  /////////////////////////////////////////
  /*
  if (score[1]<0){
    score[1]=0;
  }
  if (score[0]<0){
    score[0]=0;
  }
  let winner = (score[1]-score[0])/final_score;
  let mp= map(winner,-1,1,0,100);
  if (winner<1 && winner> -1) {
  motion();
  old_poses = poses;
  //calc_score();
  textSize(52);
  //setTimeout("myTimeout1", 2000);
  
    fill(0, 255, 255);
    text(int(mp),600,100);
    rect(100,20,600,20);
    fill(255, 0, 255);
    text(int(100-mp),100,100);
    rect(100,20,300-(300*winner),20);
  }
  else if (winner<0){
      textSize(80);
      fill(255, 0, 255);
      text("PURPLE WINS!!",100,300);
    }else{
      textSize(80);
      fill(0, 255, 255);
      text("BLUE WINS!!",100,300);

    
  }
  textSize(18);

  
  //text(sum[0],100,100);
  //drawSkeleton();
  
  *////////////////////////////////////////////////////////
  	strokeWeight(0);

  if (poses.length>0){
  drawSkeleton(0,0);
  hasava(0);
  }
  //drawKeypoints();
  fill(255, 255, 0);

  
  //ellipse(noseX, noseY, 10, 10);

}
function mousePressed() {
//function clear_sum(){
  //fill(0);
  //tempo=mouseX;
  let mini=min(2,poses.length)

  for (let i=0; i<mini; i++){
    for (let j=0; j<poses[i].pose.keypoints.length;j++){
    sum[i][j]=0;
    }
  //score[i]=0;
  }
  score[0]=0;
  score[1]=0;
  //text(mouseX,640,480);

}


// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      noStroke();
      if (keypoint.score > 0.2) {
        if (j==greenStation[0] || j==greenStation[1] || j==greenStation[2] || j==greenStation[3]){
          fill(0, 255, 0,150);
           //ellipse(keypoint.position.x, keypoint.position.y, 15, 15);
          heartshape(keypoint.position.x, keypoint.position.y, 40, "#00FF00")

        }else if (j==redStation[0] || j==redStation[1] || j==redStation[2] || j==redStation[3]){
          fill(255, 0, 0);
           ellipse(keypoint.position.x, keypoint.position.y, 40, 40);
          //heartshape(keypoint.position.x, keypoint.position.y, 40, "#FF0000")
        }else{
          fill(255, 255, 0,150);
           ellipse(keypoint.position.x, keypoint.position.y, 15, 15);
          //heartshape(keypoint.position.x, keypoint.position.y, 20, "#FFFF00")
        }
        
        
        //ellipse(keypoint.position.x, keypoint.position.y, 5, 5);
        //text(int(keypoint.position.x),keypoint.position.x-100,keypoint.position.y)  
        //text(int(keypoint.position.x)+","+int(keypoint.position.y),keypoint.position.x,keypoint.position.y)
        //if (j=0){
          //text(keypoint.position.x,100,100)
          //text(keypoint.position.y,100,200)
          //float pntX=keypoint.position.x;
          //float pntY=keypoint.position.y;
        //}
      }
    }
  }
}

function motion()  {

  // Loop through all the poses detected
  fill(255, 255, 0);
  let maxi=min(poses.length,old_poses.length,2);
  
  if (maxi<2){
    textSize(90);
    text("Player missing",100,300);
    return;
  }
  if (maxi>2){
    return
  } 
  //max score
  // let best1 =max(poses[0].score,poses[1].score);
  // let best2 =min(poses[0].score,poses[1].score);
  // let ind1 =0;
  // let ind2 =1;
  // if (poses[0].score>poses[1].score){
  //   ind1=0;
  //   ind2=1;
  // }else{
  //   ind1=0;
  //   ind2=1;
  // }
  

  // for (let t=2; t<poses.length;t++){
  //   if (poses[t].score>best1){
  //     best2=best1;
  //     best1=poses[t].score;
  //     ind2=ind1;
  //     ind1=t;
  //   }
  //   else if (poses[t].score>best2){
      
  //     best2=poses[t].score;
      
  //     ind2=t;
  //   }
  // }

  //calc motion
  let flip;
  let p0=poses[0].pose.keypoints[0].position.x;
  let p1=poses[1].pose.keypoints[0].position.x;
  let p0_old=old_poses[0].pose.keypoints[0].position.x;
  let p1_old=old_poses[1].pose.keypoints[0].position.x;
  if (p0<p1){
      pose_left = poses[0].pose;
      pose_right = poses[1].pose;
      drawSkeleton(0,1);
      drawSkeleton(1,0);
      // flip=0;
    }
    else{
      pose_left = poses[1].pose;
      pose_right = poses[0].pose;
      drawSkeleton(1,1);
      drawSkeleton(0,0);
      flip=1;
    }

    if (p0_old<p1_old){
      old_pose_left = old_poses[0].pose;
      old_pose_right = old_poses[1].pose;
      // flip=0;
    }
    else{
      old_pose_left = old_poses[1].pose;
      old_pose_right = old_poses[0].pose;
      // flip=1;
    }
    console.log(maxi+"....."+flip);


  for (let p = 0; p < maxi; p++) {
    let i;
    // if (p!=flip){
    //   i=1;
    // }else{
    //   i=0;
    // }
    let pose;
    let old_pose;
    i=p;
    if(p==0){
      pose = pose_left;
      old_pose = old_pose_left;
      
    } else{
      pose = pose_right;
      old_pose = old_pose_right;
    }

    
    // For each pose detected, loop through all the keypoints
    // let pose = poses[i].pose;
    // let old_pose=old_poses[i].pose;
    if (pose.score>0.2 && old_pose.score>0.2){
      //for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let j=greenStation[0];
      let k=0;
      //while ()
      while (j<17){
        let keypoint = pose.keypoints[j];
        let old_keypoint = old_pose.keypoints[j];
        // Only draw an ellipse is the pose probability is bigger than 0.2
        if (keypoint.score > 0.2 && old_keypoint.score > 0.2) {
          sum[i][k]+=1/100*((old_keypoint.position.x-keypoint.position.x)*(old_keypoint.position.x-keypoint.position.x)+(old_keypoint.position.y-keypoint.position.y)*(old_keypoint.position.y-keypoint.position.y));
          score[i]+=1/100*((old_keypoint.position.x-keypoint.position.x)*(old_keypoint.position.x-keypoint.position.x)+(old_keypoint.position.y-keypoint.position.y)*(old_keypoint.position.y-keypoint.position.y));
          //text(int(keypoint.position.x),keypoint.position.x-100,keypoint.position.y)  
        }
        //////////////text("#"+j+"#"+int(sum[i][k]),(i)*500+50,(j+1)*10+100);
        //switch (j){
        //if (j== greenStation[k]){
            k++;
            j=greenStation[k];
          //}
        /*    break;
          case 5: j=11;
            k=2
            break;
          case 11: j=99;
            k=4
            break;
        }*/
      }
      k=0;
      j=redStation[0];
      while (j<17){
        keypoint = pose.keypoints[j];
        old_keypoint = old_pose.keypoints[j];
        
        // Only draw an ellipse is the pose probability is bigger than 0.2
        if (keypoint.score > 0.2 && old_keypoint.score > 0.2) {
          sum[i][k]-=1/150*((old_keypoint.position.x-keypoint.position.x)*(old_keypoint.position.x-keypoint.position.x)+(old_keypoint.position.y-keypoint.position.y)*(old_keypoint.position.y-keypoint.position.y));
          score[i]-=1/150*((old_keypoint.position.x-keypoint.position.x)*(old_keypoint.position.x-keypoint.position.x)+(old_keypoint.position.y-keypoint.position.y)*(old_keypoint.position.y-keypoint.position.y));
          //text(int(keypoint.position.x),keypoint.position.x-100,keypoint.position.y)  
        }
        //fill(255,0,0);
        //text("#"+j+"#"+int(sum[i][k]),(i)*500+50,(j+1)*10+300);
        //switch (j){
        //if (j== greenStation[k]){
            k++;
            j=redStation[k];
      }
      
      
    /*j=5  
    keypoint = pose.keypoints[j];
    old_keypoint = old_pose.keypoints[j];
    // Only draw an ellipse is the pose probability is bigger than 0.2
    if (keypoint.score > 0.2 && old_keypoint.score > 0.2) {
      sum[i][1]+=1/100*((old_keypoint.position.x-keypoint.position.x)*(old_keypoint.position.x-keypoint.position.x)+(old_keypoint.position.y-keypoint.position.y)*(old_keypoint.position.y-keypoint.position.y));
      
    }
    text("#5#"+int(sum[i][1]),(i+1)*100,(j+1)*10+100);
    */
      //}
    //}
    }
  }
  //old_poses = poses;
}

function drawLetter()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    //let last_latter=latter;
    found=0;
    if (pose.score>0.2){
      //is V
        if (isLat(pose,i,-5,-70,-5,-70,70,10,70,10)){
          text (i+latter,200,100);
          latter="V";
          found=1;

        }
        //is O
        if (isLat(pose,i,-5,-70,70,10,70,10,-20,-70)){
          text (i+latter,200,100);
          latter="O";
          found=1;
        }
        //is M
        /*if (isLat(pose,i,70,10,70,10,-5,-70,-5,-70)){
          text (i+latter,200,100);
          latter="M";
          //found=1;
        }
        */
        if (found==0 && counter<200){
          text (i+latter,200,100);
          counter++;
        }
        else{
        counter=0;
        latter="...";
        }      
    }else text (i+"bb",100,140);



    //if ((pose.keypoints[6].position.y<pose.keypoints[8].position.y && pose.keypoints[9].score<0.3) && (pose.keypoints[7].position.y<pose.keypoints[9].position.y || pose.keypoints[5].score<0.3 )){
    //  text ("V",200,pose.keypoints[6].position.y);
    
    //}
    /*for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        //ellipse(keypoint.position.x, keypoint.position.y, 5, 5);

        //text(int(keypoint.position.x),keypoint.position.x,keypoint.position.y)
        if (keypoint.part=="nose"){
          fill(255, 0, 0);
          noStroke();
          ellipse(keypoint.position.x, keypoint.position.y, 5, 5);
        }
        if (keypoint.part=="leftElbow") {
          fill(255, 255, 0);
          noStroke();
          ellipse(keypoint.position.x, keypoint.position.y, 5, 5);
          memX =keypoint.position.x;
          memY = keypoint.position.y;
        }
        if (keypoint.part=="rightElbow"){
          fill(255,0, 255);
          noStroke();
          ellipse(keypoint.position.x, keypoint.position.y, 5, 5);
          text (keypoint.position.y-memY,100,100)
          
        } 
        
      }

      
    }*/
  }
}


// Hasava calculator for passover

function hasava (i){
	stroke(255, 255, 0);
	strokeWeight(12);
	//poses[0].pose.keypoints[0].position.x;
	if (poses[i].pose.keypoints.length>1) {
		
		let spineTopX= (poses[0].pose.keypoints[5].position.x + poses[0].pose.keypoints[6].position.x)/2;
		let spineTopY= (poses[i].pose.keypoints[5].position.y +poses[i].pose.keypoints[6].position.y)/2;
		let spineBtmX= (poses[i].pose.keypoints[11].position.x +poses[i].pose.keypoints[12].position.x)/2;
		let spineBtmy= (poses[i].pose.keypoints[11].position.y +poses[i].pose.keypoints[12].position.y)/2;
		line(spineTopX, spineTopY, spineBtmX, spineBtmy);
		if (spineTopY- spineBtmy !=0){ 
			let angle = (spineBtmX-spineTopX)/ (spineTopY- spineBtmy);
			strokeWeight(0);
			//move image by the width of image to the left
			translate(video.width, 0);
			//then scale it by -1 in the x-axis
			//to flip the image
			scale(-1, 1);
			//
			textSize(72);
			fill(255, 255, 255);
			text("ההסבומט",530,50);
			textSize(22);
			
			fill(30, 30, 30);
			text(angle + ":הסבה נוכחית",70,20);
			textSize(72);
			if (angle<-0.02){
				fill(255, 0, 0);
				text("!הסב לצד שני",230,120);
			}
			else if (angle<0.25){
				fill(255, 255, 0);
				text(" יש להסב עוד",230,120);
				}
				else if (angle>0.6){
					fill(255, 255, 0);
					text("...הגזמת",300,120);
				} else {
					fill(0, 255, 0);
					text(":) הסבה כשרה! חג שמח",100,120);
				}
			
			
		}
		
		
	}
	
}
// A function to draw the skeletons
function drawSkeleton(i,isLeft) {
  // Loop through all the skeletons detected
  //for (let i = 0; i < poses.length; i++) {
      let skeleton = poses[i].skeleton;
      // For every skeleton, loop through all body connections
      for (let j = 0; j < skeleton.length; j++) {
        let partA = skeleton[j][0];
        let partB = skeleton[j][1];
        strokeWeight(12);
        if (isLeft){
          stroke(255, 0, 255);
        }else{
          stroke(0, 255, 255);
        }
        line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        stroke(0, 0, 0,60);
        strokeWeight(0);

      }
  }
//}


function isV(pose,i){
  // Loop through all the skeletons detected
 if ((pose.keypoints[5].position.y>pose.keypoints[7].position.y && pose.keypoints[5].score>0.2) && (pose.keypoints[7].position.y>pose.keypoints[9].position.y || pose.keypoints[7].score<0.2 )){
        if ((pose.keypoints[6].position.y>pose.keypoints[8].position.y && pose.keypoints[6].score>0.2) && (pose.keypoints[8].position.y>pose.keypoints[10].position.y || pose.keypoints[8].score<0.2 )){
          //if (pose.keypoints[5].position.x+100<pose.keypoints[7].position.x && pose.keypoints[6].position.x>pose.keypoints[8].position.x+100 ){
            textSize(52);
            //text ("V",pose.keypoints[0].position.x,pose.keypoints[0].position.y);
            text (i+"V",200,100);
            //text ("V",100,100);
            textSize(14);
            text("#5#"+int(pose.keypoints[5].position.y),pose.keypoints[5].position.x,pose.keypoints[5].position.y);
            text("#7#"+int(pose.keypoints[7].position.y),pose.keypoints[7].position.x,pose.keypoints[7].position.y);
            text("#9#"+int(pose.keypoints[9].position.y),pose.keypoints[9].position.x,pose.keypoints[9].position.y);
            text("#6#"+int(pose.keypoints[6].position.y),pose.keypoints[6].position.x,pose.keypoints[6].position.y);
            text("#8#"+int(pose.keypoints[8].position.y),pose.keypoints[8].position.x,pose.keypoints[8].position.y);
            text("#10#"+int(pose.keypoints[10].position.y),pose.keypoints[10].position.x,pose.keypoints[10].position.y);
          //}
        }
        else text (i+"ff",100,100);
      }else text (i+"gg",100,120);
}

function isV2(pose,i){
 //isLat(pose,i,-10,-70,70,10);
 if (segAng(pose,i,0)<-10 && segAng(pose,i,0)>-70 && segAng(pose,i,2)<-10 && segAng(pose,i,2)>-70){
        if (segAng(pose,i,1)>10 && (segAng(pose,i,1)<70 && segAng(pose,i,3)>10 && segAng(pose,i,3)<70)){
          //if (pose.keypoints[5].position.x+100<pose.keypoints[7].position.x && pose.keypoints[6].position.x>pose.keypoints[8].position.x+100 ){
            textSize(52);
            //text ("V",pose.keypoints[0].position.x,pose.keypoints[0].position.y);
            text (i+"V",200,100);
            //text ("V",100,100);
            /*textSize(14);
            text("#5#"+int(pose.keypoints[5].position.y),pose.keypoints[5].position.x,pose.keypoints[5].position.y);
            text("#7#"+int(pose.keypoints[7].position.y),pose.keypoints[7].position.x,pose.keypoints[7].position.y);
            text("#9#"+int(pose.keypoints[9].position.y),pose.keypoints[9].position.x,pose.keypoints[9].position.y);
            text("#6#"+int(pose.keypoints[6].position.y),pose.keypoints[6].position.x,pose.keypoints[6].position.y);
            text("#8#"+int(pose.keypoints[8].position.y),pose.keypoints[8].position.x,pose.keypoints[8].position.y);
            text("#10#"+int(pose.keypoints[10].position.y),pose.keypoints[10].position.x,pose.keypoints[10].position.y);
          */
          //
          //}
        }
        else text (i+"ff",100,100);
      }else text (i+"gg",100,120);
}
function isV3(pose,i){
  if (isLat(pose,i,-5,-70,-5,-70,70,10,70,10)){
    text (i+"V",200,100);
  }
}
function isLat(pose,i,a1,a2,a3,a4,b1,b2,b3,b4){
  textSize(32);
 text ("l1"+int(segAng(pose,i,0)),100,300);
 text ("l2"+int(segAng(pose,i,2)),200,300);
 text (int(segAng(pose,i,1)),100,340);
 text (int(segAng(pose,i,3)),200,340);
 if (segAng(pose,i,0)<a1 && segAng(pose,i,0)>a2 && segAng(pose,i,2)<a3 && segAng(pose,i,2)>a4){
        if (segAng(pose,i,1)<b1 && (segAng(pose,i,1)>b2 && segAng(pose,i,3)<b3 && segAng(pose,i,3)>b4)){
          //if (pose.keypoints[5].position.x+100<pose.keypoints[7].position.x && pose.keypoints[6].position.x>pose.keypoints[8].position.x+100 ){
            textSize(52);
            //text ("V",pose.keypoints[0].position.x,pose.keypoints[0].position.y);
            //text (i+"V",200,100);
            //text (i+"V",200,200);
            return 1;
            //text ("V",100,100);
            /*textSize(14);
            text("#5#"+int(pose.keypoints[5].position.y),pose.keypoints[5].position.x,pose.keypoints[5].position.y);
            text("#7#"+int(pose.keypoints[7].position.y),pose.keypoints[7].position.x,pose.keypoints[7].position.y);
            text("#9#"+int(pose.keypoints[9].position.y),pose.keypoints[9].position.x,pose.keypoints[9].position.y);
            text("#6#"+int(pose.keypoints[6].position.y),pose.keypoints[6].position.x,pose.keypoints[6].position.y);
            text("#8#"+int(pose.keypoints[8].position.y),pose.keypoints[8].position.x,pose.keypoints[8].position.y);
            text("#10#"+int(pose.keypoints[10].position.y),pose.keypoints[10].position.x,pose.keypoints[10].position.y);
          */
          //
          //}
        }
        else text (i+"rr",100,100);
      }else text (i+"ll",100,120);
}
function segAng(pose,i,seg){
  let dx=pose.keypoints[seg+7].position.x-pose.keypoints[seg+5].position.x;
  let dy=pose.keypoints[seg+7].position.y-pose.keypoints[seg+5].position.y;
  if (dx!=0){
    //text ((180*atan(dy/dx)/3.142),200,100);
    return(180*atan(dy/dx)/3.142);
    //text (dx,200,100);
    //text (dy,200,200);
    //text (dy/dx,200,220);
  }
}

async function loadImage(imagePath) {
  const image = new Image();
  const promise = new Promise((resolve, reject) => {
    image.crossOrigin = '';
    image.onload = () => {
      resolve(image);
    };
  });

  image.src = `${imageBucket}${imagePath}`;
  return promise;
}
function  calc_score(){
  for (let j=0; j<4; j++){
    score[0]+= sum[0][j]/100;
  }
    for (let j=0; j<4; j++){
    score[1]+= sum[1][j]/100;
  }

}

function heartshape(x, y, d, color){
    var context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000000";
    context.strokeWeight = 3;
    context.shadowOffsetX = 4.0;
    context.shadowOffsetY = 4.0;
    context.lineWidth = 1.0;
    context.fillStyle = color;
    context.moveTo(x, y + d / 4);
    context.quadraticCurveTo(x, y, x + d / 4, y);
    context.quadraticCurveTo(x + d / 2, y, x + d / 2, y + d / 4);
    context.quadraticCurveTo(x + d / 2, y, x + d * 3/4, y);
    context.quadraticCurveTo(x + d, y, x + d, y + d / 4);
    context.quadraticCurveTo(x + d, y + d / 2, x + d * 3/4, y + d * 3/4);
    context.lineTo(x + d / 2, y + d);
    context.lineTo(x + d / 4, y + d * 3/4);
    context.quadraticCurveTo(x, y + d / 2, x, y + d / 4);
    context.stroke();
    context.fill();
}

function heartshape2(w, h, k){
    var context = canvas.getContext("2d");
    // canvas.x = 150;
    // canvas.y = 150;
    // var w = 200, h = 200;
    context.strokeStyle = "#000000";
    context.strokeWeight = 3;
    context.shadowOffsetX = 4.0;
    context.shadowOffsetY = 4.0;
    context.lineWidth = 1.0;
    context.fillStyle = "#FF0000";
    var d = Math.min(w, h);
    // var k = 120;
    context.moveTo(k, k + d / 4);
    context.quadraticCurveTo(k, k, k + d / 4, k);
    context.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4);
    context.quadraticCurveTo(k + d / 2, k, k + d * 3/4, k);
    context.quadraticCurveTo(k + d, k, k + d, k + d / 4);
    context.quadraticCurveTo(k + d, k + d / 2, k + d * 3/4, k + d * 3/4);
    context.lineTo(k + d / 2, k + d);
    context.lineTo(k + d / 4, k + d * 3/4);
    context.quadraticCurveTo(k, k + d / 2, k, k + d / 4);
    context.stroke();
    context.fill();

}


