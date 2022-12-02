import React from 'react'

import AddExpense from './AddExpense'
import ExpensesTable from './ExpensesTable'

const ExpenseContainer = (props) => {

    return (
        <div>
            <AddExpense />       
            <ExpensesTable />     
        </div>
    )
}

export default ExpenseContainer