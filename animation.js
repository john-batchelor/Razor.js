var slide = document.querySelector(".slide");
var slideContent = slide.querySelector(".content");
var currentAnimation = null;
const muteButton = document.querySelector(".mute");
var playing = false;


muteButton.addEventListener("click", function(){
    var audio = document.getElementById("theme");
    audio.muted = !audio.muted;
    muteButton.classList.toggle("muted", audio.muted);

    if(playing == false && audio.muted == false)
    {
        startSound("theme");
    }
});

var textAnims = [
    {
        text: "Hard work pays off"
    },
    {
        text: "Dreams come true"
    },
    {
        text: "Bad times don't last"
    },
    {
        text: "But Bad guys do.",
        highlight: "Bad guys",
        onAnimate: () => startSound("theme")
    }
];

const timer = ms => new Promise(res => setTimeout(res, ms))

async function textAnimation(){

    for(var i = 0; i<textAnims.length; i++){
        var textAnim = textAnims[i];

        if(textAnim.highlight)
        {
            slideContent.innerHTML = textAnim.text.replace(textAnim.highlight, 
                                    `<span class='highlight'>${textAnim.highlight}</span>`);
        }
        else
        {
            slideContent.textContent = textAnim.text;
        }

        
        slideContent.classList.add("fade");
    
        if(textAnim.onAnimate)
            textAnim.onAnimate();

        await timer(3000);

        slideContent.classList.remove("fade");
        
       

        await timer(1000);
    }

    startSound("theme");
}

async function animateGalleries()
{
    slideContent.textContent = "";
    slideContent.classList.add("image");
    var gallery = [
        {
            image: "./images/Razor1.jpeg",
        },
        {
            image: "./images/razor2.png",
        },
        {
            image: "./images/razor3.jpg",
            position: "top center"
        },
        {
            image: "./images/razor4.jpeg",
        },
        {
            image: "./images/scott5.jpg"
        },
        {
            image: "./images/outsiders.jpg"
        },
        {
            image: "./images/nwo.jpg",
            position: "top right"
        },
        {
            image: "https://media.giphy.com/media/3ohc16FYnGpjwvzZF6/giphy.gif",
            delay: 1900
        },
        {
            image: "https://media.giphy.com/media/3ohc1178GvDC0gluSs/giphy.gif",
            delay: 2000
        },
        {
            image: "https://media.giphy.com/media/5UtazS7U2kF12d133z/giphy.gif",
            delay: 1500
        },
        {
            image: "https://media.giphy.com/media/xULW8N2qLMnNuntadG/giphy.gif",
            delay: 1600
        }

    ];

    for(var item of gallery){

        slideContent.classList.remove("zoom");
        slideContent.style.backgroundImage = `url(${item.image})`;

        if(item.position != undefined)
        {
            slideContent.style.backgroundPosition = item.position;
        }

        var delay = 3000;

        if(item.delay != undefined)
        {
            delay = item.delay;
        }

       

        slideContent.classList.add("fade");

        if(item.noZoom == undefined)
        {
            zoom();
        }

        await timer(delay);

        slideContent.classList.remove("fade");
        

        await timer(1000);
    }
}

async function complete()
{
    slide.classList.add("end");
    slideContent.style.backgroundImage = "none";
    slideContent.classList.remove("image");
    slideContent.textContent = "";

    if(currentAnimation)
        currentAnimation.pause();

    var endScreen = document.createElement("div");

    var image = document.createElement("img");
    image.src = "./images/finalImage.jpg";

    var textWrap = document.createElement("div");

    var span1 = document.createElement("p");
    span1.textContent = "The Bad Guy."

    var span2 = document.createElement("p");
    span2.classList.add("highlight");
    span2.textContent = "Razor Ramon";

    textWrap.appendChild(span1);
    textWrap.appendChild(span2);

    endScreen.appendChild(image);
    endScreen.appendChild(textWrap);

    slideContent.appendChild(endScreen);

    slideContent.classList.add("fade");

    await fade(image, 1500);
    await fade(span1, 1500);
    await fade(span2, 1500);

    image.classList.add("gray");
}

async function fade(element, duration)
{
    element.animate([
        {opacity: "0"},
        {opacity: "1"}
    ],
    {
        duration: duration,
        iterations: 1,
        fill: "forwards"
    })

    await timer(duration);
}

function zoom()
{
    currentAnimation = slideContent.animate([
        // keyframes
        { transform: 'scale(1)' },
        { transform: 'scale(1.05)' }
      ], {
        // timing options
        duration: 7000,
        iterations: 1,
      }
    );
}

function startSound(sound)
{
    var audio = document.getElementById(sound);

    if(audio.muted == false)
    {
        audio.play();
        playing = true;
    }
        
}

export default {
    textAnimation: textAnimation,
    animateGalleries: animateGalleries,
    complete: complete
};