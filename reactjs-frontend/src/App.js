import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import StudentListComponent from "./components/StudentListComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import AddOrUpdateStudentComponent from "./components/AddOrUpdateStudentComponent";
import ProfileListComponent from "./components/ProfileListComponent";

function App() {
    return (
        <div>
            <Router>
                <HeaderComponent/>
                <div className="container" >
                    <Routes>
                        <Route path="/" exact element={<StudentListComponent/>}/>
                        <Route path="/students" element={<StudentListComponent/>}/>
                        <Route path="/add-student" element={<AddOrUpdateStudentComponent/>}/>
                        <Route path="/edit-student/:id" element={<AddOrUpdateStudentComponent/>}/>
                        <Route path="/profiles" element={<ProfileListComponent/>}/>

                    </Routes>
                </div>
                <FooterComponent/>
            </Router>
        </div>
    );
}

export default App;
