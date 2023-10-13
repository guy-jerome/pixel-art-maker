const canvas = document.querySelector("#canvas");
const palette = document.querySelector("#palette")
const gridSize = 32; // 16x16 grid
let defaultPalette = ["black","white","red","green","blue","purple","yellow", ]
let currentColor;
let mouseDown = false;
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
    currentColor = e.target.style.backgroundColor
  }
}

function setColor(e){
  if(currentColor) e.target.style.backgroundColor = currentColor
  
}
function paintColor(e){

  if (mouseDown && currentColor) {
    event.target.style.backgroundColor = currentColor;
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
    const newWidth = currentWidth - (e.deltaY * scrollSpeed);
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
  swatch.style.boxSizing = "border-box"
  swatch.classList.add("swatch")
  palette.appendChild(swatch)
}

