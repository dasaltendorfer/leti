
const elements = ["Steckbrief", "Über Mich", "Services", "Kontakt"];

const BAR_SIZE = 30;

const SPACING = 40;


const WIDTH = 20;


let workingHeight;

let ctx, transition_ctx;

transitions_list = [];

function init () {
   /* if(window.location.hash == "") window.location.hash = "#home";
    refresh();*/
/*    let right_menu = document.getElementById("leftMenu");
    right_menu.innerHTML = "";
    let height = window.innerHeight;
    let pos;
    for(pos = BAR_SIZE; pos < height-BAR_SIZE*6; pos += BAR_SIZE) {
        let s.random() * 30 + 5) | 0;
        right_menu.innerHTML += "<div class='shell'><div class='bar' style='width: " + size + "%'></div></div>";
    }

    let center = (document.getElementsByClassName("bar").length * 0.5 - 6) | 0;

    for(let i = 0; i < 4; i++) {
        let index = i*3 + center;
        console.log(index);
        document.getElementsByClassName("bar")[index].innerHTML = elements[i];
        document.getElementsByClassName("bar")[index].className = "bar menuElements";
    }

    document.getElementsByClassName("bar")[center].className = "bar menuElements selected";

    document.getElementsByClassName("bar")[document.getElementsByClassName("bar").length-1].innerHTML = "©2022 Letícia Böttcher Teixeira";
    document.getElementsByClassName("bar")[document.getElementsByClassName("bar").length-1].style.height = "30px";

*/
   // ctx = setupCanvas(document.getElementById("renderCanvas"), window.innerHeight);
    //transition_ctx = setupCanvas(document.getElementById("transition"), window.innerHeight*0.1);
    //render();
    
    workingHeight = window.innerHeight*0.06;
    for(let i = 0; i < document.getElementsByClassName("transition").length; i++) transitions_list.push(setupCanvas(document.getElementsByClassName("transition")[i]));
    render();
}

/*
function refresh () {
    let moveX = 0;
    switch(window.location.hash) {
        case "#contact":
            moveX++;
        case "#service":
            moveX++;
        case "#about":
            moveX++;
        break;
    }
    document.getElementById("slider").style.left = moveX * (-100) + "vw";
}*/


function setupCanvas(canvas) {
    let height = canvas.clientHeight;
    let width = canvas.clientWidth;

	var dpr = window.devicePixelRatio || 1;
	canvas.width = width * dpr;
	canvas.height = height * dpr;
	var ctx = canvas.getContext("2d");
	ctx.scale(dpr, dpr);/*
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = _height + "px";*/
	return {"ctx":ctx, "height": height, "width": width, "ctop":canvas.dataset.ctop, "cbottom":canvas.dataset.cbottom};
}


class Audio {
	constructor(_pos) {
		this.x = _pos;
		this.length = (Math.random() * window.innerHeight*0.2 + window.innerHeight*0.2) / 2;
		this.topYB = window.innerHeight - this.length;
		this.bottomYB = window.innerHeight + this.length;
		this.topYT = - this.length;
		this.bottomYT = this.length;
	}
	draw() {
		ctx.beginPath();
        ctx.lineWidth = WIDTH;
        ctx.lineCap = "round";
		ctx.moveTo(this.x, this.topYT);
		ctx.lineTo(this.x, this.bottomYT);
		ctx.moveTo(this.x, this.topYB);
		ctx.lineTo(this.x, this.bottomYB);
		ctx.strokeStyle = "rgb(29,29,29)";
		ctx.stroke();
		ctx.closePath();
	}
}


function createLine (ctx, x, color, orientation, height) {
    let height_gen_top = Math.random()*0.8*workingHeight;
    ctx.beginPath();
    ctx.lineCap = "round";
    //console.log(0.5*height-0.5*height*orientation+orientation*height_gen_top);
    ctx.moveTo(x,0.5*height-0.5*height*orientation);
    ctx.lineTo(x,0.5*height-0.5*height*orientation+orientation*height_gen_top);
    ctx.lineWidth = WIDTH;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
}

const topOffset = 50;

function createTopLine (ctx, x, color, orientation, height) {
    let height_gen_top = 20 + Math.random()*window.innerHeight*0.1;
    ctx.beginPath();
    ctx.lineCap = "round";
    //console.log(0.5*height-0.5*height*orientation+orientation*height_gen_top);
    let y1 = window.innerHeight*0.05 - height_gen_top;
    let y2 = window.innerHeight*0.05 + height_gen_top;
    ctx.moveTo(x,y1);
    ctx.lineTo(x,y2);
    ctx.lineWidth = WIDTH;
    ctx.strokeStyle = "rgba(0,0,0,0.0)";
    ctx.stroke();
    ctx.closePath();
}

function render() {
    /*
    transition_ctx.beginPath();
    transition_ctx.fillStyle = "red";
    transition_ctx.fillRect(40,0,40,workingHeight);
    transition_ctx.closePath();*/
/*
    let Xpos = 0;
    while(Xpos < window.innerWidth) {
        createLine(Xpos, "#E91E63");
        Xpos += WIDTH*2;
    }*/

    for(let i = 0; i < transitions_list.length; i++) {
        
        let Xpos = 0;
        if(transitions_list[i].ctop == "top") {
            /*while(Xpos < window.innerWidth) {
                //createLine(transitions_list[i].ctx, Xpos, transitions_list[i].cbottom, -1, transitions_list[i].height);
                createTopLine(transitions_list[i].ctx, Xpos, transitions_list[i].ctop, 1, transitions_list[i].height);
                Xpos += WIDTH*2;
            }*/
        } else {
            while(Xpos < window.innerWidth) {
                //createLine(transitions_list[i].ctx, Xpos, transitions_list[i].cbottom, -1, transitions_list[i].height);
                createLine(transitions_list[i].ctx, Xpos, transitions_list[i].ctop, 1, transitions_list[i].height);
                Xpos += WIDTH*2;
            }
        }
        Xpos = -WIDTH;
        while(Xpos < window.innerWidth) {
            createLine(transitions_list[i].ctx, Xpos, transitions_list[i].cbottom, -1, transitions_list[i].height);
            //createLine(transitions_list[i].ctx, Xpos, transitions_list[i].ctop, 1, transitions_list[i].height);
            Xpos += WIDTH*2;
        }
    }



 /*   let audios = [];

    for (
        let position = 20;
        position < window.innerWidth;
        position += WIDTH * 2
    )
        audios.push(new Audio(position));
	for (let aud of audios) aud.draw();*/
}
