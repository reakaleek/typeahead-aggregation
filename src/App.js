import React from 'react';
import Hero from "./components/Hero";
import Search from "./components/Search";


const App = () => (
    <div className="app">
        <Hero title={'adverity'} subtitle={'Programming Challenge'}/>
        <div className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-6">
                        <Search />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default App;
