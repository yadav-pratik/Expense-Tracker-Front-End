import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import { startAddExpense } from '../../actions/expenseActions'

import ExpenseForm from '../reused-components/ExpenseForm'

const AddExpense = (props) => {
    const [toggle, setToggle] = useState(false)

    const dispatch = useDispatch()

    const formSubmit = (formData, clear) =>{
        dispatch(startAddExpense(formData, clear))
    } 

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return (
        <div>
            {toggle ? (
                <div>
                    <h5 className='mb-4'>Add New Expense</h5>
                    <div>
                        <ExpenseForm 
                            formSubmit={formSubmit}
                            handleToggle={handleToggle}
                        />
                    </div>
                </div>
            ) : (
                <div className='row'>
                    <button 
                        className='col-md-2 btn btn-primary' 
                        style={{height : '40px', marginLeft : '10px'}} 
                        onClick={handleToggle}
                    >Add New Expense</button>
                </div>
            )}

        </div>
    )
}

export default AddExpense