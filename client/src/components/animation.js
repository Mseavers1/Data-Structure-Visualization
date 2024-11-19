import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    RadioGroup,
    Slide,
    Slider, Switch,
    Typography
} from "@mui/material";
import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import Popover from "@mui/material/Popover";
import {Radio} from '@mui/material';


function ArrowBackIcon () {
    return null;
}

function ArrowForwardIcon () {
    return null;
}

export default function Animation({algorithm}) {

    const [input, setInput] = React.useState('');
    const canvasRef = React.useRef(null);

    const [sliderValue, setSliderValue] = useState(50);
    const [paused, setPaused] = useState(false);
    const [randomN, setRandomN] = useState(10);
    const [selectedOption, setSelectedOption] = useState('number');

    const [anchorEl, setAnchorEl] = useState(null);

    const [highlightMode, setHighlightMode] = useState(false);


    const handleToggle = (event) => {
        setHighlightMode(event.target.checked);
        algorithm.toggleMouseListener(event.target.checked);
    };

    React.useEffect(() => {
        algorithm.set_animation_speed(sliderValue);
        setPaused(false);
        algorithm.pause_animation = false;
    }, []);


    // Open the popover when the button is clicked
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const onRandomizedClick = () => {
        handleClose()

        algorithm.randomize(selectedOption === 'number', randomN);
    }

    const handleRandomChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value) && value > 0 && value <= 63) {
            setRandomN(value);
        }
    };

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // Close the popover when clicking outside
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        algorithm.set_animation_speed(newValue);
    };

    // Set the canvas size to the window size
    const setCanvasSize = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    };

    // Set the canvas size on mount and when the window is resized
    React.useEffect(() => {
        setCanvasSize(); // Set initial size
        window.addEventListener('resize', setCanvasSize); // Update size on window resize

        // Cleanup the resize event listener on component unmount
        return () => {
            window.removeEventListener('resize', setCanvasSize);
        };
    }, []); // Empty dependency array to run only once on mount

    // Set the canvasRef for the MinHeap visualization
    React.useEffect(() => {
        if (canvasRef.current) {
            algorithm.setCanvasRef(canvasRef.current);
        }

    }, [algorithm]);

    React.useEffect(() => {
        if (algorithm && canvasRef.current) {
            algorithm.clear()
        }
    }, [algorithm]);

    function on_add_click() {
        algorithm.add(input)
        setInput('');
    }

    function pause_or_unpause() {
        setPaused((prevPaused) => {
            const newPaused = !prevPaused;
            algorithm.pause_animation = newPaused; // Update pause_animation based on new state
            return newPaused;
        });
    }

    function on_remove_click() {
        algorithm.remove(input)
        setInput('');
    }

    function on_clear_click() {
        algorithm.clear()
    }

    return (
        <div className="animations">

            <div className="animations-header">
                <div className="animations-left">
                    <TextField
                        id="filled-search"
                        label="Input"
                        type="search"
                        variant="filled"
                        value={input}
                        onChange={(event) => setInput (event.target.value)}
                        sx={{
                            scale: "85%",
                            width: "120px",
                            backgroundColor: "white",
                            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
                            "& .MuiFilledInput-root": {
                                borderRadius: "4px",
                            },
                            "& .MuiInputLabel-root": {
                                color: "black",
                            },
                        }}
                        slotProps={{
                            htmlInput : {
                                maxLength : 5,
                            },
                        }}
                    />

                    <Button variant="contained" /*disabled={algorithm.is_animating}*/ onClick={on_add_click}
                            sx={{backgroundColor : '#b01e24', color : '#ffffff ',}}>Add</Button>
                    <Button variant="contained" /*disabled={algorithm.is_animating}*/ onClick={on_remove_click}
                            sx={{backgroundColor : '#b01e24', color : '#ffffff ',}}>Delete</Button>
                    <Button variant="contained" /*disabled={algorithm.is_animating}*/ onClick={on_clear_click}
                            sx={{backgroundColor : '#b01e24', color : '#ffffff ',}}>Clear</Button>

                    <Box sx={{display : 'flex', alignItems : 'center', gap : 1}}>
                        <Button variant="contained" /*disabled={algorithm.is_animating}*/ onClick={handleClick}
                                sx={{backgroundColor : '#1a73e8', color : '#ffffff ',}}>
                            Randomize
                        </Button>

                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical : 'bottom',
                                horizontal : 'center',
                            }}
                            transformOrigin={{
                                vertical : 'top',
                                horizontal : 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    display : 'flex',
                                    flexDirection : 'column',
                                    justifyContent : 'flex-start',
                                    alignItems : 'center',
                                    width : 250,
                                    padding : '10px',
                                }}
                            >
                                {/* Slider for Number Input */}
                                <Box sx={{ width: '100%', marginBottom: '10px' }}>
                                    <Typography gutterBottom>Length of Array</Typography>
                                    <Slider
                                        value={randomN}
                                        onChange={handleRandomChange}
                                        min={0}
                                        max={algorithm.max_size}
                                        step={1}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) => `${value}`}
                                    />
                                </Box>

                                {/* Radio Buttons */}
                                <Box sx={{marginBottom : '10px'}}>
                                    <FormControl>
                                        <RadioGroup
                                            value={selectedOption}
                                            onChange={handleRadioChange}
                                            row
                                        >
                                            <FormControlLabel value="number" control={<Radio/>} label="Numbers"/>
                                            <FormControlLabel value="string" control={<Radio/>} label="Strings"/>
                                        </RadioGroup>
                                    </FormControl>
                                </Box>

                                {/* Button */}
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor : '#b01e24',
                                        color : '#ffffff',
                                        width : '100%'
                                    }}
                                    onClick={onRandomizedClick}
                                >
                                    Randomize
                                </Button>
                            </Box>
                        </Popover>
                    </Box>
                </div>

                <div className="animations-right">
                    <FormControlLabel
                        style={{display: "flex", right: "0", left: "auto"}}
                        control={
                            <Switch
                                checked={highlightMode}
                                onChange={handleToggle}
                                color="primary"
                            />
                        }
                        label="Highlight"
                    />
                </div>

            </div>


            <div className="animations-main">
                <canvas ref={canvasRef} width={800} height={600}></canvas>
            </div>

            <div className="animations-footer">
                <Box sx={{width : 300}} className="speed-slider">
                    <Typography gutterBottom>Animation Speed</Typography>
                    <Slider
                        value={sliderValue}
                        onChange={handleSliderChange}
                        aria-labelledby="slider"
                        valueLabelDisplay="auto"
                        valueLabelFormat={(sliderValue) => {
                            if (sliderValue === 100) return 'Instant';
                            else if (sliderValue >= 66 && sliderValue < 100) return 'Fast';
                            else if (sliderValue >= 33 && sliderValue < 66) return 'Normal';
                            else if (sliderValue > 0 && sliderValue < 33) return 'Slow';
                            else return 'Sloth';
                        }}
                        min={0}
                        max={100}
                        sx={{
                            '& .MuiSlider-rail' : {
                                opacity : 1,
                                backgroundColor : 'gray',
                                height : 8,
                            },
                            '& .MuiSlider-track' : {
                                backgroundColor : '#d9534f',
                                height : 8,
                            },
                            '& .MuiSlider-thumb' : {
                                backgroundColor : 'black',
                                width : 24,
                                height : 24,
                                '&:hover' : {
                                    backgroundColor : 'green',
                                },
                            },
                        }}
                    />
                </Box>

                <Button variant="contained" onClick={pause_or_unpause}
                        sx={{backgroundColor : '#d9534f', color : '#ffffff ',}}>{paused ? "Unpause" : "Pause"}</Button>
            </div>
        </div>
    );
}