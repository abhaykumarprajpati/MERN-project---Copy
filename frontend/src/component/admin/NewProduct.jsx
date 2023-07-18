import React, { useState, useEffect } from 'react'
import "./newProduct.css"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, createProduct } from "../../actions/productAction"
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import Offcanvas from './Offcanvas'
import Sidebar from './Sidebar'







const NewProduct = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()
    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, SetDescription] = useState("")
    const [Stock, setStock] = useState(0)
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    // const [item, setItem] = useState("")
    // const [category, setCategory] = useState("")
    const [selectedItem, setselectedItem] = useState("");
    const [category, setcategory] = useState("");





    const categories = [

        {
            laptop: ["Hp", "Lenovo", "Asus"]
        },
        {
            Footwear: ["adidas", "Puma", "Nike"]
        }



    ]

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            console.log("new product page")
            alert.success("Product Created Successfully")
            navigate("/admin/dashboard")
            dispatch({ type: NEW_PRODUCT_RESET })

        }
    }, [dispatch, alert, error, navigate, success])

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData()

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        // myForm.set("category", category);
        // myForm.set("selectedCategory", selectedCategory)
        myForm.set("selectedItem", selectedItem)

        console.log(category)

        myForm.set("Stock", Stock);

        images.forEach((image) => {
            myForm.append("images", image)
        });
        dispatch(createProduct(myForm))

    }


    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files); // array.from creates a copy  of an array 

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file)


        })

    }

    function handleCategoryChange(event) {
        setselectedItem(event.target.value);
        setcategory("");
    }

    function handleItemClick(item) {
        setcategory(item);
    }



    return (
        <>
            <MetaData title={`Create Product`} />
            <Offcanvas />
            <div className="">
                <div className="row">
                    <Sidebar />

                    <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4 productListContainer'>

                        <form className='createProductForm row gy-3'
                            encType='multipart/form-data'
                            onSubmit={createProductSubmitHandler}

                        >
                            <h1>Create Product</h1>

                            <div>
                                <i class="fa-solid fa-font"></i>
                                <input type="text"
                                    placeholder='Product'
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}

                                />
                            </div>
                            <div>
                                <i class="fa-solid fa-dollar-sign"></i>
                                <input type="number"
                                    placeholder='Price'
                                    required

                                    onChange={(e) => setPrice(e.target.value)}

                                />
                            </div>
                            <div>
                                <i class="fa-solid fa-file-prescription"></i>
                                <textarea
                                    placeholder='Product Description'
                                    value={description}
                                    onChange={(e) => SetDescription(e.target.value)}
                                    cols="30" rows="1"></textarea>
                            </div>






                            <p>Select a Category</p>

                            <select id="category-select" className='category' onChange={handleCategoryChange} >
                                <option value="">--Please choose a category--</option>
                                {categories.map((category) => (
                                    <option key={Object.keys(category)[0]} value={Object.keys(category)[0]}>
                                        {Object.keys(category)[0]}
                                    </option>
                                ))}
                            </select>


                            {selectedItem && (
                                <div>
                                    <div>
                                        <p>Items in {selectedItem} category:</p>
                                        <select className='category' onChange={(e) => handleItemClick(e.target.value)}>
                                            <option disabled selected value> -- Select an item -- </option>
                                            {categories
                                                .find((category) => Object.keys(category)[0] === selectedItem)[selectedItem]
                                                .map((item) => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            )}

                            {category && <p>You have selected: {category}</p>}





                            <div>
                                <i class="fa-solid fa-list"></i>
                                <input type="number"
                                    placeholder='Stock'
                                    required
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <div id='createProductFormFile'>
                                <input type="file"
                                    className='ms-4'

                                    name='avatar'
                                    accept='image/*'
                                    onChange={createProductImagesChange}
                                    multiple

                                />

                            </div>

                            <div id='createProductFormImage'>

                                {imagesPreview.map((image, index) => (
                                    <img key={index} src={image} alt="Product Preview" />
                                ))}
                            </div>

                            <Button id='createProductBtn'
                                type='submit'
                                disabled={loading ? true : false}
                                className="mt-2"

                            >Create</Button>


                        </form>






                    </main>



                </div>



            </div>
        </>
    )
}

export default NewProduct
