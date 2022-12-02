import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { startDeleteCategory, startUpdateCategory } from "../../actions/categoryActions"

const CategoryItem = (props) => {
    const { name, _id } = props
    const [toggle, setToggle] = useState(false)
    const [category, setCategory] = useState(name)
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(startDeleteCategory(_id))
    }

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleChange = (e) => {
        setCategory(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(category.length === 0){
            errors.category = 'Category Name cannot be empty'
        }
        
        if(Object.keys(errors).length === 0 ){
            setFormErrors({})
            const updateData = {
                name : category
            }
            dispatch(startUpdateCategory(updateData, _id, handleToggle))
        } else {
            setFormErrors(errors)
        }        
    }
   

    return (
        <div 
            className="mt-3 border rounded"
            style={{width : '45vw', minWidth : '200px', marginLeft : '20px'}}
        >
            {!toggle ? (
                <div className="row m-2">
                    <h4 className="col-md-8">{name}</h4>
                    <button className="btn btn-outline-secondary  col-md-2" onClick={handleToggle}>update</button>
                    <button className="btn btn-outline-danger col-md-2" onClick={handleDelete}>delete</button>
                </div>
            ) : (
                <div  className="row m-2">
                    <div className="col-md-7" >
                        <form onSubmit={handleSubmit}>
                            <input 
                                className="form-control"
                                type="text"
                                value={category}
                                onChange={handleChange}
                            />
                        </form>
                        {formErrors.category && <p>{formErrors.category}</p>}
                    </div>
                    <button 
                        className="btn btn-outline-secondary btn-sm col-md-3" 
                        onClick={handleSubmit}
                    >Update Category</button>
                    <button 
                        className="btn btn-outline-secondary btn-sm col-md-2" 
                        onClick={handleToggle}
                    >Cancel</button>
                </div>
            )}
        </div>
    )
}

export default CategoryItem