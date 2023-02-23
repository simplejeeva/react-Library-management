import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { Booklist } from "./Booklist";
import { Home } from "./Home";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Addbook } from "./Addbook";
import { Editbook } from "./Editbook";
function App() {
  const navigate = useNavigate();
  const [booklist, setbooklist] = useState([]);

  useEffect(() => {
    fetch("https://63f606fa59c944921f6b8188.mockapi.io/newbooks")
      .then((data) => data.json())
      .then((mvs) => setbooklist(mvs));
  }, []);

  return (
    <div>
      <div className="navbar">
        <div>
          <h3>தமிழ் வரலாற்றுப் புத்தகங்கள்</h3>
        </div>
        <div>
          <Button onClick={() => navigate("/")} color="inherit">
            home
          </Button>
          <Button onClick={() => navigate("/Booklist")} color="inherit">
            Books
          </Button>
          <Button onClick={() => navigate("/Add/book")} color="inherit">
            Add Books
          </Button>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Booklist" element={<Booklist />} />
        <Route
          path="/Add/book"
          element={<Addbook booklist={booklist} setbooklist={setbooklist} />}
        />
        <Route path="/Book/edit/:id" element={<Editbook />} />
      </Routes>
    </div>
  );
}
export default App;
