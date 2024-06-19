import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Graph.css';

function Graph() {
    const [username, setUsername] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [keyword, setKeyword] = useState('');
    const [plots, setPlots] = useState([]);
    const [currentPlot, setCurrentPlot] = useState(0);

    const handlePlot = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/plot', {
                username,
                from,
                to,
                keyword
            });
            setPlots(response.data);
            setCurrentPlot(0);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePrevPlot = () => {
        if (currentPlot > 0) {
            setCurrentPlot(currentPlot - 1);
        }
    };

    const handleNextPlot = () => {
        if (currentPlot < plots.length - 1) {
            setCurrentPlot(currentPlot + 1);
        }
    };

    return (
        <div className="container-graph">
            <div className="graph-bar">
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="From" 
                    value={from} 
                    onChange={(e) => setFrom(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="To" 
                    value={to} 
                    onChange={(e) => setTo(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Key Word" 
                    value={keyword} 
                    onChange={(e) => setKeyword(e.target.value)} 
                />
                <button onClick={handlePlot}>Plot</button>
            </div>
            <div className="plot-container">
                {plots.length > 0 && (
                    <Line data={plots[currentPlot]} />
                )}
            </div>
            <div className="plot-navigation">
                <button onClick={handlePrevPlot}>&larr;</button>
                <span>Plot {currentPlot + 1} of {plots.length}</span>
                <button onClick={handleNextPlot}>&rarr;</button>
            </div>
        </div>
    );
}

export default Graph;
