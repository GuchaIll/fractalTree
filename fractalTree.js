// To draw a circle:
// ctx.arc(centerX,centerY,radius,angleStart,angleEnd,false);

function drawSubTree( ctx, depth, nLevels )
{
  if( depth == 0 ) return;
  
  // tree parameters
  let w = 15.; // initial branch width
  let h = 70.; // initial branch height
  let s = .75; // scaling down of each branch
  let theta = 0.35 + Math.random()*.25; // rotation angle of each branch
  
  // calculations for translation (x,y) of next branch
  let R = s*Math.sqrt(w*w+h*h)/2;
  let phi = Math.PI/2 - theta;
  let alpha = Math.atan(w/h);
  let u0 = w*s*Math.cos(theta);
  let u1 = R * Math.sin(theta+alpha);
  let v0 = w*s*Math.sin(theta);
  let v1 = R * Math.sin(phi+alpha);
  
  // translation (x,y) of next branch so that
  // the next rectangle nicely meets the previous one
  let x = w/2-u0+u1;
  let y = h/2-v0+v1;
  
  // set the branch color
  r0 = 360/depth; g0 = 0; b0 = 160/depth; // dark brown
  ctx.fillStyle = `rgba(${r0}, ${g0}, ${b0}, 1)`;
  
  // draw a rectangle for the current branch
  ctx.beginPath();
  ctx.rect(-w/2,-h/2,w,h);
  //ctx.rect(x, y, w, h)
  ctx.fill();
  
  // YOUR TRANSFORMATIONS HERE!
   ctx.translate(-x,-y); 
  ctx.rotate(-theta);
   ctx.scale(s,s);
  
  // draw left branch
  drawSubTree( ctx, depth-1, nLevels ); 
  // YOUR TRANSFORMATIONS HERE!
  ctx.scale(1/s,1/s);
  ctx.rotate(theta);
  ctx.translate(x,y);
  
  ctx.translate(x,-y);
  ctx.rotate(theta);
  ctx.scale(s,s);

  // draw right branch
  drawSubTree( ctx, depth-1, nLevels );
  // YOUR TRANSFORMATIONS HERE!
   ctx.scale(1/s,1/s);
   ctx.rotate(-theta);
   ctx.translate(-x,y);
}

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

// draw any other cool scene stuff here :-)
canvas.style.background = "rgb(95, 158, 160)"
context.translate(200,250);
drawSubTree( context, 12, 12 );