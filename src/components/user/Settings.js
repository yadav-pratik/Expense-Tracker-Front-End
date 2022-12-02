import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CategoryItem from './CategoryItem'

import { toggleIsLogged } from '../../actions/isLoggedActions'
import { startGetBudget, setBudgetAmount, startUpdateBudget } from '../../actions/budgetActions'
import { startGetCategories, startAddCateogry } from '../../actions/categoryActions'
import { logoutUser } from '../../actions/userActions'

import { handleLogout } from '../../Helper Functions/sweetAlerts'

const Settings = (props) => {
    const [newCategory, setNewCategory] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const validationStyle = {color : 'red'}

    const dispatch = useDispatch()

    const budget = useSelector((state)=>{
        return state.budget
    })
    const categories = useSelector((state)=>{
        return state.categories
    })

    useEffect(()=>{
        dispatch(startGetBudget())
        dispatch(startGetCategories())
    },[dispatch])

    const handleClick = () => {
        const logoutAndRedirect = () => {
            localStorage.removeItem('token')
            dispatch(toggleIsLogged())
            dispatch(logoutUser())
            props.history.push('/')
        }

        handleLogout(logoutAndRedirect)
    }

    const handleBudgetChange = (e) => {
        dispatch(setBudgetAmount(e.target.value))
    }

    const handleBudgetUpdate = (e) => {
        e.preventDefault()
        dispatch(startUpdateBudget(budget))
    }

    const handleCategoryChange = (e) => {
        setNewCategory(e.target.value)
    }

    const handleAddCategory = (e) => {
        e.preventDefault()
        if(newCategory.length === 0){
            errors.newCategory = 'Category Name cannot be empty'
        }
        
        if(Object.keys(errors).length === 0 ){
            setFormErrors({})
            const clearField = () => {
                setNewCategory('')
            }
            dispatch(startAddCateogry({ name : newCategory}, clearField))
        } else {
            setFormErrors(errors)
        }
    }
    return (
        <div>
             <div className='row mb-4'>
                <h2 className='col-10'>Settings Page</h2>
                <button 
                    className='col btn btn-secondary shadow' 
                    onClick={handleClick}
                    style={{marginRight : '10px'}}
                >Logout</button>
            </div>
            <div className='row mb-4'>
                <div className='col-md-3'>
                    <form onSubmit={handleBudgetUpdate}>
                        <input 
                            className='form-control mb-1 shadow'
                            type="text"
                            value={budget.amount ? budget.amount : 0}
                            onChange={handleBudgetChange}
                        />
                        <input 
                            className='btn btn-primary'
                            type="submit"
                            value="Update Budget"
                        />
                    </form>
                </div>
                <div className='col-md-4'>
                    <form onSubmit={handleAddCategory}>
                        <input 
                            className='form-control mb-1 shadow'
                            type="text"
                            value={newCategory}
                            onChange={handleCategoryChange}
                        />
                        <input 
                            className='btn btn-primary'
                            type="submit"
                            value="Add Category"
                        />
                        {formErrors.newCategory && <p style={validationStyle}>{formErrors.newCategory}</p>}
                    </form>
                </div>
            </div>
            <h3>Your Cateories</h3>
            <div className='d-flex flex-wrap'>
                {categories.map(category => {
                    return <CategoryItem 
                            key={category._id}
                            {...category}
                    />
                })}
            </div>
        </div>
    )
}

export default Settings