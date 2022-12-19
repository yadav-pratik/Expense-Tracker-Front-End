import React from "react"
import { useSelector } from "react-redux"
import ProgressBar from 'react-bootstrap/ProgressBar';

const BudgetOverview = (props) => {
    const { budget, expenses } = useSelector((state) => {
        return state
    })

    const textAlign = {
        textAlign : 'center'
    }
    
    let totalExpenses = 0

    expenses.forEach((exp) => {
        if(!exp.isDeleted){
            totalExpenses += exp.amount
        }
    })

    return (
        <div className="col-12 col-md-6">
            <h4 className="mb-5" style={{textAlign : 'center'}}>Budget Overview</h4>
            
            <ProgressBar 
                animated  
                now={totalExpenses} 
                max={budget.amount}
                variant={ budget.amount > totalExpenses ? "undefined" : "danger"}
                style={{height : "30px"}}
                className="shadow"
            />
            <div className="row mt-5">
                <div className="col card bg-light mb-3 shadow">
                    <div className="card-header"><h5 style={textAlign}>Total Budget</h5></div>
                    <div className="card-body">
                        <h5 className="card-title" style={textAlign}>
                            {
                                budget.hasOwnProperty('amount') ? (
                                    `Rs. ${budget.amount}`
                                ) : (
                                    <div class="spinner-border" role="status">
                                    </div>
                                )
                            }
                        </h5>
                    </div>
                </div>
                <div className="col card bg-light mb-3 shadow">
                    <div className="card-header"><h5 style={textAlign}>Total Expenses</h5></div>
                    <div className="card-body">
                    <h5 style={{color : budget.amount > totalExpenses ? "black" : "red" , textAlign : 'center'}}>Rs. {totalExpenses}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BudgetOverview