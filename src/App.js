import React, {useState} from 'react';
import "./scss/main.scss";
import Header from "./components/Header";
import Register from "./components/Register";
import Categories from './components/Categories';
import Difficulty from "./components/Difficulty";
import Tester from "./components/Tester";

function App() {
    const [user, setUser] = useState({});
    const [activePage, setActivePage] = useState('Tester');
    const RENDER_PART = {
        Register: ({setUser}) => <Register handleSubmit={setUser} handlePageChange={setActivePage}/>,
        Categories: () => <Categories handlePageChange={setActivePage}/>,
        Difficulty: () => <Difficulty handlePageChange={setActivePage} />,
        Tester: () => <Tester />
    };

    return (
        <div className="App">
            <Header user={user}/>
            <main>
                <div className="container">
                    {
                        RENDER_PART[activePage]({setUser, user})
                    }
                </div>
            </main>
        </div>
    );
}

export default App;
