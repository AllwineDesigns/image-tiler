import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 300
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function App() {
  const classes = useStyles();
  const widthRef = useRef(null);
  const heightRef = useRef(null);
  const dpiRef = useRef(null);
  const rowsRef = useRef(null);
  const colsRef = useRef(null);
  const fileRef = useRef(null);

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
            images.push(<g key={`${r},${c}`}><image imageRendering="optimizeSpeed" x={c*canvas.width} y={r*canvas.height} width={canvas.width} height={canvas.height} xlinkHref={canvas.toDataURL()}/></g>);
          }
        }

        const d = document.createElement("div");
        ReactDOM.render(<svg width={width ? width/dpi + "in" : img.width/dpi + "in"} height={height ? height/dpi + "in" : img.height/dpi + "in" } viewBox={"0 0 " + (width ? width : img.width) + " " + (height ? height : img.height)} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          {images}
        </svg>, d);
        const a = document.createElement('a');
        const data = new Blob([ d.innerHTML ], { type: 'image/svg+xml' });
        const url = window.URL.createObjectURL(data);
        a.download = filename + ".svg";
        a.href = url;
        a.click();

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
      <Grid item xs={12}><Button fullWidth={true} classes={{ root: classes.button }} variant="contained" component="label">Convert File
        <input type="file" style={{ display: "none" }} ref={fileRef} onChange={handleChange}/>
      </Button></Grid>
    </Grid>
  );
}

export default App;
