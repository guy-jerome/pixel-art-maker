const canvas = document.querySelector("#canvas");
const palette = document.querySelector("#palette")
const gridSize = 32; // 16x16 grid
const colorPicker = document.querySelector("#color-picker")
const save = document.querySelector("#save")
const load = document.querySelector("#load")
const clear = document.querySelector("#clear")
const erase = document.querySelector("#erase")
const paintBrush = document.querySelector("#paint-brush")

let defaultPalette = ["black","white","red","green","blue","purple",
"yellow","black","white","red","green","blue","purple","yellow","black",
"white","red","green","blue","purple","yellow","black","white","red","green","blue",
"black","white","red","green","blue","purple","yellow","purple","yellow" ]
let currentColor;
let mouseDown = false;
let erasing = false;

canvas.style.width = "50%"
window.addEventListener('mousedown',(e)=>{
  event.preventDefault();
  mouseDown = true;
})
window.addEventListener('mouseup',(e)=>{
  mouseDown = false;
})

function getColor(e){
  if (e.target.classList.contains("swatch")){
    erasing = false
    currentColor = e.target.style.backgroundColor
  }
}

function setColor(e){
  if(currentColor){
    erasing? e.target.style.backgroundColor = e.target.dataset.defaultColor : e.target.style.backgroundColor = currentColor;
  } 
  
}
function paintColor(e){

  if (mouseDown && currentColor) {
    
    erasing? e.target.style.backgroundColor = e.target.dataset.defaultColor : e.target.style.backgroundColor = currentColor;
  }
}

canvas.addEventListener("click", setColor)



for (let i = 1; i <= gridSize ; i++) {
  for(let k = 1; k <= gridSize;k++){
    const tile = document.createElement("div");
    tile.style.width = `${100/gridSize}%`
    tile.style.height = `${100/gridSize}%`
    i%2==0?(k%2==0?tile.style.backgroundColor = "white" : tile.style.backgroundColor = "rgb(233, 233, 233)")
    :(k%2==0?tile.style.backgroundColor = "rgb(233, 233, 233)" : tile.style.backgroundColor = "white")
    tile.dataset.defaultColor = tile.style.backgroundColor
    tile.dataset.x = k
    tile.dataset.y = i
    tile.addEventListener("mouseenter", paintColor)
    canvas.appendChild(tile);
  }
}

canvas.addEventListener("wheel", (e) => {

  const currentWidth = parseInt(canvas.style.width) 

  // Calculate the new width based on e.deltaY
  let minScroll = 20;
  let maxScroll = 100;
  let scrollSpeed = .02;
  if (currentWidth => minScroll && currentWidth <= maxScroll){
    let newWidth = currentWidth - (e.deltaY * scrollSpeed);
    if (newWidth < minScroll ){
      newWidth = minScroll
    }else if(newWidth > maxScroll){
      newWidth = maxScroll
    }
    canvas.style.width = `${newWidth}%`;
  }else{

  }
});

palette.addEventListener("click", getColor)

for (color of defaultPalette){
  const swatch = document.createElement("div")
  swatch.style.backgroundColor = color
  swatch.style.width = "100%"
  swatch.style.height = "100%"
  swatch.style.paddingBottom = "100%"
  swatch.style.border = "1px solid black"
  swatch.style.boxSizing = "border-box"
  swatch.classList.add("swatch")
  palette.appendChild(swatch)
}

colorPicker.addEventListener("input", (e)=>{
  erasing = false
  currentColor = e.target.value
})

let image = []
save.addEventListener("click",()=>{
  image = []
  for (tile of canvas.children){
    image.push(tile.style.backgroundColor)
  }
})


load.addEventListener("click",()=>{

  if (image.length>0){
    console.log("worked")
    for (let i = 0;i < canvas.children.length;i++){
      canvas.children[i].style.backgroundColor = image[i]
    }
  }
})

clear.addEventListener("click", ()=>{
  for (tile of canvas.children){
    tile.style.backgroundColor = tile.dataset.defaultColor
  }
})

erase.addEventListener("click",()=>{
  erasing = true
})

paintBrush.addEventListener("click",()=>{
  erasing = false
})