import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeUp from '@material-ui/icons/VolumeUp';


const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function InputSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.valueInc(newValue/100)
  };

  return (
    <div className={classes.root}>
    {/*<Typography id="input-slider" gutterBottom>
      </Typography> */}
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <VolumeUp/>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            data-testid="music_slider"
            id="music_slider"
          />
        </Grid>
      </Grid>
    </div>
  );
}
