const gridHolder = document.querySelector(".grid-holder");
const range = document.querySelector("#range");
const gridsizelabel=document.querySelector("#gridsize")

const eraser=document.querySelector("#eraser");
const warm=document.querySelector("#warm");
const cool=document.querySelector("#cool");
const darken=document.querySelector("#darken");
const clear=document.querySelector("#clear");
const pen=document.querySelector("#pen");

const warmcolors = ['#BF6A6D', '#A45256', '#EC6760', '#F88C5D', '#FDCF6D'];

const coolcolors = ['#5590BC', '#0DABB8', '#01F0F6', '#1FFDE1', '#57FFC8'];

let eraseron=0;
let penon=1;
let pentype='normal';
const canbeactive=[eraser,warm,cool,darken,pen];
eraser.addEventListener('click',()=>{
    eraseron=1;
    penon=0;
    makeactive(eraser);
})
pen.addEventListener('click',()=>{
    eraseron=0;
    penon=1;
    pentype='normal'
    makeactive(pen);
})
warm.addEventListener('click',()=>{
    eraseron=0;
    penon=1;
    pentype='warm';
    makeactive(warm);
})
cool.addEventListener('click',()=>{
    eraseron=0;
    penon=1;
    pentype='cool';
    makeactive(cool);
})
darken.addEventListener('click',()=>{
    eraseron=0;
    penon=1;
    pentype='darken';
    makeactive(darken);
})

function makeactive(ele){
    canbeactive.forEach(e=>{if(e==ele){
        e.classList.add("active");
    }
    else{
        e.classList.remove("active");
    }
    });
}
clear.addEventListener('click',()=>{cleargrid()});

function createGrid(size) {

    gridHolder.innerHTML = ""; // clear old grid
    gridsizelabel.textContent=`Grid Size ${size}*${size}`;
    const pixelSize = 600 / size;

    for (let i = 0; i < size * size; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");

        pixel.style.width = `${pixelSize}px`;
        pixel.style.height = `${pixelSize}px`;
        pixel.style.backgroundColor = "rgb(221, 221, 221)";

        // draw on hover
        pixel.addEventListener("mouseover", () => {
            generateColor(pixel)
        });

        gridHolder.appendChild(pixel);
    }
}

createGrid(range.value);

range.addEventListener("input", () => {
    createGrid(range.value);
});


function generateColor(pixel){
    if(penon==1){
        if(pentype=='normal'){pixel.style.backgroundColor="black";}
        else if(pentype=='darken'){
            let currentColor = window.getComputedStyle(pixel).backgroundColor;
    
    // Extract numbers from "rgb(r, g, b)"
    let rgb = currentColor.match(/\d+/g).map(Number);

    // Subtract 25 from each channel to make it darker
    // This will now work on the default rgb(221, 221, 221)
    rgb = rgb.map(val => Math.max(val - 25, 0));

    pixel.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        }
        else if(pentype=='warm'){
            let randomIndex = Math.floor(Math.random() * warmcolors.length);
            pixel.style.backgroundColor = warmcolors[randomIndex];
        }
        else if(pentype=='cool'){
            let randomIndex = Math.floor(Math.random() * coolcolors.length);
            pixel.style.backgroundColor = coolcolors[randomIndex];
        }
    }
    if(eraseron==1){pixel.style.backgroundColor="rgb(221,221,221)";
    }
}
function cleargrid(){
   document.querySelectorAll(".pixel").forEach(pix=>pix.style.backgroundColor="rgb(221,221,221)");
}

