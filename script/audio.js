let audio_elements;
let playback_elements;
let audio_context_array = [];
let audio_size;

function init_a() {
    audio_elements = document.getElementsByClassName("audio");
    playback_elements = document.getElementsByTagName("audio");
    audio_size = window.innerHeight * 0.3;
    let dpr = window.devicePixelRatio || 1;


    for(let i = 0; i < audio_elements.length; i++) {
        audio_elements[i].width = audio_size * dpr;
        audio_elements[i].height = audio_size * dpr;
        let context = audio_elements[i].getContext("2d");
        context.scale(dpr, dpr);
        audio_context_array.push(context);

        render_audio(context, playback_elements[i]);

        audio_elements[i].addEventListener("mousedown", () => {
            if(playback_elements[i].paused) {
                playback_elements[i].play();
            } else {
                playback_elements[i].pause();
            }
            render_audio(context, playback_elements[i]);
        });

    }
}

function render_audio (ctx, playback_element) {
    console.log("hi");
    ctx.clearRect(0,0,audio_size,audio_size);
    ctx.beginPath();
    if(playback_element.paused) {
        ctx.moveTo(audio_size*0.35, audio_size*0.3);
        ctx.lineTo(audio_size*0.75, audio_size*0.5);
        ctx.lineTo(audio_size*0.35, audio_size*0.7);
        ctx.lineTo(audio_size*0.35, audio_size*0.3);
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fill();
    } else {
        ctx.fillRect(audio_size*0.35, audio_size*0.3, audio_size*0.10, audio_size*0.4);
        ctx.fillRect(audio_size*0.55, audio_size*0.3, audio_size*0.10, audio_size*0.4);
    }
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(audio_size*0.5,audio_size*0.5,audio_size*0.5-10,0,2*Math.PI);
    ctx.lineWidth = 20;
    ctx.strokeStyle = "rgba(0,0,0,0.3)";
    ctx.stroke();
    ctx.closePath();

    let radians = 2*Math.PI * (playback_element.currentTime / playback_element.duration) - 0.5 * Math.PI;

    ctx.beginPath();
    ctx.arc(audio_size*0.5,audio_size*0.5,audio_size*0.5-10,-0.5*Math.PI,radians);
    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#4b2833";
    ctx.stroke();
    ctx.closePath();

    if(playback_element.paused == false) {
        setTimeout(() => {render_audio(ctx, playback_element)}, 1000);
    }

}
