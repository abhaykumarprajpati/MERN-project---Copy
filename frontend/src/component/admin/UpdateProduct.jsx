import React, { useState, useEffect } from 'react'
import "./newProduct.css"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, updateProduct, getProductDetails } from "../../actions/productAction"
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import Offcanvas from './Offcanvas'
import Sidebar from './Sidebar'
import { useParams } from 'react-router-dom'








const UpdateProduct = () => {
    const params = useParams()
    const { id } = params
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { error, product, loading: productdetailloading } = useSelector((state) => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);

    console.log(product && product._id !== id);



    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, SetDescription] = useState("")
    const [category, setCategory] = useState("")
    const [Stock, setStock] = useState(0)
    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])




    const categories = [
        "laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ]



    useEffect(() => {
        if (product && product._id !== id) {

            dispatch(getProductDetails(id))
        } else {
            setName(product?.name);
            SetDescription(product?.description);
            setPrice(product?.price);
            setCategory(product?.category);
            setStock(product?.Stock);
            setOldImages(product?.images);
            console.log("test_useeffect");





        }



        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }

        if (isUpdated) {

            alert.success("Product Updated Successfully")
        
            navigate("/admin/products")
            dispatch({ type: UPDATE_PRODUCT_RESET })

        }


    }, [dispatch, alert, error, navigate, isUpdated, id, product, updateError])

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData()

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);


        images.forEach((image) => {
            myForm.append("images", image)
        });
        dispatch(updateProduct(id, myForm))
        

    }


    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files); // array.from creates a copy  of an array 

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

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
                            onSubmit={updateProductSubmitHandler}

                        >
                            <h1>Update Product</h1>

                            <div>
                                <i className="fa-solid fa-font"></i>
                                <input type="text"
                                    placeholder='Product Name'
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}

                                />
                            </div>
                            <div>
                                <i className="fa-solid fa-dollar-sign"></i>
                                <input type="number"
                                    placeholder='Price'
                                    required
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}

                                />
                            </div>
                            <div>
                                <i className="fa-solid fa-file-prescription"></i>
                                <textarea
                                    placeholder='Product Description'
                                    value={description}
                                    onChange={(e) => SetDescription(e.target.value)}
                                    cols="30" rows="1"></textarea>
                            </div>

                            <div>
                                <i className="fa-solid fa-hashtag"></i>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}>

                                    <option value="">Choose Category</option>
                                    {categories.map((cate) => (
                                        <option key={cate} value={cate}>
                                            {cate}
                                        </option>
                                    ))}

                                </select>
                            </div>

                            <div>
                                <i className="fa-solid fa-list"></i>
                                <input type="number"
                                    placeholder='Stock'
                                    required
                                    value={Stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <div id='createProductFormFile'>
                                <input type="file"
                                    name='avatar'
                                    accept='image/*'
                                    onChange={updateProductImagesChange}
                                    multiple

                                />

                            </div>
                            <div id='createProductFormImage'>

                                {oldImages &&
                                    oldImages.map((image, index) => (
                                        <img key={index} src={image.url} alt="Old Product Preview" />
                                    ))}
                            </div>

                            <div id='createProductFormImage'>

                                {imagesPreview.map((image, index) => (
                                    <img key={index} src={image} alt="Product Preview" />
                                ))}
                            </div>

                            <Button id='createProductBtn'
                                type='submit'
                                disabled={loading ? true : false}

                            >Update</Button>


                        </form>






                    </main>



                </div>



            </div>
        </>
    )
}

export default UpdateProduct

