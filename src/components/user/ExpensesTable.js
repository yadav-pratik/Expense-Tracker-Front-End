import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import {Link} from 'react-scroll'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import { startDeleteExpense, startUpdateExpense } from '../../actions/expenseActions'
import ExpenseForm from '../reused-components/ExpenseForm'

const ExpensesTable = (props) => {
    const [search, setSearch] = useState('')
    const [toggle, setToggle] = useState(false)
    const [expenseToEdit, setExpenseToEdit] = useState({})
    const [deletedExpenses, setDeletedExpenses] = useState(false)

    const dispatch = useDispatch()
    
    const { expenses } = useSelector((state) => {
        return state
    })


    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleExpenseDelete = (id, action) => {
        dispatch(startDeleteExpense(id, action))
    }

    const typeExpenses = expenses.filter(exp => {
        return exp.isDeleted === deletedExpenses
    })

    const expensesTableData = typeExpenses.filter( exp => {
        return (exp.title.includes(search) 
                    || exp.amount.toString().includes(search)
                        || (exp.categoryId && exp.categoryId.name.includes(search)))
    })

    const handleToggle = (exp) => {
        setToggle(!toggle)
        setExpenseToEdit(exp)
    }

    const handleDeletedExpenseToggle = () => {
        setDeletedExpenses(!deletedExpenses)
    }

    const formSubmit = (formData, clear, id) => {
        dispatch(startUpdateExpense(formData, clear, id))
    }

    const data = expensesTableData.map((exp, i) => {
        return { 'srNo' : i+1 , ...exp}
    })

    const columns = [
        {
            dataField: "srNo",
            text: "Sr. No",
            sort: true
        },
        {
            dataField: "title",
            text: "Title",
            sort: true
        },
        {
            dataField: "amount",
            text: "Amount",
            sort: true
        },
        {
            dataField: "categoryId.name",
            text: "Category",
            sort: true,
            formatter : (cell, row) => {
                return `${row.categoryId ? row.categoryId.name : "Category-Deleted"}`
            }
        },
        {
            dataField: "expenseDate",
            text: "Expense Date",
            formatter : (cell, row) => {
                return `${row.expenseDate.slice(0,10)}`
            },
            sort: true

        },
        {
            dataField: "createdAt",
            text: "Created At",
            formatter : (cell, row) => {
                return `${row.createdAt.slice(0,10)}`
            },
            sort: true
        },
        {
            text : 'Actions',
            dataField : 'actions',
            formatter : (cell, row) => {
                return (
                    <div>
                        <Link to='statsContainer'>
                            <button 
                                className='btn btn-outline-secondary btn-sm'
                                disabled={row.isDeleted}
                                onClick={()=>{
                                    handleToggle(row)
                                }}
                            >Edit</button></Link>
                            <button 
                            className='btn btn-outline-dark btn-sm'
                            onClick={()=>{
                                handleExpenseDelete(row._id, row.isDeleted ? 'delete@false' : 'delete@true')
                            }}
                        >{row.isDeleted ? "Undo" : "Delete"}</button>
                    </div>
                )
            }
        }
      ]

    return (
        <div className='mt-5' >
            <hr className='mb-5'/>
            {toggle && 
                <div className='mb-4'>
                    <h5 className='mb-4'>Edit Expense</h5>
                    <ExpenseForm 
                        {...expenseToEdit}
                        formSubmit={formSubmit}
                        handleToggle={handleToggle}
                    />
                </div>
            }
            <div className='row mb-3'>
                <h3 className='col-md-5'>Expenses Table</h3>
                <form className='col-md-2'>
                    <select 
                        className='form-control shadow'
                        value={deletedExpenses}
                        onChange={handleDeletedExpenseToggle}
                    >
                        <option value={false}>Expenses</option>
                        <option value={true}>Deleted Expenses</option>
                    </select>
                </form>
                <form className='col-md-5'>
                    <input 
                        className='form-control shadow'
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="search by title , category or amount..."
                    />
                </form>
            </div>

            {/* <table className='table table-bordered shadow'>
                <thead>
                    <tr>
                        <th>Sr.no</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Expense Date</th>
                        <th>Created On</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expensesTableData.map( (exp, i) => {
                        return (
                            <tr key={exp._id} className={exp.isDeleted ? 'table-danger' : undefined}>
                                <td>{i+1}</td>
                                <td>{exp.isDeleted ? <s style={{color : 'red'}}>{exp.title}</s> : exp.title}</td>
                                <td>{exp.categoryId ? exp.categoryId.name : 'Category-Deleted'}</td>
                                <td>{exp.amount}</td>
                                <td>{exp.expenseDate.slice(0,10)}</td>
                                <td>{exp.createdAt.slice(0,10)}</td>
                                <td>
                                    <Link to='statsContainer'>
                                    <button 
                                        className='btn btn-outline-secondary btn-sm'
                                        disabled={exp.isDeleted}
                                        onClick={()=>{
                                            handleToggle(exp)
                                        }}
                                        >Edit</button></Link>
                                    <button 
                                        className='btn btn-outline-dark btn-sm'
                                        onClick={()=>{
                                            handleExpenseDelete(exp._id, exp.isDeleted ? 'delete@false' : 'delete@true')
                                        }}>{exp.isDeleted ? "Undo" : "Delete"}</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
             */}

            <BootstrapTable
                bootstrap4
                keyField="_id"
                data={data}
                columns={columns}
                pagination={paginationFactory({ sizePerPage: 5 })}
            />
        </div>
    )
}

export default ExpensesTable