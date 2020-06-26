var canvas = document.getElementById('canvas');
var ball = document.getElementById('ball');

canvas.width=500;
canvas.height=400;

var ctx = canvas.getContext('2d');

function Circle() {

    this.radius=10;
    this.x=Math.random()*(canvas.width-4*this.radius)+this.radius*2;
    this.y=20;
    var dy=4;

    this.setXLocation=function(x) {
        this.x=x;
    }
    this.draw=function() {
        ctx.drawImage(ball, this.x,this.y,this.radius*2,this.radius*2);

    }

    this.update = function() {
        this.y+=dy;
    }
}

function generateCircle() {
    this.circle=new Circle();

    this.update=function() {
        this.circle.draw();
        this.circle.update();
        if(this.circle.y+this.circle.radius>canvas.height) {
            this.circle=new Circle();
            
        }
    }

    this.newUpdate=function() {
        this.circle=new Circle();
        isScored=false;
    }

}

function bowl(ctx) {
    this.ctx=ctx;
    this.x=canvas.width/2;
    this.radius=20;
    this.y=canvas.height-this.radius;
    this.dx=10;

    this.draw=function() {
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.radius,0,Math.PI,false);
        this.ctx.stroke();
    }

    this.goLeft=function() {
        this.x -= this.dx;
        if(this.x-this.radius<0) {
            this.x=this.radius;
        }   
    }

    this.goRight=function() {
        this.x += this.dx;
        if(this.x+this.radius>canvas.width) {
            this.x=canvas.width-this.radius;
        }
    }

    this.stop=function() {
        this.x+=0;
    }
}

function inputHandler(bowl) {
    addEventListener("keydown", function(event){
        switch(event.keyCode) {
            case 37:
                bowl.goLeft();
                break;

            case 39:
                bowl.goRight();
                break;
        }
    })
}

var score=0;
var isScored=false;

function countScore(bowl, gen) {
    this.x=bowl.x;
    this.y=gen.y;
    if((gen.circle.x>=bowl.x-bowl.radius&&gen.circle.x<=bowl.x)&&gen.circle.y>bowl.y) {
        score++;
        isScored=true;
        gen.newUpdate();
    }

}

var bowl = new bowl(ctx);

var gen = new generateCircle();
var lastTime=0;

new inputHandler(bowl);


var countscore=new countScore(bowl,gen);

function animate(timestamp) {
    ctx.fillStyle='white';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    gen.update();
    bowl.draw();
    countscore=new countScore(bowl,gen);
    console.log(score);
    
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);