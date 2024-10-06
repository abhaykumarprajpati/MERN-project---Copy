import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import axios from '../../axiosConfig';

import { toast } from 'react-toastify';



const CategoriesManagement = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newSubcategory, setNewSubcategory] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Define selectedCategoryId
    const [updatedCategoryName, setUpdatedCategoryName] = useState('');
    // const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedSub_CategoryId, setSelectedSub_CategoryId] = useState(null);
    const [updatedSub_CategoryName, setUpdatedSub_CategoryName] = useState('');
    useEffect(() => {
        // Fetch all categories and subcategories
        axios.get('/api/v1/getAllCategories')
            .then(response => {

                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });

        axios.get('/api/v1/getAllsubCategories')
            .then(response => {
                setSubcategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching subcategories:', error);
            });
    }, []);

    const handleCreateCategory = () => {
        // Send a POST request to create a new category
        axios.post('/api/v1/createCategory', { name: newCategory })
            .then(response => {
                console.log('create_category', response);
                setCategories([...categories, response.data]);
                toast.success('Success Notification !', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                });
                setNewCategory('');
            })
            .catch(error => {
                console.error('Error creating category:', error);
            });
    };

    const handleCreateSubcategory = () => {
        if (!selectedCategoryId) {
            toast.warning('Please select a category before creating a subcategory !', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            // alert('Please select a category before creating a subcategory.');
            return;
        }

        // Send a POST request to create a new subcategory with the selected category ID
        axios.post('/api/v1/create-subcategory', { name: newSubcategory, parentCategoryId: selectedCategoryId })
            .then(response => {
                console.log('create_subcategory', response);
                setSubcategories([...subcategories, response.data?.data]);
                toast.success('Success Notification !', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                });
                setNewSubcategory('');
            })
            .catch(error => {
                console.error('Error creating subcategory:', error);
            });
    };

    const handleDeleteCategory = (categoryId) => {
        // Send a DELETE request to delete a category
        axios.delete(`/api/v1/deletecategory/${categoryId}`)
            .then(() => {
                setCategories(categories.filter(category => category._id !== categoryId));
                toast.info('Deleted Successfully !', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                });
            })
            .catch(error => {
                console.error('Error deleting category:', error);
            });
    };

    const handleDeleteSubcategory = (subcategoryId) => {
        // Send a DELETE request to delete a subcategory
        axios.delete(`/api/v1/deleteSubcategory/${subcategoryId}`)
            .then(() => {
                setSubcategories(subcategories.filter(subcategory => subcategory._id !== subcategoryId));
                toast.info('Deleted Successfully !', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1000,
                });
            })
            .catch(error => {
                console.error('Error deleting subcategory:', error);
            });
    };


    const handleUpdateCategory = (category) => {
        setSelectedCategoryId(category._id);
        setUpdatedCategoryName(category.name);
    };

    const handleUpdateSub_Category = (subcategory) => {
        setSelectedSub_CategoryId(subcategory._id)
        setUpdatedSub_CategoryName(subcategory.name)
    }


    const handleSaveUpdatedsub_Category = () => {
        if (!selectedSub_CategoryId) {
            // Add validation or display an error message if no category is selected
            return;
        }

        // Create the request body with the updated category name
        const updatedCategoryData = {
            name: updatedSub_CategoryName,
        };

        // Make a PUT request to update the category
        axios.put(`/api/v1/updatesubcategory/${selectedSub_CategoryId}`, updatedCategoryData)
            .then(response => {
                // Handle the success response
                console.log('Category updated successfully:', response);

                // Update the state with the updated category name
                const updatedCategories = subcategories.map(category => {
                    if (category._id === selectedSub_CategoryId) {
                        return { ...category, name: updatedSub_CategoryName };
                    }
                    return category;
                });
                setSubcategories(updatedCategories);


                // Show a success toast notification
                toast.success('Category updated successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });

                // Clear the selected category and updated category name
                setSelectedSub_CategoryId(null);
                setUpdatedSub_CategoryName('');
            })
            .catch(error => {
                // Handle any error that occurs during the update process
                console.error('Error updating category:', error);

                // Show an error toast notification if needed
                toast.error('Error updating category', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            });
    };

    const handleSaveUpdatedCategory = () => {
        if (!selectedCategoryId) {
            // Add validation or display an error message if no category is selected
            return;
        }

        // Create the request body with the updated category name
        const updatedCategoryData = {
            name: updatedCategoryName,
        };

        // Make a PUT request to update the category
        axios.put(`/api/v1/updatecategory/${selectedCategoryId}`, updatedCategoryData)
            .then(response => {
                // Handle the success response
                console.log('Category updated successfully:', response);

                // Update the state with the updated category name
                const updatedCategories = categories.map(category => {
                    if (category._id === selectedCategoryId) {
                        return { ...category, name: updatedCategoryName };
                    }
                    return category;
                });
                setCategories(updatedCategories);


                // Show a success toast notification
                toast.success('Category updated successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });

                // Clear the selected category and updated category name
                setSelectedCategoryId(null);
                setUpdatedCategoryName('');

            })
            .catch(error => {
                // Handle any error that occurs during the update process
                console.error('Error updating category:', error);

                // Show an error toast notification if needed
                toast.error('Error updating category', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            });
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Categories and Subcategories</h1>

            <div className="row">
                {/* Create a new category */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Create New Category</h5>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="New Category"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                />
                                <button className="btn btn-success" onClick={handleCreateCategory}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Select a category */}
                <div className="mb-3">
                    <label htmlFor="categorySelect" className="form-label">Select a Category</label>
                    <select
                        id="categorySelect"
                        className="form-select"
                        value={selectedCategoryId}
                        onChange={(e) => setSelectedCategoryId(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Create a new subcategory */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Create New Subcategory</h5>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="New Subcategory"
                                    value={newSubcategory}
                                    onChange={(e) => setNewSubcategory(e.target.value)}
                                />
                                <button className="btn btn-success" onClick={handleCreateSubcategory}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* List of categories */}
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Categories</h5>
                            {/* <ul className="list-group">
                                {categories.map(category => (
                                    <li className="list-group-item" key={category._id}>
                                        {category.name}
                                        <button
                                            className="btn btn-danger btn-sm float-end"
                                            onClick={() => handleDeleteCategory(category._id)}>
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleUpdateCategory(category)}
                                        >
                                            Update
                                        </button>
                                    </li>
                                ))}
                            </ul> */}
                            <ul className="list-group">
                                {categories.map(category => (
                                    <li className="list-group-item" key={category._id}>
                                        {category._id === selectedCategoryId ? (
                                            <div className="d-flex">
                                                <input
                                                    type="text"
                                                    className="form-control me-2"
                                                    value={updatedCategoryName}
                                                    onChange={(e) => setUpdatedCategoryName(e.target.value)}
                                                />
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={handleSaveUpdatedCategory}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                {category.name}
                                                <button
                                                    className="btn btn-danger btn-sm mx-2 float-end"
                                                    onClick={() => handleDeleteCategory(category._id)}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className="btn btn-primary btn-sm float-end"
                                                    onClick={() => handleUpdateCategory(category)}
                                                >
                                                    Update
                                                </button>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* List of subcategories */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Subcategories</h5>
                            <ul className="list-group">
                                {subcategories.map(subcategory => (
                                    <li className="list-group-item" key={subcategory._id}>
                                        {
                                            subcategory._id === selectedSub_CategoryId ? (
                                                <div className="d-flex">
                                                    <input
                                                        type="text"
                                                        className="form-control me-2"
                                                        value={updatedSub_CategoryName}
                                                        onChange={(e) => setUpdatedSub_CategoryName(e.target.value)}
                                                    />
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={handleSaveUpdatedsub_Category}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    {subcategory.name}
                                                    <button
                                                        className="btn btn-danger btn-sm float-end"
                                                        onClick={() => handleDeleteSubcategory(subcategory._id)}>
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="btn btn-primary btn-sm float-end mx-2"
                                                        onClick={() => handleUpdateSub_Category(subcategory)}
                                                    >
                                                        Update
                                                    </button>
                                                </>
                                            )
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CategoriesManagement;
