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
// import axios from 'axios'
import axios from '../../axiosConfig'







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

    const [selectedItem, setselectedItem] = useState(false);
    const [category, setcategory] = useState("");
    const [newCategory, setNewCategory] = useState([])
    const [subcategories, setsubcategories] = useState([])
    const [selectedCategoryName, setSelectedCategoryName] = useState("")
    const [parentCategoryId, setParentCategoryId] = useState("")
    const [subcategoryId, setSubcategoryId] = useState("")
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);




    const categories = [

        {
            laptop: ["Hp", "Lenovo", "Asus"]
        },
        {
            Footwear: ["adidas", "Puma", "Nike"]
        }



    ]

    const getCategory = async () => {
        const { data } = await axios.get(`/api/v1/getAllCategories`)

        setNewCategory(data)
        console.log('new Category', data);
    }

    useEffect(() => {
        console.log('new Category1')
        getCategory();
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

    useEffect(() => {

        axios.get('/api/v1/getAllsubCategories')
            .then(response => {
                console.log('getallcategory_2', response?.data);
                setsubcategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching subcategories data:', error);
            });
    }, []);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData()

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("parentcategory", parentCategoryId);
        myForm.set("subcategory", subcategoryId)
        // myForm.set("category", category);
        // myForm.set("selectedCategory", selectedCategory)
        // myForm.set("selectedItem", selectedItem)

        console.log(category)

        myForm.set("Stock", Stock);

        images.forEach((image) => {
            myForm.append("images", image)
        });
        dispatch(createProduct(myForm))

    }


    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files); // array.from creates a copy  of an array 
        console.log('files', files)
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

    async function handleCategoryChange(event) {
        console.log('checking category', event.target.value)
        setParentCategoryId(event.target.value)
        // const { data } = await axios.get(`/api/v1/subcategory/${event.target.value}`);
        // console.log('subcategories based on parent id', data?.data)

        // setsubcategories(data?.data);
        const filteredSubcategories = subcategories.filter(item => item.parentCategoryId === event.target.value);
        console.log('filteredcategories', filteredSubcategories);
        setFilteredSubcategories(filteredSubcategories);
        setselectedItem(true)
        setcategory("");
    }

    function handleItemClick(item) {
        console.log('subcategoryid', item);
        setSubcategoryId(item)
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
                                {newCategory.map((category) => (

                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            {selectedItem && (
                                <div>
                                    <div>
                                        {/* <p>Items in {selectedItem} category:</p> */}
                                        <p>Items in {selectedCategoryName} category:</p>
                                        <select className='category' onChange={(e) => handleItemClick(e.target.value)}>
                                            <option value=""> -- Select an item -- </option>
                                            {filteredSubcategories?.map((category, index) => (

                                                <option key={category._id} value={category._id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}




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
