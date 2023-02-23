import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
const formValidationSchema = yup.object({
  poster: yup.string().required().min(4).url(),
  name: yup.string().required(),
  author: yup.string().required(),
  releasedate: yup.number().required().min(0),
  description: yup.string().required().min(20),
});

export function Addbook() {
  //   // const [poster, setposter] = useState();
  //   // const [name, setname] = useState();
  //   // const [author, setauthor] = useState();
  //   // const [releasedate, setreleasedate] = useState();

  //   // const [description, setdescription] = useState();

  const formik = useFormik({
    initialValues: {
      poster: " ",
      name: " ",
      author: " ",
      releasedate: " ",
      description: " ",
    },
    validationSchema: formValidationSchema,
    onSubmit: (newlist) => {
      console.log("Form values", newlist);
      addbook(newlist);
    },
  });

  const navigate = useNavigate();
  const addbook = async (newlist) => {
    console.log(newlist);
    // const Newlist = {
    //   poster: poster,
    //   name: name,
    //   author: author,
    //   releasedatee: releasedate,
    //   description: description,
    // };
    // // setbooklist([...booklist, Newlist]);
    // console.log(Newlist);
    await fetch("https://63f606fa59c944921f6b8188.mockapi.io/newbooks", {
      method: "POST",
      body: JSON.stringify(newlist),
      headers: { "Content-Type": "application/json" },
    });
    navigate("/Booklist");
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="inputbox">
        <TextField
          id="outlined-basic"
          label="Poster"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.poster}
          name="poster"
          type="url"
          error={formik.touched.poster && formik.errors.poster}
          helperText={
            formik.touched.poster && formik.errors.poster
              ? formik.errors.poster
              : null
          }
        />
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          type="text"
          error={formik.touched.name && formik.errors.name}
          helperText={
            formik.touched.name && formik.errors.name
              ? formik.errors.name
              : null
          }
        />
        <TextField
          id="outlined-basic"
          label="Author"
          name="author"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.author}
          variant="outlined"
          type="text"
          error={formik.touched.author && formik.errors.author}
          helperText={
            formik.touched.author && formik.errors.author
              ? formik.errors.name
              : null
          }
        />
        <TextField
          id="outlined-basic"
          label="Relasedate"
          name="releasedate"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.releasedate}
          // value={formik.values.name}
          variant="outlined"
          type="text"
          helperText={
            formik.touched.releasedate && formik.errors.releasedate
              ? formik.errors.releasedate
              : null
          }
        />
        <TextField
          id="outlined-basic"
          label="Description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          variant="outlined"
          type="text"
          helperText={
            formik.touched.description && formik.errors.description
              ? formik.errors.description
              : null
          }
        />
        <Button variant="contained" type="submit">
          add
        </Button>
      </form>
    </div>
  );
}
