import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function Animation({algorithm}) {

    const [input, setInput] = React.useState('');
    const canvasRef = React.useRef(null);

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

    function on_add_click() {
        algorithm.add(input)
        setInput('');
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
                />

                <Button variant="contained" onClick={on_add_click}  sx={{ backgroundColor: '#b01e24', color: '#ffffff ', }}>Add</Button>
                <Button variant="contained" onClick={on_remove_click} sx={{ backgroundColor: '#b01e24', color: '#ffffff ', }}>Delete</Button>
                <Button variant="contained" onClick={on_clear_click} sx={{ backgroundColor: '#b01e24', color: '#ffffff ', }}>Clear</Button>
            </div>


            <div className="animations-main">
                <canvas ref={canvasRef} width={800} height={600}></canvas>
            </div>


            <div className="animations-footer">

            </div>
        </div>
    );
}