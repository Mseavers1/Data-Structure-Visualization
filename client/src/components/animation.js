import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function Animation({algorithm}) {

    const [input, setInput] = React.useState('');

    return (
        <div className="animations">

            <div className="animations-header">
                <TextField
                    id="filled-search"
                    label="Input"
                    type="search"
                    variant="filled"
                    onChange={(event) => setInput(event.target.value)}
                    sx={{
                        scale: "90%",
                        width: "120px",
                        backgroundColor: "#ffffff",
                        color: "#000",
                    }}
                />

                <Button variant="contained" onClick={() => algorithm.add(input)}  sx={{ backgroundColor: '#b01e24', color: '#ffffff ', }}>Add</Button>
                <Button variant="contained" onClick={() => algorithm.remove(input)} sx={{ backgroundColor: '#b01e24', color: '#ffffff ', }}>Delete</Button>
                <Button variant="contained" onClick={algorithm.clear} sx={{ backgroundColor: '#b01e24', color: '#ffffff ', }}>Clear</Button>
            </div>


            <div className="animations-main">
                Test
            </div>


            <div className="animations-footer">

            </div>
        </div>
    );
}