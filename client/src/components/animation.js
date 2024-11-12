import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Slider, Typography} from "@mui/material";  // Use MUI Slider only
import {Box} from "@mui/material";
import {useEffect, useState} from "react";




export default function Animation({algorithm}) {

    const [input, setInput] = React.useState('');
    const canvasRef = React.useRef(null);

    const [sliderValue, setSliderValue] = useState(50);
    const [paused, setPaused] = useState(false);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        algorithm.set_animation_speed(newValue);
    };

    // Set the canvas size to the window size
    const setCanvasSize = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth; // Set canvas width to window width
            canvas.height = window.innerHeight; // Set canvas height to window height
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
            algorithm.setCanvasRef(canvasRef.current); // Link the canvas to MinHeap
        }
    }, [algorithm]); // Only run this effect when algorithm changes

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
        setPaused(!paused);
        algorithm.pause_animation = paused;
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
                <TextField
                    id="filled-search"
                    label="Input"
                    type="search"
                    variant="filled"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    sx={{
                        scale: "90%",
                        width: "120px",
                        backgroundColor: "#ffffff",
                        color: "#000",
                    }}
                    slotProps={{
                        htmlInput: {
                            maxLength: 5,
                        },
                    }}
                />

                <Button variant="contained" onClick={on_add_click}  sx={{ backgroundColor: '#b01e24', color: '#ffffff ', }}>Add</Button>
                <Button variant="contained" onClick={on_remove_click} sx={{ backgroundColor: '#b01e24', color: '#ffffff ', }}>Delete</Button>
                <Button variant="contained" onClick={on_clear_click} sx={{ backgroundColor: '#b01e24', color: '#ffffff ', }}>Clear</Button>
            </div>


            <div className="animations-main">
                <canvas ref={canvasRef} width={800} height={600}></canvas>
            </div>


            <div className="animations-footer">
                <Box sx={{ width: 300 }} className="speed-slider">
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
                            else return 'Pause';
                        }}
                        min={0}
                        max={100}
                        sx={{
                            '& .MuiSlider-rail': {
                                opacity: 1,
                                backgroundColor: 'gray',
                                height: 8, // Makes the rail thicker
                            },
                            '& .MuiSlider-track': {
                                backgroundColor: '#b01e24', // Change color of the track
                                height: 8, // Makes the track thicker
                            },
                            '& .MuiSlider-thumb': {
                                backgroundColor: 'black', // Customize the thumb color
                                width: 24, // Thumb size
                                height: 24,
                                '&:hover': {
                                    backgroundColor: 'green', // Hover effect on thumb
                                },
                            },
                        }}
                    />
                </Box>

                <Button variant="contained" onClick={pause_or_unpause}  sx={{ backgroundColor: '#b01e24', color: '#ffffff ', }}>{paused ? "Pause" : "Unpause"}</Button>
            </div>
        </div>
    );
}