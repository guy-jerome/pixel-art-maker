const canvas = document.querySelector("#canvas");
const gridSize = 32; // 16x16 grid
for (let i = 0; i < gridSize ; i++) {
  for(let k = 0; k < gridSize;k++){
    const tile = document.createElement("div");
    tile.style.width = `${100/gridSize}%`
    tile.style.height = `${100/gridSize}%`
    i%2==0?(k%2==0?tile.style.backgroundColor = "white" : tile.style.backgroundColor = "rgb(233, 233, 233)")
    :(k%2==0?tile.style.backgroundColor = "rgb(233, 233, 233)" : tile.style.backgroundColor = "white")
    canvas.appendChild(tile);
}
  
}
