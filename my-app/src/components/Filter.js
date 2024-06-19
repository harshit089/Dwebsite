import React, { useState } from 'react';
import axios from 'axios';
import './Filter.css';

function Filter() {
    const [username, setUsername] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);

    const handleFilter = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/filter', {
                username,
                from,
                to,
                keyword
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="container-filter">
            <div className="filter-bar">
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
                <button onClick={handleFilter}>Filter</button>
            </div>
            <div className="results">
                {results.map((result, index) => (
                    <div key={index} className="result-item">
                        {JSON.stringify(result)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Filter;
