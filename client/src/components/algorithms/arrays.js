import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function Arrays() {
    return (
        <div className="animations">

            <div className="animations-header">
                <TextField
                    id="filled-search"
                    label="Input"
                    type="search"
                    variant="filled"
                    sx={{
                        scale: "90%",
                        width: "100px",
                        backgroundColor: "#ffffff",
                        color: "#000",
                    }}
                />

                <Button variant="contained" sx={{ backgroundColor: '#b01e24', color: '#ffffff ', }}>Add</Button>
                <Button variant="contained" sx={{ backgroundColor: '#b01e24', color: '#ffffff ', }}>Delete</Button>
                <Button variant="contained" sx={{ backgroundColor: '#b01e24', color: '#ffffff ', }}>Clear</Button>
            </div>


            <div className="animations-main">
                Test
            </div>


            <div className="animations-footer">

            </div>
        </div>
    );
}