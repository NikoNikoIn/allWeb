import { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarController, BarElement, ArcElement, Tooltip, Legend);




const MoneyGraphTrend = ({money}) => {
    const [yearlyEarn, setYearlyEarn] = useState({})
    const [yearlyExpense, setYearlyExpense] = useState({})
    const [monthlyEarn, setMonthlyEarn] = useState({})
    const [monthlyExpense, setMonthlyExpense] = useState({})
    const [show, setShow] = useState('yearly')

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

        const moneyYearlyEarn = money.reduce((acc, curr) => {
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

        const moneyYearlyExpense = money.reduce((acc, curr) => {
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



        const moneyMonthlyEarn = money.reduce((acc, curr) => {
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

        const moneyMonthlyExpense = money.reduce((acc, curr) => {
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



        setYearlyEarn(moneyYearlyEarn)
        setYearlyExpense(moneyYearlyExpense)

        setMonthlyEarn(moneyMonthlyEarn)
        setMonthlyExpense(moneyMonthlyExpense)
    }, [money])


    const barChart = (
        <Bar
            data={{
                labels: show === 'yearly' ? (Object.keys(yearlyEarn).length > Object.keys(yearlyExpense).length ? Object.entries(yearlyEarn).map(([month]) => (
                    monthMap.get(Number(month))
                )) : Object.entries(yearlyExpense).map(([month]) => (
                    monthMap.get(Number(month))
                ))) : show === 'monthly' ? (
                    Object.keys(monthlyEarn).length > Object.keys(monthlyExpense).length ? 
                    Object.entries(monthlyEarn).map(([day]) => {
                        const date = new Date();
                        const monthName = monthMap.get(date.getMonth() + 1);
                        return `${monthName} ${day}`;
                    }) : 
                    Object.entries(monthlyExpense).map(([day]) => {
                        const date = new Date();
                        const monthName = monthMap.get(date.getMonth() + 1);
                        return `${monthName} ${day}`;
                    })
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
    
            style={{ height: 'auto', width: 'auto', boxShadow: 'var(--shadow)' }}
        />
    )
    

    return (
        <div>
            <h2>Graph of Spending</h2>
            <span className={show === 'yearly' ? 'btn-menu active' : 'btn-menu'} style={{ marginRight: '10px' }} onClick={() => setShow('yearly')}>Yearly</span>
            <span className={show === 'monthly' ? 'btn-menu active' : 'btn-menu'} style={{ marginRight: '10px' }} onClick={() => setShow('monthly')}>Monthly</span>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:'10px'}}>
                {barChart}
            </div>
        </div>
    )
}

export default MoneyGraphTrend
