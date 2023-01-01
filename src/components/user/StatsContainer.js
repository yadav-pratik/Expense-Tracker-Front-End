import React from "react"

import BudgetOverview from '../budget/BudgetOverview'
import CategoryWiseSplit from '../category/CategoryWiseSplit'

const StatsContainer = (props) => {
 
    return (
        <div className="row" id="statsContainer">
            <BudgetOverview />
            <CategoryWiseSplit />
        </div>
    )
}

export default StatsContainer