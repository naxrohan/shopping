import { useState } from "react";
import "./newProduct.css";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../../filebase"
import { addProducts } from "../../redux/apiCall";
import { useDispatch} from 'react-redux'


export default function NewProduct() {
  const [input, setInput] = useState({});
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch()

  const handleInput = (e) => {
    setInput(prev =>{
      return {...prev, [e.target.name]:e.target.value}
    })
  }

  const handleCategoryInput = (e) => {
    setCategory(e.target.value?.split(","))
  }
  
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const newProduct = {
            ...input,
            img: downloadURL,
            cat:category
          }

          addProducts(newProduct, dispatch);


        });
      }
    );

  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input name="img" type="file" id="file" onChange={e => setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="Apple Airpods" onChange={handleInput} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="text" placeholder="$ 10" onChange={handleInput}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name="desc" type="text" placeholder="Apple Airpods description" onChange={handleInput}/>
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input name="cat" type="text" placeholder="shoes, mens, bags" onChange={handleCategoryInput} />
        </div>
        <div className="addProductItem">
          <label>In Stock</label>
          <select name="inStock" id="active" onChange={handleInput}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleFormSubmit}>Create</button>
      </form>
    </div>
  );
}
