import React, {useState} from 'react';
import "./scss/main.scss";
import Header from "./components/Header";
import Register from "./components/Register";
import Categories from './components/Categories';


function App() {
    const [user, setUser] = useState({});
    const [activePage, setActivePage] = useState('Register');
    const RENDER_PART = {
        Register: ({setUser}) => <Register handleSubmit={setUser} handlePageChange={setActivePage}></Register>,
        Categories: ({user}) => <Categories user={user}></Categories>
    }

    return (
        <div className="App">
            <Header user={user}></Header>
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
