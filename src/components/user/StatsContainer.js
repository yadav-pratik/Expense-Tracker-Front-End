import React from "react"

import BudgetOverview from './BudgetOverview'
import CategoryWiseSplit from './CategoryWiseSplit'

const StatsContainer = (props) => {
 
    return (
        <div className="row" id="statsContainer">
            <BudgetOverview />
            <CategoryWiseSplit />
        </div>
    )
}

export default StatsContainer