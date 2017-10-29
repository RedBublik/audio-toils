import { Component, OnInit } from '@angular/core';

class Ball{
    x;
    y;
    angle;
    vx;
    vy;
    r;
    color;

    constructor(origin: any, colorPallete: any){
        this.x = origin.x;
        this.y = origin.y;
        this.angle = Math.PI * 2 * Math.random();
        this.vx = (1.3 + Math.random() * .3) * Math.cos(this.angle);
        this.vy = (1.3 + Math.random() * .3) * Math.sin(this.angle);
        this.r = 4 + 3 * Math.random();
        this.color = colorPallete[Math.floor(Math.random() * colorPallete.length)];
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
        this.r -= .01;
    }
}

@Component({
  selector: 'app-canvas',
  template: `
    <style>
    #canvas{
        position: absolute;
        left: 0;
        top: 0;
        -webkit-filter: url("#goo");
        filter: url("#goo");
    }
    </style>
    <canvas id="canvas"></canvas>
    `
})
export class CanvasComponent implements OnInit{
    stats: any;
    origin: any;
    canvas: any;
    context: any;
    mouse: any;
    width: any;
    height: any;
    randomCount: any;
    balls: any;
    count: any;
    colorPallete: any;

    constructor() {
    }

    ngOnInit() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.colorPallete = ["#0cf", "#09f", "#90a0dd"];
        
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.origin = {x: this.width / 2, y: this.height / 2};
        this.mouse = {x: this.width / 2, y: this.height / 2};
        this.balls = [];
        this.count = 0;
        this.randomCount = 1;
        
        window.onresize = () =>{
            this.width = this.canvas.width = window.innerWidth;
            this.height = this.canvas.height = window.innerHeight;
            this.origin = {x: this.width / 2, y: this.height / 2};
        }

        this.loop();
       
    }

    public loop() {
        this.context.clearRect(0, 0, this.width, this.height);
        if(this.count === this.randomCount){
            this.balls.push(new Ball(this.origin, this.colorPallete));
            this.count = 0;
            this.randomCount = 3 + Math.floor(Math.random() * 5);
        }
        this.count++;
        for(var i = 0; i < this.balls.length; i++){
            var b = this.balls[i];
            this.context.fillStyle = b.color;
            this.context.beginPath();
            this.context.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
            this.context.fill();
            b.update();
        }

        this.origin.x += (this.mouse.x - this.origin.x) * .15;
        this.origin.y += (this.mouse.y - this.origin.y) * .15;

        this.context.fillStyle = "#66f166";
        this.context.beginPath();
        this.context.arc(this.origin.x, this.origin.y, 5, 0, Math.PI * 2, false);
        this.context.fill();

        this.removeBall();
        requestAnimationFrame(this.loop.bind(this));
    }

    removeBall(){
        for(var i = 0; i < this.balls.length; i++){
            var b = this.balls[i];
            if(b.x + b.r < 0 ||
                b.x - b.r > this.width ||
                b.y + b.r < 0 ||
                b.y - b.r > this.height ||
                b.r < 0){
                this.balls.splice(i, 1);
            }
        }
    }
    
};