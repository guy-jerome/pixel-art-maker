const canvas = document.querySelector("#canvas");
const canvasBack = document.querySelector("#canvas-back")
const palette = document.querySelector("#palette")
const save = document.querySelector("#save")
const load = document.querySelector("#load")
const clear = document.querySelector("#clear")
const erase = document.querySelector("#erase")
const paintBrush = document.querySelector("#paint-brush")
const fill = document.querySelector("#fill")
const colorPicker = document.querySelector("#color-picker")
const selectedColor = document.querySelector("#selected-color")
const savedImages = document.querySelector("#saved-images")
const images = document.querySelector("#images")

const gridSize = 32; 

let defaultPalette = [
  "#000000", // Black
  "#FFFFFF", // White
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#800080", // Purple
  "#FFFF00", // Yellow
  "#008000", // Dark Green
  "#00FFFF", // Cyan
  "#FF4500", // Orange Red
  "#8B0000", // Dark Red
  "#FF69B4", // Hot Pink
  "#FF1493", // Deep Pink
  "#00BFFF", // Deep Sky Blue
  "#1E90FF", // Dodger Blue
  "#FFD700", // Gold
  "#FF8C00", // Dark Orange
  "#4B0082", // Indigo
  "#A0522D", // Sienna
  "#2E8B57", // Sea Green
  "#800000", // Maroon
  "#FFA07A", // Light Salmon
  "#20B2AA", // Light Sea Green
  "#8A2BE2", // Blue Violet
  "#40E0D0", // Turquoise
  "#228B22", // Forest Green
  "#2F4F4F", // Dark Slate Grey
  "#A9A9A9", // Dark Grey
  "#D3D3D3", // Light Grey
  "#6A5ACD", // Slate Blue
  "#708090", // Slate Grey
  "#7B68EE", // Medium Slate Blue
  "#708090", // Slate Grey
  "#F08080", // Light Coral
  "#20B2AA", // Light Sea Green
  "#32CD32", // Lime Green
  "#87CEEB", // Sky Blue
  "#7CFC00", // Lawn Green
  "#98FB98", // Pale Green
  "#90EE90", // Light Green
  "#00FA9A", // Medium Spring Green
  "#8FBC8F", // Dark Sea Green
  "#008080", // Teal
  "#4682B4", // Steel Blue
  "#87CEFA", // Light Sky Blue
  "#40E0D0", // Turquoise
  "#48D1CC", // Medium Turquoise
  "#9370DB", // Medium Purple
  "#8A2BE2", // Blue Violet
  "#6B8E23", // Olive Drab
  "#2E8B57", // Sea Green
];


let currentColor;
let mouseDown = false;
let currentTool = "paintBrush"


canvasBack.style.width = "50%"
window.addEventListener('mousedown',(e)=>{
  event.preventDefault();
  mouseDown = true;
})
window.addEventListener('mouseup',(e)=>{
  mouseDown = false;
})

function getColor(e){
  if (e.target.classList.contains("swatch")){
    if (currentTool === "eraser") currentTool = "paintbrush"
    currentColor = e.target.style.backgroundColor
    selectedColor.style.backgroundColor = currentColor

  }
}

function setColor(e){
  if (e.target.classList.contains("tile")){
    switch(currentTool){
      case "paintBrush":
        e.target.style.backgroundColor = currentColor;
        break;
      case "eraser":
        e.target.style.backgroundColor = e.target.dataset.defaultColor;
        break;
      case "fill":
        if (e.target.style.backgroundColor !== currentColor) fillArea(e)
        break;
    }
  }
}

function paintColor(e){
  if (e.target.classList.contains("tile")){
    if (mouseDown) {  
      switch(currentTool){
        case "paintBrush":
          e.target.style.backgroundColor = currentColor;
          break;
        case "eraser":
          e.target.style.backgroundColor = e.target.dataset.defaultColor;
          break;
        case "fill":
          if (e.target.style.backgroundColor !== currentColor) fillArea(e)
          break;
      }
    }
  }
}


canvas.addEventListener("click", setColor)


for (let i = 0; i < gridSize ; i++) {
  for(let k = 0; k < gridSize;k++){
    const tile = document.createElement("div");
    tile.style.width = `${100/gridSize}%`
    tile.style.height = `${100/gridSize}%`
    i%2==0?(k%2==0?tile.style.backgroundColor = "rgb(226, 226, 226)" : tile.style.backgroundColor = "white")
    :(k%2==0?tile.style.backgroundColor = "white" : tile.style.backgroundColor = "rgb(226, 226, 226)")
    tile.style.zIndex = "-2"
    canvasBack.appendChild(tile);
  }
}

