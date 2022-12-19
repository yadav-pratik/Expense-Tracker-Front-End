import React, {useState} from 'react'
import { useSelector } from 'react-redux'

const ExpenseForm = (props) => {
    const { formSubmit, handleToggle, title : expTitle, categoryId : expCategory, amount : expAmount, expenseDate : expDate, _id } = props
    const [title, setTitle] = useState(expTitle ? expTitle : '')
    const [amount, setAmount] = useState(expAmount ? expAmount : '')
    const [category, setCategory] = useState(expCategory ? expCategory._id : '')
    const [date, setDate] = useState(expDate ? expDate : '')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const validationStyle = {color : 'red'}

    const { categories } = useSelector((state) => {
        return state
    })

    const handleChange = (e) => {
        const name = e.target.name
        if(name === 'title'){
            setTitle(e.target.value)
        } else if(name === 'category'){
            setCategory(e.target.value)
        } else if(name === 'amount'){
            setAmount(e.target.value)
        } else if(name === 'date'){
            setDate(e.target.value)
        }
    }   

    const runValidations = () => {
        //expense validation
        if(title.length === 0){
            errors.title = 'Expense Name cannot be empty'
        }

        //category validation
        if(category.length === 0){
            errors.category = 'Please select a Category'
        }

        //amount validation
        if(amount.length === 0){
            errors.amount = 'Amount cannot be empty'
        }

        //date validation
        if(date.length === 0){
            errors.date = 'Select the date of Expense'
        }
    }

    const handleExpenseSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0){
            setFormErrors({})

            const clear = () => {
                setTitle('')
                setCategory('')
                setAmount('')
                setDate('')

                handleToggle()
            }

            const formData = {
                title : title,
                categoryId : category,
                amount : amount, 
                expenseDate : date
            }

            formSubmit(formData, clear, _id)
        } else {
            setFormErrors(errors)
        }
    }

    return (
        <form onSubmit={handleExpenseSubmit}>
            <div className='row'>
                <div className='form-group col-md-3'>
                    <input
                        className='form-control'
                        type="text"
                        value={title}
                        onChange={handleChange}
                        name="title"
                        placeholder='Add a Title...'
                        autoFocus
                    />
                    {formErrors.title ? <p style={validationStyle}>{formErrors.title}</p> : <><br/><br/></>}
                </div>
                <div className='form-group col-md-3'>
                    <select className='form-control' value={category} onChange={handleChange} name="category">
                        <option value="">Select a Category</option>
                        {categories.map(c => {
                            return <option 
                                    key={c._id} 
                                    value={c._id}
                                >{c.name}</option>
                        })}
                    </select>
                    {formErrors.category ? <p style={validationStyle}>{formErrors.category}</p> : <><br/><br/></>}
                </div>
                <div className='form-group col-md-3'>
                    <input
                    className='form-control'
                        type="text"
                        value={amount}
                        onChange={handleChange}
                        name="amount"
                        placeholder='Add Amount...'
                    />
                    {formErrors.amount ? <p style={validationStyle}>{formErrors.amount}</p> : <><br/><br/></>}
                </div>
                <div className='form-group col-md-3'>
                <input 
                className='form-control'
                    type="date"
                    value={date}
                    onChange={handleChange}
                    name="date"
                />
                {formErrors.date ? <p style={validationStyle}>{formErrors.date}</p> : <><br/><br/></>}
                </div>
                <button className='col-6 col-md-2 btn btn-outline-primary' type="submit">Submit</button>
                <button className='col-6 col-md-2 btn btn-outline-secondary' onClick={()=>{handleToggle()}}>Cancel</button>
            </div>
        </form>        
    )
}

export default ExpenseForm