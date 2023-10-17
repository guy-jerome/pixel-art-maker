// Get references to the HTML elements
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
const imageSizes = document.querySelector("#image-sizes")
const sizes = document.querySelector("#sizes")
const paletteList = document.querySelector("#palette-list")
const palettes = document.querySelector("#palettes")
// Set the default grid size
let gridSize = 32;
let currentColor;
let mouseDown = false;
// Sets the default tool
let currentTool = "paintBrush"
// Sets the Base Canvas Size
canvasBack.style.width = "50%"
//Sets the drop downs to invisible by default
images.style.display = "none"
sizes.style.display = "none"
palettes.style.display = "none"
const gridSizes = [8,16,32,64,128];

// Define an array of random colors and a default color palette
const randomPalette = [
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
const defaultPalette= [
  "#FFFFFF", "#000000",
  // Pink Colors
  "#FFC0CB", "#FFB6C1", "#FF69B4", "#FF1493", "#DB7093", "#C71585",
  
  // Purple Colors
  "#E6E6FA", "#D8BFD8", "#DDA0DD", "#DA70D6", "#EE82EE", "#FF00FF", "#FF00FF",
  "#BA55D3", "#9932CC", "#9400D3", "#8A2BE2", "#8B008B", "#800080", "#9370DB",
  "#7B68EE", "#6A5ACD", "#483D8B", "#663399", "#4B0082",
  
  // Red Colors
  "#FFA07A", "#FA8072", "#E9967A", "#F08080", "#CD5C5C", "#DC143C", "#FF0000",
  "#B22222", "#8B0000",
  
  // Orange Colors
  "#FFA500", "#FF8C00", "#FF7F50", "#FF6347", "#FF4500",
  
  // Yellow Colors
  "#FFD700", "#FFFF00", "#FFFFE0", "#FFFACD", "#FAFAD2", "#FFEFD5", "#FFE4B5", 
  "#FFDAB9", "#EEE8AA", "#F0E68C", "#BDB76B",
  
  // Green Colors
  "#ADFF2F", "#7FFF00", "#7CFC00", "#00FF00", "#32CD32", "#98FB98", "#90EE90",
  "#00FA9A", "#00FF7F", "#3CB371", "#2E8B57", "#228B22", "#008000", "#006400",
  "#9ACD32", "#6B8E23", "#556B2F", "#66CDAA", "#8FBC8F", "#20B2AA", "#008B8B", "#008080",
  
  // Cyan Colors
  "#00FFFF", "#00FFFF", "#E0FFFF", "#AFEEEE", "#7FFFD4", "#40E0D0", "#48D1CC", "#00CED1",
  
  // Blue Colors
  "#5F9EA0", "#4682B4", "#B0C4DE", "#ADD8E6", "#B0E0E6", "#87CEFA", "#87CEEB",
  "#6495ED", "#00BFFF", "#1E90FF", "#4169E1", "#0000FF", "#0000CD", "#00008B", "#000080",
  "#191970",
  
  // Brown Colors
  "#FFF8DC", "#FFEBCD", "#FFE4C4", "#FFDEAD", "#F5DEB3", "#DEB887", "#D2B48C",
  "#BC8F8F", "#F4A460", "#DAA520", "#B8860B", "#CD853F", "#D2691E", "#808000",
  "#8B4513", "#A0522D", "#A52A2A", "#800000",
  
  // White Colors
  "#F0FFF0", "#F0FFFF",  "#F8F8FF",
  "#F5F5F5", 
  
  
  // Grey Colors
  "#DCDCDC", "#D3D3D3", "#C0C0C0", "#A9A9A9", "#696969", "#808080", "#778899", "#708090",
  "#2F4F4F", 
];
const colorfulPalette=[
  "#F8B195", "#F67280", "#C06C84", "#6C5B7B", "#355C7D", "#99B898", "#FECEAB", "#FF847C",
  "#E84A5F", "#2A363B", "#A8A7A7", "#CC527A", "#E8175D", "#474747", "#363636", "#A8E6CE",
  "#DCEDC2", "#FFD3B5", "#FFAAA6", "#FF8C94", "#A7226E", "#EC2049", "#F26B38", "#F7DB4F",
  "#2F9599", "#E1F5C4", "#EDE574", "#F9D423", "#FC913A", "#FF4E50", "#E5FCC2", "#9DE0AD",
  "#45ADA8", "#547980", "#594F4F", "#FE4365", "#FC9D9A", "#F9CDAD", "#C8C8A9", "#83AF9B"
];
const skinTonePalette= [
  "#FFEDE6",
  "#FFDED1",
  "#E0B7A6",
  "#C59681",
  "#AF7F6B",
  "#946350",
  "#664131"
];
const N64Palette = [
  "#000000", "#12173D", "#909EDD", "#293268", "#464B8C", "#6B74B2", "#C1D9F2", "#FFFFFF",
  "#A293C4", "#7B6AA5", "#53427F", "#3C2C68", "#431E66", "#5D2F8C", "#854CBF", "#B483EF",
  "#8CFF9B", "#42BC7F", "#22896E", "#14665B", "#0F4A4C", "#0A2A33", "#1D1A59", "#322D89",
  "#354AB2", "#3E83D1", "#50B9EB", "#8CDAFF", "#53A1AD", "#3B768F", "#21526B", "#163755",
  "#008782", "#00AAA5", "#27D3CB", "#78FAE6", "#CDC599", "#988F64", "#5C5D41", "#353F23",
  "#919B45", "#AFD370", "#FFE091", "#FFAA6E", "#FF695A", "#B23C40", "#FF6675", "#DD3745",
  "#A52639", "#721C2F", "#B22E69", "#E54286", "#FF6EAF", "#FFA5D5", "#FFD3AD", "#CC817A",
  "#895654", "#61393B", "#3F1F3C", "#723352", "#994C69", "#C37289", "#F29FAA", "#FFCCD0"
];
const pastelPalette = [
  "#0B171F", "#28465A", "#3D5C74", "#58788D", "#7495A8", "#94B0C0", "#B1C5D2", "#CDDDE5",
  "#F0F4F7", "#00292A", "#004538", "#006045", "#007B46", "#009644", "#50B04A", "#94C952",
  "#C7E26E", "#810000", "#A20000", "#C2340B", "#E15C0F", "#F48925", "#F7AC38", "#FACE43",
  "#FFEF57", "#651415", "#822F22", "#9B4D2F", "#B76D3B", "#D18A4F", "#E9AA6B", "#F1C585",
  "#F9DAA2", "#47094D", "#7A0475", "#A41588", "#C4398B", "#DC5D86", "#F48D8A", "#FFB6A5",
  "#240553", "#291A72", "#2F4091", "#2C6FAF", "#28ADCF", "#4DD1DD", "#92E5E8", "#1F0C2C",
  "#30093D", "#51005D", "#81007A", "#83007A", "#B00081", "#C40380", "#C81680", "#D95588",
  "#EC849B", "#55BDED", "#6298D2", "#6579B6", "#5E5A91", "#584871", "#533D5A", "#362836"
];
const allPalettes = {
  random:randomPalette,
  default:defaultPalette,
  colorful:colorfulPalette,
  skinTones:skinTonePalette,
  N64:N64Palette,
  pastel:pastelPalette
}
// Check if the user is clicking the mouse down or not
window.addEventListener('mousedown',(e)=>{
  event.preventDefault();
  mouseDown = true;
})
window.addEventListener('mouseup',(e)=>{
  mouseDown = false;
})



//Changes the color during a click event on the Canvas
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
//Changes the color during a mouseenter event if mouse is down
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
// This generates the grid based on the grid size
function generateGrid(gridSize){
  //This builds the back tiled grid for styling reasons
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
  //This builds the main grid
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
}

//This is the Zoom event for the canvasback
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


//Get Colors from the Palette 
function getColor(e){
  if (e.target.classList.contains("swatch")){
    if (currentTool === "eraser") currentTool = "paintbrush"
    currentColor = e.target.style.backgroundColor
    selectedColor.style.backgroundColor = currentColor
  }
}
//Adds the get Color Event
palette.addEventListener("click", getColor)
//This Generates the pallete
function generatePalette(defaultPalette){
  palette.innerHTML = ""
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
}

//This sets the current Color from the Color Picker
colorPicker.addEventListener("input", (e)=>{
  if (currentTool === "eraser") currentTool = "paintbrush"
  currentColor = e.target.value
  selectedColor.style.backgroundColor = currentColor
})


//This saves the image
save.addEventListener("click",()=>{
  let image = []
  for (tile of canvas.children){
    image.push(tile.style.backgroundColor)
  }
  let imageName = prompt("Choose a name for your image:")
  if (imageName){
    if (!localStorage.getItem(`img-${imageName}`)){
      addSavedImage(`img-${imageName}`)
    }
    localStorage.setItem(`img-${imageName}`,JSON.stringify(image))
  }
})

//This clears the palette
function clearPalette(){
  for (tile of canvas.children){
    tile.style.backgroundColor = tile.dataset.defaultColor
  }
}
//This attaches the clear palette to the clear button
clear.addEventListener("click", ()=>{
  clearPalette()
})
//Changes the tool to eraser
erase.addEventListener("click",()=>{
  currentTool = "eraser"
})
//Changes the tool to the painbrush
paintBrush.addEventListener("click",()=>{
  currentTool = "paintBrush"
})
//Changes the tool to the fill bucket
fill.addEventListener("click",()=>{
  currentTool = "fill"
})
//--------------------SAVE AND LOAD IMAGES-------------------------------------
//Creates an empty item in the image drop down menu
function createEmpty(){
  const emptySave = document.createElement("div")
  emptySave.classList.add("dropdown-items")
  emptySave.textContent = "Empty"
  emptySave.classList.add("empty")
  images.appendChild(emptySave)
}

//Loads an image from local storage
function getFile(name){
  image = JSON.parse(localStorage.getItem(name))
  if (image.length>0){
    for (let i = 0;i < canvas.children.length;i++){
      canvas.children[i].style.backgroundColor = image[i]
    }
  }
}
//Deletes an image from local storage
function removeFile(name,dropdown){
  images.removeChild(dropdown)
  localStorage.removeItem(name)
  clearPalette()
}
//Generates a new saved image in the saved images drop down menu
function addSavedImage(imageName){
  let dropdown = document.createElement("div")
  dropdown.classList.add("dropdown-items")
  let save = document.createElement("button") 
  save.classList.add("dropdown-item")
  save.textContent = imageName.replace("img-", "")
  save.addEventListener("click",()=>{
    getFile(imageName)
  })
  let remove = document.createElement("button")
  remove.classList.add("dropdown-remove")
  remove.textContent = "X"
  remove.addEventListener("click",()=>{
    removeFile(imageName,dropdown)
  })
  dropdown.appendChild(save)
  dropdown.appendChild(remove)
  images.appendChild(dropdown)
  emptySave.style.display = "none"
}
//Add the show/hide functionality to the drop down image
savedImages.addEventListener("click",()=>{
  images.style.display === "block"? images.style.display = "none": images.style.display = "block"
    
})
//Hides the image if the user clicks anywhere else
window.addEventListener("click",(e)=>{
  if ( e.target !== savedImages && images.style.display === "block"){
     images.style.display = "none"}
  if (e.target !== imageSizes && sizes.style.display === "block"){
     sizes.style.display = "none"}
  if (e.target !== paletteList && palettes.style.display === "block"){
    palettes.style.display = "none"}
})
//Completly clears the tiles out of the canvas and canvasback
function wipeCanvas(dem){
  canvas.innerHTML = ""
  while (canvasBack.lastChild && canvasBack.lastChild !== canvas) {
    canvasBack.removeChild(canvasBack.lastChild);
  }
  gridSize = dem
  generateGrid(dem)
}
//Loads all of the saved images from local storage
function loadSavedImages(){
  for (image in localStorage){
    if(image.startsWith("img-")){
      addSavedImage(image)
    }
  }
}
//-------------------CHANGING THE BACKGROUND SIZE--------------------------------

//Create the differant size buttons
function createSizes(dems){
  for (dem of dems){
    let dropdown = document.createElement("div")
    dropdown.classList.add("dropdown-items")
    let size = document.createElement("button")
    size.textContent = `${dem}x${dem}`
    size.classList.add("dropdown-item")
    size.dataset.size = dem
    size.addEventListener("click",()=>{      
      wipeCanvas(size.dataset.size)
    })
    dropdown.appendChild(size)
    sizes.appendChild(dropdown)
  }
}
//Toggles the hide and show feature of the image sizes drop down button
imageSizes.addEventListener("click",()=>{
  sizes.style.display ==="block"? sizes.style.display = "none": sizes.style.display = "block"
})

//---------------------CHANGING THE PALETTE--------------------------------------


function createPalettes(paletteGroup){
  for (type in paletteGroup){
    let dropdown = document.createElement("div")
    dropdown.classList.add("dropdown-items")
    let pal = document.createElement("button")
    pal.textContent = type
    pal.classList.add("dropdown-item")
    pal.dataset.palette = JSON.stringify(paletteGroup[type])
    
    pal.addEventListener("click",()=>{
      generatePalette(JSON.parse(pal.dataset.palette))
    })
    dropdown.appendChild(pal)
    palettes.appendChild(dropdown)

  }
}
paletteList.addEventListener("click", ()=>{
  palettes.style.display ==="block"? palettes.style.display = "none": palettes.style.display = "block"
})
// This is the main fill algorithm
function fillArea(e) {
  // Create a two-dimensional grid of canvas tiles
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

  // Get the color of the clicked tile
  const color = e.target.style.backgroundColor;

  // Create a queue to track tiles to be filled
  const queue = [];

  // Define possible movement directions (up, right, down, left)
  const directions = [
    { dx: 0, dy: -1 },  // North
    { dx: 1, dy: 0 },   // East
    { dx: 0, dy: 1 },   // South
    { dx: -1, dy: 0 },  // West
  ];

  // Get the starting coordinates from the clicked tile's dataset
  const xStart = parseInt(e.target.dataset.x);
  const yStart = parseInt(e.target.dataset.y);

  // Push the starting tile into the queue
  queue.push({ x: xStart, y: yStart });

  // Perform a breadth-first search to fill the area
  while (queue.length > 0) {
    const { x, y } = queue.shift();

    // Check if the current tile is within bounds and has the same color
    if (
      x >= 0 &&
      x < gridSize &&
      y >= 0 &&
      y < gridSize &&
      canvasGrid[y][x].style.backgroundColor === color
    ) {
      // Change the color of the current tile to the selected color
      canvasGrid[y][x].style.backgroundColor = currentColor;

      // Check each direction for neighboring tiles and add them to the queue
      for (let direction of directions) {
        const newX = x + direction.dx;
        const newY = y + direction.dy;
        queue.push({ x: newX, y: newY });
      }
    }
  }
}


generateGrid(gridSize)
generatePalette(defaultPalette)
createPalettes(allPalettes)
createEmpty()
//Creates the different sizes for the pallet
createSizes(gridSizes)
loadSavedImages()