for (let i = 0; i < gridSize ; i++) {
  for(let k = 0; k < gridSize;k++){
    const tile = document.createElement("div");
    tile.style.width = `${100/gridSize}%`
    tile.style.height = `${100/gridSize}%`
    tile.style.backgroundColor = "transparent";
    tile.dataset.defaultColor = tile.style.backgroundColor
    tile.dataset.x = k
    tile.dataset.y = i
    tile.addEventListener("mouseenter", paintColor)
    tile.classList.add("tile")
    canvas.appendChild(tile);
  }
}

canvasBack.addEventListener("wheel", (e) => {
  const currentWidth = parseInt(canvasBack.style.width) 
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
    canvasBack.style.width = `${newWidth}%`;
  }
});

palette.addEventListener("click", getColor)

for (color of defaultPalette){
  const swatch = document.createElement("div")
  swatch.style.backgroundColor = color
  swatch.style.width = "100%"
  swatch.style.aspectRatio  = "1/1"
  swatch.style.border = ".1em solid black"
  swatch.style.boxSizing = "border-box"
  swatch.classList.add("swatch")
  palette.appendChild(swatch)
}

colorPicker.addEventListener("input", (e)=>{
  if (currentTool === "eraser") currentTool = "paintbrush"
  currentColor = e.target.value
  selectedColor.style.backgroundColor = currentColor
})



save.addEventListener("click",()=>{
  let image = []
  for (tile of canvas.children){
    image.push(tile.style.backgroundColor)
  }
  let imageName = prompt("Choose a name for your image:")
  if (imageName){
    addSavedImage(imageName)
    localStorage.setItem(imageName,JSON.stringify(image))
  }

})


load.addEventListener("click",()=>{
  image = JSON.parse(localStorage.getItem("image"))
  if (image.length>0){
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
  currentTool = "eraser"
})

paintBrush.addEventListener("click",()=>{
  currentTool = "paintBrush"
})

fill.addEventListener("click",()=>{
  currentTool = "fill"
})

images.style.display = "none"
const emptySave = document.createElement("div")
emptySave.classList.add("dropdown-items")
emptySave.textContent = "Empty"
images.appendChild(emptySave)

function getFile(name){
  image = JSON.parse(localStorage.getItem(name))
  if (image.length>0){
    for (let i = 0;i < canvas.children.length;i++){
      canvas.children[i].style.backgroundColor = image[i]
    }
  }
}

function addSavedImage(imageName){
  let save = document.createElement("button")
  save.classList.add("dropdown-items")
  save.textContent = imageName
  save.addEventListener("click",()=>{
    getFile(imageName)
  })
  images.appendChild(save)
  emptySave.style.display = "none"
}

savedImages.addEventListener("click",()=>{
  images.style.display === "block"? images.style.display = "none": images.style.display = "block"
    
})
window.addEventListener("click",(e)=>{
  if ( e.target !== savedImages && images.style.display === "block"){
     images.style.display = "none"}
})

function loadSavedImages(){
  for (image in localStorage){
    addSavedImage(image)
  }
}
loadSavedImages()

function fillArea(e) {
  const canvasGrid = [];
  let j = 0;

  for (let i = 0; i < gridSize; i++) {
    let row = [];
    for (let k = 0; k < gridSize; k++) {
      row.push(canvas.children[j]);
      j++;
    }
    canvasGrid.push(row);
  }

  const color = e.target.style.backgroundColor;
  const queue = [];

  const directions = [
    { dx: 0, dy: -1 },  // North
    { dx: 1, dy: 0 },   // East
    { dx: 0, dy: 1 },   // South
    { dx: -1, dy: 0 },  // West
  ];

  const xStart = parseInt(e.target.dataset.x);
  const yStart = parseInt(e.target.dataset.y);

  queue.push({ x: xStart, y: yStart });

  while (queue.length > 0) {
    const { x, y } = queue.shift();

    if (
      x >= 0 &&
      x < gridSize &&
      y >= 0 &&
      y < gridSize &&
      canvasGrid[y][x].style.backgroundColor === color
    ) {
      canvasGrid[y][x].style.backgroundColor = currentColor;
      for (let direction of directions) {
        const newX = x + direction.dx;
        const newY = y + direction.dy;
        queue.push({ x: newX, y: newY });
      }
    }
  }
}


