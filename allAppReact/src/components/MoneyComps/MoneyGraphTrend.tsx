import { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement, ArcElement, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarController, BarElement, ArcElement, Tooltip, Legend)

const MoneyGraphTrend = ({money}: {money:any}) => {
    const [yearlyEarn, setYearlyEarn] = useState({})
    const [yearlyExpense, setYearlyExpense] = useState({})
    const [monthlyEarn, setMonthlyEarn] = useState({})
    const [monthlyExpense, setMonthlyExpense] = useState({})
    const [show, setShow] = useState('yearly')
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

    const monthMap = new Map<number, string>([
        [1, 'January'],
        [2, 'February'],
        [3, 'March'],
        [4, 'April'],
        [5, 'May'],
        [6, 'June'],
        [7, 'July'],
        [8, 'August'],
        [9, 'September'],
        [10, 'October'],
        [11, 'November'],
        [12, 'December'],
    ])

    useEffect(() => {
        const filteredMoney = money.filter((m) => {
            const [time, date] = m.date.split(' ')
            const [day, month, year] = date.split('.')
            const formattedDate = `${year}-${month}-${day} ${time}`
            const dateObj = new Date(formattedDate)
            return dateObj.getMonth() + 1 === selectedMonth && dateObj.getFullYear() === selectedYear
        })

        const moneyMonthlyEarn = filteredMoney.reduce((acc, curr) => {
            const [time, date] = curr.date.split(' ')
            const [day, month, year] = date.split('.')
            const formattedDate = `${year}-${month}-${day} ${time}`
            const dayNum = new Date(formattedDate).getDate()
            if (!acc[dayNum]) {
                acc[dayNum] = 0
            }
            if (curr.type === 'add') {
                acc[dayNum] += curr.amount
            }
            return acc
        }, {})

        const moneyMonthlyExpense = filteredMoney.reduce((acc, curr) => {
            const [time, date] = curr.date.split(' ')
            const [day, month, year] = date.split('.')
            const formattedDate = `${year}-${month}-${day} ${time}`
            const dayNum = new Date(formattedDate).getDate()
            if (!acc[dayNum]) {
                acc[dayNum] = 0
            }
            if (curr.type === 'subtract') {
                acc[dayNum] += curr.amount
            }
            return acc
        }, {})

        setMonthlyEarn(moneyMonthlyEarn)
        setMonthlyExpense(moneyMonthlyExpense)
    }, [money, selectedMonth, selectedYear])

    useEffect(() => {
        const filteredMoney = money.filter((m) => {
            const [time, date] = m.date.split(' ')
            const [day, month, year] = date.split('.')
            const formattedDate = `${year}-${month}-${day} ${time}`
            return new Date(formattedDate).getFullYear() === selectedYear
        })
    
        const moneyYearlyEarn = filteredMoney.reduce((acc, curr) => {
            const [time, date] = curr.date.split(' ')
            const [day, month, year] = date.split('.')
            const formattedDate = `${year}-${month}-${day} ${time}`
            const monthNum = new Date(formattedDate).getMonth() + 1
            if (!acc[monthNum]) {
                acc[monthNum] = 0
            }
            if (curr.type === 'add') {
                acc[monthNum] += curr.amount
            }
            return acc
        }, {})
    
        const moneyYearlyExpense = filteredMoney.reduce((acc, curr) => {
            const [time, date] = curr.date.split(' ')
            const [day, month, year] = date.split('.')
            const formattedDate = `${year}-${month}-${day} ${time}`
            const monthNum = new Date(formattedDate).getMonth() + 1 
            if (!acc[monthNum]) {
                acc[monthNum] = 0
            }
            if (curr.type === 'subtract') {
                acc[monthNum] += curr.amount
            }
            return acc
        }, {})
    
        setYearlyEarn(moneyYearlyEarn)
        setYearlyExpense(moneyYearlyExpense)
    }, [money, selectedYear])
    

    const barChart = (
        <Bar
            data={{
                labels: show === 'yearly' ? (Object.keys(yearlyEarn).length > Object.keys(yearlyExpense).length ? Object.entries(yearlyEarn).map(([month]) => (
                    monthMap.get(Number(month))
                )) : Object.entries(yearlyExpense).map(([month]) => (
                    monthMap.get(Number(month))
                ))) : show === 'monthly' ? (
                    Object.keys(monthlyEarn).length > Object.keys(monthlyExpense).length ? 
                    Object.entries(monthlyEarn).map(([day]) => `${monthMap.get(selectedMonth)} ${day}`) : 
                    Object.entries(monthlyExpense).map(([day]) => `${monthMap.get(selectedMonth)} ${day}`)
                ) : (
                    []
                ),
                datasets: [
                    {
                        label: 'Earnings',
                        data: show === 'yearly' ? Object.entries(yearlyEarn).map(([, total]) => total) : Object.entries(monthlyEarn).map(([, total]) => total),
                        backgroundColor: '#3dc257',
                    },
                    {
                        label: 'Expenses',
                        data: show === 'yearly' ? Object.entries(yearlyExpense).map(([, total]) => total) : Object.entries(monthlyExpense).map(([, total]) => total),
                        backgroundColor: '#c40606'
                    }
                ]
            }}
            style={{width: '100%', boxShadow: 'var(--shadow)'}}
        />
    )

    return (
        <div>
            <h2>Graph of Spending</h2>
            <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                <span className={show === 'yearly' ? 'btn-menu active' : 'btn-menu'} style={{marginRight: '10px'}} onClick={() => setShow('yearly')}>Yearly</span>
                <span className={show === 'monthly' ? 'btn-menu active' : 'btn-menu'} style={{marginRight: '10px'}} onClick={() => setShow('monthly')}>Monthly</span>
                {show === 'monthly' ? ( 
                    <div style={{display:'flex'}}>
                        <select style={{marginRight: '10px'}} className='money-select' value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
                            {Array.from(monthMap.entries()).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                        <input type='number' className='money-input year' value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} />
                    </div>
                ) : show == 'yearly' && (
                    <div>
                        <input type='number' className='money-input year' value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} />
                    </div>
                )}

            </div>
            <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop:'10px'}}>
                {barChart}
            </div>
        </div>
    )
}

export default MoneyGraphTrend
