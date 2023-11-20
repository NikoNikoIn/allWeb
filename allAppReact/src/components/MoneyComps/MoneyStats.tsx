
import MoneyExpenseStats from './MoneyExpenseStats'
import MoneyEarnStats from './MoneyEarnStats'
import MoneyGraphTrend from './MoneyGraphTrend'


const MoneyStats = ({money, earnMoney, expenseMoney}: {money:any, earnMoney: number, expenseMoney: number}) => {
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
                    <MoneyGraphTrend money={money}/>
                </div>
                <br/>
            </div>

        </div>
    )
}

export default MoneyStats
