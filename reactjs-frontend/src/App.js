import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import StudentListComponent from "./components/StudentListComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import AddStudentComponent from "./components/AddStudentComponent";

function App() {
    return (
        <div>
            <Router>
                <HeaderComponent/>
                <div className="container" >
                    <Routes>
                        <Route path="/" exact element={<StudentListComponent/>}/>
                        <Route path="/students" element={<StudentListComponent/>}/>
                        <Route path="/add-student" element={<AddStudentComponent/>}/>
                        <Route path="/edit-student/:id" element={<AddStudentComponent/>}/>
                    </Routes>
                </div>
                <FooterComponent/>
            </Router>
        </div>
    );
}

export default App;
