import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill, { Quill } from "react-quill";
import moment from "moment";
import "react-quill/dist/quill.snow.css";
import './styles/write.css';
import { useUser } from '../context/authContext';

export function Write() {

  const {user, setUser} = useUser() 
  const navigate = useNavigate()
  const location = useLocation().state;
  const titleLocation = location ? location.title : '';
  const catLocation = location ? location.cat : '';
  const desLocation = location ? location.descrip : '';
  const fileLocation = location ? location.img : null;

  const [errors, setErrors]=useState({})
  //const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: titleLocation,
    descrip: desLocation,
    cat: catLocation,
    file: fileLocation,
    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  });


  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
    setErrors({...errors, [name]: ''}); // Limpiar el error cuando el usuario comienza a escribir
  }
  
  const handleDescripChange = (value) => {
    setFormData({ ...formData, descrip: value });
  };
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData({ ...formData, file: selectedFile });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()

    const errors= {}
    if(!formData.title){
      errors.title = 'Debes agregar un título';
    }
    if(!formData.cat){
      errors.cat = 'selecciona una categoria';
    }
    if (!formData.descrip) {
      errors.descrip = 'Debes agregar una descripcion';
    }
    if (!formData.file){
      errors.cover = 'Debes agregar una foto';
    }
    if (formData.file instanceof File) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(formData.file.type)) {
          errors.cover = 'Debes agregar una foto válida (JPEG, PNG, JPG)';
      }
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

  const formSend = new FormData();
  formSend.append('title', formData.title);
  formSend.append('descrip', formData.descrip);
  formSend.append('cat', formData.cat);
  formSend.append('cover', formData.file);
  formSend.append('date', formData.date);

    try {
      let res;
      if (!location) {
        res = await axios.post('/api/post/', formSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        const postid = location.id
        res = await axios.put(`/api/post/${postid}`, formSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
    navigate("/")
    console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('session_token')
    if (!user && !storedToken) {
      navigate('/');
    }
  }, [user, setUser, navigate]);

    return (
        <section className="add">
            <div className="content">
                <input type="text" placeholder='Title' name='title' value={formData.title} onChange={handleChange}/>
                {errors.title && <p className="field-error">{errors.title}</p>}
                <div className="editorContainer">
                  <ReactQuill
                  className='editor'
                  name='descrip'
                  value={formData.descrip}
                  onChange={handleDescripChange}
                  />
                </div>
                {errors.descrip && <div className="field-error">{errors.descrip}</div>}
            </div>
            <div className="menu">
                <div className="item">
                  <h1>Publicacion</h1>
                  <span>
                    <b>Estado:</b> Borrador
                  </span>
                  <span>
                    <b>Visibility:</b> Publico
                  </span>
                  <input style={{display:"none"}} type="file" accept="image/png, image/jpeg, image/jpg" name="cover" id="file" onChange={handleFileChange}/>
                  <label htmlFor="file" className='file'>Subir imagen</label>
                  {/* {fileLocation && <img src={`./img/${fileLocation}`} alt="Preview" />}
                  {formData.file && <img src={URL.createObjectURL(formData.file)} alt="" />}  */}
                  {formData.file ? (
                    <img src={typeof formData.file === "string" ? `./img/${fileLocation}` : URL.createObjectURL(formData.file)} alt="Foto de portada" />
                  ) : null}

                  {errors.cover && <div className="field-error">{errors.cover}</div>}
                  <div className="buttons">
                    <button>Guardar Borrador</button>
                    <button onClick={handleSubmit}>Publicar</button>
                  </div>
                </div>
                <div className="item">
                  <h1>Category</h1>
                  <div className="cat">
                    <input type="radio" name="cat" value="art" id="art" checked={formData.cat === 'art'} onChange={handleChange}/>
                    <label htmlFor="art">Art</label>
                  </div>
                  <div className="cat">
                    <input type="radio" name="cat" value="videogame" id="videogame" checked={formData.cat === 'videogame'} onChange={handleChange}/>
                    <label htmlFor="art">Video juegos</label>
                  </div>
                  <div className="cat">
                    <input type="radio" name="cat" value="technology" id="technology" checked={formData.cat === 'technology'} onChange={handleChange}/>
                    <label htmlFor="art">Tecnologia</label>
                  </div>
                  <div className="cat">
                    <input type="radio" name="cat" value="cinema" id="cinema" checked={formData.cat === 'cinema'} onChange={handleChange}/>
                    <label htmlFor="art">Cine</label>
                  </div>
                  <div className="cat">
                    <input type="radio" name="cat" value="food" id="food" checked={formData.cat === 'food'} onChange={handleChange}/>
                    <label htmlFor="art">Comida</label>
                  </div>
                  {errors.cat && <p className="field-error">{errors.cat}</p>}
                </div>
            </div>
        </section>
    );
}
