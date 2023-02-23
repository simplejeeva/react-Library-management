import { useEffect, useState } from "react";

import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import IconButton from "@mui/material/IconButton";
import { Addbook } from "./Addbook";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Navigate, useNavigate } from "react-router-dom";

export function Booklist() {
  const [booklist, setbooklist] = useState([]);

  const getbooks = () => {
    fetch("https://63f606fa59c944921f6b8188.mockapi.io/newbooks", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mvs) => setbooklist(mvs));
  };

  useEffect(() => getbooks(), []);

  // const deletbook = async (id) => {
  //   console.log("deleting book", id);
  //   await fetch(`https://63f606fa59c944921f6b8188.mockapi.io/newbooks/${id}`, {
  //     method: "DELETE",
  //   });
  //   getbooks();
  // };
  const deletbook = (id) => {
    fetch(`https://63f606fa59c944921f6b8188.mockapi.io/newbooks/${id}`, {
      method: "DELETE",
    }).then(() => getbooks());
  };
  const navigate = useNavigate();
  return (
    <div>
      <div className="main">
        {booklist.map((mv) => (
          <Book
            key-={mv.id}
            book={mv}
            id={mv.id}
            Deletbutton={
              <IconButton
                color="error"
                onClick={() => deletbook(mv.id)}
                sx={{ marginLeft: "auto" }}
              >
                <DeleteIcon />
              </IconButton>
            }
            editButton={
              <IconButton
                color="secondary"
                onClick={() => navigate(`/Book/edit/${mv.id}`)}
                sx={{ marginLeft: "auto" }}
              >
                <EditIcon />
              </IconButton>
            }
          />
        ))}
      </div>
    </div>
  );
}
function Book({ book, Deletbutton, editButton }) {
  const [show, setshow] = useState(true);
  return (
    <div className="book-container">
      <img className="poster" src={book.poster} alt="" />
      <div className="sub-div">
        <h2 className="name">Name :{book.name}</h2>
        <h3 className="author">Author :{book.author}</h3>
        <h3 className="date">Realsedate :{book.releasedate}</h3>
        <IconButton
          color="primary"
          onClick={() => setshow(!show)}
          aria-label="toggle summary"
        >
          description
          {show ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
        </IconButton>
      </div>
      {show ? <p className="description">{book.description}</p> : null}
      <div>
        {Deletbutton}
        {editButton}
      </div>
    </div>
  );
}
