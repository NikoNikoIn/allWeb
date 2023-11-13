
import MoneyExpenseStats from './MoneyExpenseStats'
import MoneyEarnStats from './MoneyEarnStats'
import MoneyGraphTrend from './MoneyGraphTrend'


const MoneyStats = ({money}) => {
    return (
        <div className='add-wrapper'>
            <div className='add-content'>
                <h2>Your Stats</h2>
                <div className='general-money-wrapper'>
                    <h3>Earnings</h3>
                    <MoneyEarnStats money={money} />
                </div>
                <br/>
                <div className='general-money-wrapper'>
                    <h3>Expenses</h3>
                    <MoneyExpenseStats money={money} />
                </div>
                <br/>
                <div className='general-money-wrapper'>
                    <MoneyGraphTrend/>
                </div>
                <br/>
            </div>

        </div>
    )
}

export default MoneyStats
