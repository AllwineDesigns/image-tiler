import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

function App() {
  const handleClick = (embedSingleImage) => (e) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const tileCanvas = document.createElement("canvas");
    const tileCtx = tileCanvas.getContext("2d");

    const imagePairs = [];
    const numPairs = 9;
    const pairsPerRow = 3;

    const svgImageWidth = 200;
    const svgImageHeight = 200;
    const svgTileImageWidth = svgImageWidth/2;
    const svgTileImageHeight = svgImageHeight/2;
    const spacing = 25;

    const pairSpacing = 25;
    const pairWidth = (2*svgImageWidth+spacing);
    const pairHeight = svgImageHeight;
    for(let i = 0; i < numPairs; i++) {
      const powerOf2 = Math.pow(2, i+1);
      const width = powerOf2;
      const height = powerOf2;
      const tileWidth = powerOf2/2;
      const tileHeight = powerOf2/2;

      canvas.width = width;
      canvas.height = height;

      tileCanvas.width = tileWidth;
      tileCanvas.height = tileHeight;

      // draw checker pattern into whole image
      for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
          const xOdd = x&1;
          const yOdd = y&1;
         
          ctx.fillStyle =  !(( yOdd && !xOdd ) || ( !yOdd && xOdd ))  ? "black" : "white";
          ctx.fillRect(x, y, 1, 1);
        }
      }

      const wholeImage = <g transform="translate(0,0)"><image x={0} y={0} width={svgImageWidth} height={svgImageHeight} xlinkHref={canvas.toDataURL()}/></g>; 
      const images = [];
      for(let r = 0; r < 2; r++) {
        for(let c = 0; c < 2; c++) {
          tileCtx.clearRect(0,0, tileWidth, tileHeight);
          tileCtx.drawImage(canvas, c*tileWidth, r*tileHeight, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);
          images.push(<image key={`${r},${c}`} x={c*svgTileImageWidth} y={r*svgTileImageHeight} width={svgTileImageWidth} height={svgTileImageHeight} xlinkHref={tileCanvas.toDataURL()}/>);
        }
      }

      const pairX = i%pairsPerRow;
      const pairY = Math.floor(i/pairsPerRow);
      imagePairs.push(<g transform={"translate(" + pairX*(pairWidth+pairSpacing) + "," + pairY*(pairHeight+pairSpacing) + ")"}>{wholeImage}<g transform={"translate(" + (svgImageWidth+spacing) + ",0)"}>{images}</g></g>);
    }

    const d = document.createElement("div");
    const widthInches = (pairsPerRow*pairWidth+(pairsPerRow-1)*pairSpacing)/100;
    const heightInches = (Math.ceil(numPairs/pairsPerRow)*pairHeight+(Math.ceil(numPairs/pairsPerRow)-1)*pairSpacing)/100;
    ReactDOM.render(<svg width={widthInches + "in"} height={heightInches+"in"} viewBox={"0 0 " + (widthInches*100) + " " + (heightInches*100)} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      {imagePairs}
    </svg>, d);

    if(embedSingleImage) {
      const svgURL = "data:image/svg+xml;base64," + btoa(d.innerHTML);

      const d2 = document.createElement("div");
      ReactDOM.render(<svg width={widthInches + "in"} height={heightInches+"in"} viewBox={"0 0 " + (widthInches*100) + " " + (heightInches*100)} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <image x={0} y={0} width={widthInches*100} height={heightInches*100} xlinkHref={svgURL}/>
      </svg>, d2);
      const a = document.createElement('a');
      const data = new Blob([ d2.innerHTML ], { type: 'image/svg+xml' });
      const url = window.URL.createObjectURL(data);
      a.download = "checkers.svg";
      a.href = url;
      a.click();
    } else {
      const a = document.createElement('a');
      const data = new Blob([ d.innerHTML ], { type: 'image/svg+xml' });
      const url = window.URL.createObjectURL(data);
      a.download = "checkers.svg";
      a.href = url;
      a.click();
    }
  };
  return (<><Button onClick={handleClick(true)}>Download Single</Button><Button onClick={handleClick(false)}>Download Multiple</Button></>);
}

export default App;
