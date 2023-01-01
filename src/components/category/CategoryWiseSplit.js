import React from "react"
import { useSelector } from "react-redux"
import { Chart } from "react-google-charts";

const CategoryWiseSplit = (props) => {
    const { expenses, categories } = useSelector((state) => {
        return state
    })

    const noCategoryStyle = {
        textAlign : 'center',
        width : '60%',
        marginLeft : '20%',
        marginTop : '10%'
    }
    
    const data = [
        ["Category", "Total Expenses"]
    ]
    
    const notDeletedExpenses = expenses.filter(exp => !exp.isDeleted)

    if(categories.length !== 0 && notDeletedExpenses.length !==0){
        categories.forEach(category => {
            let totalExpense = 0
            notDeletedExpenses.forEach(exp => {
                if(exp.categoryId && exp.categoryId._id === category._id){
                    totalExpense += exp.amount
                }
            })
            data.push([category.name , totalExpense])
        })
        
        let categoryDeletedExpense = 0
        
        notDeletedExpenses.forEach(exp => {
            if(!exp.categoryId){
                categoryDeletedExpense += exp.amount
            }
        })
        
        if(categoryDeletedExpense !== 0){
            data.push(['Category-Deleted',categoryDeletedExpense])
        }
    }

    return (
        <div className="col-12 col-md-6">
            <h4 style={{textAlign : 'center'}}>Category Wise Split</h4>
            {categories.length === 0 ? (
                    <h5 style={noCategoryStyle}>Add some Categories to see category-wise distribution of your expenses.</h5>
                ) : (
                    categories.length <= 5 ? (
                        <Chart
                        chartType="PieChart"
                        data={data}
                        options={{height : '320px', backgroundColor : '#e7ffe9'}}
                    />
                    ) : (
                        <table className="table table-sm table-bordered shadow">
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Category</th>
                                    <th>Total Expense</th>
                                </tr>
                            </thead>
                            <thead>
                                {data.slice(1).map( (d, i)=> {
                                    return (
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{d[0]}</td>
                                            <td>{d[1]}</td>
                                        </tr>
                                    )
                                })}
                            </thead>
                        </table>
                    )
                )
            }
        </div>
    )
}

export default CategoryWiseSplit