import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 300
  },
  button: {
    margin: theme.spacing(1)
  },
  checkboxLabel: {
    lineHeight: "40px",
    verticalAlign: "middle"
  }
}));

const renderToString = (reactTree) => {
  const d = document.createElement("div");
  ReactDOM.render(reactTree, d);
  return d.innerHTML;
};

const downloadString = (str, { type, filename }) => {
  const a = document.createElement('a');
  const data = new Blob([ str ], { type });
  const url = window.URL.createObjectURL(data);
  a.download = filename;
  a.href = url;
  a.click();
};

function App() {
  const classes = useStyles();
  const widthRef = useRef(null);
  const heightRef = useRef(null);
  const dpiRef = useRef(null);
  const rowsRef = useRef(null);
  const colsRef = useRef(null);
  const fileRef = useRef(null);
  const [ wrapTiles, setWrapTiles ] = useState(true);

  const handleChange = (e) => {
    const rows = parseInt(rowsRef.current.value) || 2;
    const cols = parseInt(colsRef.current.value) || 2;
    const dpi = parseInt(dpiRef.current.value) || 225;
    let width = widthRef.current.value === "auto" ? undefined : parseInt(widthRef.current.value);
    let height = heightRef.current.value === "auto" ? undefined : parseInt(heightRef.current.value);


    const filename = e.target.files[0].name;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.onload = () => {
        console.log(img.width, img.height);
        const canvas = document.createElement("canvas");

        if(!width && height) {
          width = img.width/img.height*height;
        }

        if(width && !height) {
          height = img.height/img.width*width;
        }

        if(width) {
          canvas.width = width/cols;
        } else {
          canvas.width = img.width/cols;
        }

        if(height) {
          canvas.height = height/rows;
        } else {
          canvas.height = img.height/rows;
        }

        const context = canvas.getContext('2d');
        const tileWidth = img.width/cols;
        const tileHeight = img.height/rows;

        const images = [];
        for(let r = 0; r < rows; r++) {
          for(let c = 0; c < cols; c++) {
            context.clearRect(0,0,canvas.width, canvas.height);
            context.drawImage(img, c*tileWidth, r*tileHeight, tileWidth, tileHeight, 0, 0, canvas.width, canvas.height);

            if(wrapTiles) {
              const tileSVGStr = renderToString(
                <svg width={canvas.width} height={canvas.height} viewBox={"0 0 " + canvas.width + " " + canvas.height} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <image imageRendering="pixelated" x={0} y={0} width={canvas.width} height={canvas.height} xlinkHref={canvas.toDataURL()}/>
                </svg>);

  //            const svgURL = "data:image/svg+xml," + encodeURIComponent(tileSVGStr);
              const svgURL = "data:image/svg+xml;base64," + btoa(tileSVGStr);
              images.push(<image key={`${r},${c}`} imageRendering="pixelated" x={c*canvas.width} y={r*canvas.height} width={canvas.width} height={canvas.height} xlinkHref={svgURL}/>);
            } else {
              images.push(<image key={`${r},${c}`} imageRendering="pixelated" x={c*canvas.width} y={r*canvas.height} width={canvas.width} height={canvas.height} xlinkHref={canvas.toDataURL()}/>);
            }
          }
        }

        const svgStr = renderToString(<svg width={width ? width/dpi + "in" : img.width/dpi + "in"} height={height ? height/dpi + "in" : img.height/dpi + "in" } viewBox={"0 0 " + (width ? width : img.width) + " " + (height ? height : img.height)} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          {images}
        </svg>);

        downloadString(svgStr, { type: 'image/svg+xml', filename: filename + ".svg" });

//        const svgURL = "data:image/svg+xml;base64," + btoa(svgStr);
//        const svgStr2 = renderToString(<svg width={width ? width/dpi + "in" : img.width/dpi + "in"} height={height ? height/dpi + "in" : img.height/dpi + "in" } viewBox={"0 0 " + (width ? width : img.width) + " " + (height ? height : img.height)} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
//          <image x={0} y={0} width={(width ? width : img.width)} height={(height ? height : img.height)} xlinkHref={svgURL}/>
//        </svg>);
//        downloadString(svgStr2, { type: 'image/svg+xml', filename: filename + ".svg" });

        fileRef.current.value = "";
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <Grid container classes={{ root: classes.container }}>
      <Grid item xs={6}>DPI:</Grid><Grid item xs={6}><TextField inputRef={dpiRef} defaultValue="225" fullWidth={true}/></Grid>
      <Grid item xs={6}>Width:</Grid><Grid item xs={6}><TextField inputRef={widthRef} defaultValue="auto" fullWidth={true}/></Grid>
      <Grid item xs={6}>Height:</Grid><Grid item xs={6}><TextField inputRef={heightRef} defaultValue="auto" fullWidth={true}/></Grid>
      <Grid item xs={6}>Rows:</Grid><Grid item xs={6}><TextField inputRef={rowsRef} defaultValue="2" fullWidth={true}/></Grid>
      <Grid item xs={6}>Cols:</Grid><Grid item xs={6}><TextField inputRef={colsRef} defaultValue="2" fullWidth={true}/></Grid>
      <Grid item xs={6} classes={ { root: classes.checkboxLabel }}>Wrap Tiles In SVG:</Grid><Grid item xs={6}><Checkbox checked={wrapTiles} onChange={(e) => setWrapTiles(e.target.checked)}/></Grid>
      <Grid item xs={12}><Button fullWidth={true} classes={{ root: classes.button }} variant="contained" component="label">Convert File
        <input type="file" style={{ display: "none" }} ref={fileRef} onChange={handleChange}/>
      </Button></Grid>
    </Grid>
  );
}

export default App;
