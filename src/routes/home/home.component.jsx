import { Routes, Route } from "react-router-dom";

import Directory from "../../components/directory/directory.component";





const Home = () => {

  

    return (
        <div>
            <Routes>
                <Route index element={<Directory />} />
                
            </Routes>

        </div>
    )
}

export default Home;
