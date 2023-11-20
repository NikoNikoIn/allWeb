
import MoneyExpenseStats from './MoneyExpenseStats'
import MoneyEarnStats from './MoneyEarnStats'
import MoneyGraphTrend from './MoneyGraphTrend'


const MoneyStats = ({money}: {money:any}) => {
    return (
        <div>
            <div className='money-scrollable'>
                <h2>Your Stats</h2>
                <div className='general-money-wrapper stats'>
                    <h3>Earnings</h3>
                    <MoneyEarnStats money={money} />
                </div>
                <br/>
                <div className='general-money-wrapper stats'>
                    <h3>Expenses</h3>
                    <MoneyExpenseStats money={money} />
                </div>
                <br/>
                <div className='general-money-wrapper stats'>
                    <h1>In Progress</h1>
                    <h2>Here will be a money graph trend</h2>
                    <MoneyGraphTrend money={money}/>
                </div>
                <br/>
            </div>

        </div>
    )
}

export default MoneyStats
