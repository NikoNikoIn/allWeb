import { useEffect, useState, useRef, useContext } from 'react'
import Items from '../Items'
const { subtractList } = Items
import { CurrencyContext } from '../../contexts/CurrencyContext'


const MoneyExpenseStats = ({money}) => {

    const [expenseBills, setExpenseBills] = useState(0)
    const [expenseGroceries, setExpenseGroceries] = useState(0)
    const [expenseFood, setExpenseFood] = useState(0)
    const [expenseClothes, setExpenseClothes] = useState(0)
    const [expenseLeisure, setExpenseLeisure] = useState(0)
    const [expensePurchase, setExpensePurchase] = useState(0)
    const [expenseOther, setExpenseOther] = useState(0)

    const [percentageBills, setPercentageBills] = useState(0)
    const [percentageGroceries, setPercentageGroceries] = useState(0)
    const [percentageFood, setPercentageFood] = useState(0)
    const [percentageClothes, setPercentageClothes] = useState(0)
    const [percentageLeisure, setPercentageLeisure] = useState(0)
    const [percentagePurchase, setPercentagePurchase] = useState(0)
    const [percentageOther, setPercentageOther] = useState(0)

    const calculateExpenses = () => {
        subtractList.forEach((purpose) => {
            const total = money.filter((moneySingle) => moneySingle.purpose === purpose)
                               .reduce((acc, curr) => acc + curr.amount, 0)
            switch(purpose) {
                case 'Bills':
                    setExpenseBills(total)
                    break
                case 'Groceries':
                    setExpenseGroceries(total)
                    break
                case 'Food':
                    setExpenseFood(total)
                    break
                case 'Clothes':
                    setExpenseClothes(total)
                    break
                case 'Leisure':
                    setExpenseLeisure(total)
                    break
                case 'Purchase':
                    setExpensePurchase(total)
                    break
                case 'Other':
                    setExpenseOther(total)
                    break
                default:
                    break
            }
        })
    }

    useEffect(() => {
        calculateExpenses()
        const totalExpense = expenseBills + expenseGroceries + expenseFood + expenseClothes + expenseLeisure + expensePurchase + expenseOther
        setPercentageBills((expenseBills / totalExpense) * 100)
        setPercentageGroceries((expenseGroceries / totalExpense) * 100)
        setPercentageFood((expenseFood / totalExpense) * 100)
        setPercentageClothes((expenseClothes / totalExpense) * 100)
        setPercentageLeisure((expenseLeisure / totalExpense) * 100)
        setPercentagePurchase((expensePurchase / totalExpense) * 100)
        setPercentageOther((expenseOther / totalExpense) * 100)
    }, [money, expenseBills, expenseGroceries, expenseFood, expenseClothes, expenseLeisure, expensePurchase, expenseOther])

    const [hoveredExpense, setHoveredExpense] = useState(null)

    const { currency } = useContext(CurrencyContext)


    const handleMouseOver = (name: string, percentage: number, expense: number, e: React.MouseEvent, ref: React.MutableRefObject<any>, color: string) => {
        e.preventDefault()
        const boundingRect = ref.current.getBoundingClientRect()
        const tooltipX = boundingRect.left + boundingRect.width / 2
        const tooltipY = boundingRect.top + boundingRect.height / 2
        const content = (
            <div 
                className='progress-bar-hover' 
                style={{
                    position: 'absolute',
                    top: tooltipY - 25,
                    left: tooltipX,
                    transform: 'translate(-50%, -90%)',
                    border: `1px solid ${color}`,
                    borderRadius: '10px',
                    padding: '5px',
                    marginBottom: '5px',
                    zIndex: '4',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <h6 style={{color:`${color}`}}>{name}</h6>
                <span>{percentage.toFixed(0)}% - {expense}{currency}</span>
            </div>
        )
        setHoveredExpense(content)
    }
    

    const billsRef = useRef(null)
    const groceriesRef = useRef(null)
    const foodRef = useRef(null)
    const clothesRef = useRef(null)
    const leisureRef = useRef(null)
    const purchaseRef = useRef(null)
    const otherRef = useRef(null)

    return (
        <>
            <div className='progress-bar-container' style={{display: 'flex', alignContent: 'center'}}>
            <div 
                ref={billsRef} 
                className='progress-bar-money' 
                onMouseOver={(e) => handleMouseOver('Bills', percentageBills, expenseBills, e, billsRef, '#B22222')} 
                onMouseLeave={() => setHoveredExpense(null)} 
                style={{width:`${percentageBills}%`, backgroundColor:'#B22222'}}
            />
            <div 
                ref={groceriesRef} 
                className='progress-bar-money' 
                onMouseOver={(e) => handleMouseOver('Groceries', percentageGroceries, expenseGroceries, e, groceriesRef, '#8B0000')} 
                onMouseLeave={() => setHoveredExpense(null)} 
                style={{width:`${percentageGroceries}%`, backgroundColor:'#8B0000'}}
            />
            <div 
                ref={foodRef} 
                className='progress-bar-money' 
                onMouseOver={(e) => handleMouseOver('Food', percentageFood, expenseFood, e, foodRef, '#DC143C')} 
                onMouseLeave={() => setHoveredExpense(null)} 
                style={{width:`${percentageFood}%`, backgroundColor:'#DC143C'}}
            />
            <div 
                ref={clothesRef} 
                className='progress-bar-money' 
                onMouseOver={(e) => handleMouseOver('Clothes', percentageClothes, expenseClothes, e, clothesRef, '#FF4500')} 
                onMouseLeave={() => setHoveredExpense(null)} 
                style={{width:`${percentageClothes}%`, backgroundColor:'#FF4500'}}
            />
            <div 
                ref={leisureRef} 
                className='progress-bar-money' 
                onMouseOver={(e) => handleMouseOver('Leisure', percentageLeisure, expenseLeisure, e, leisureRef, '#FF6347')} 
                onMouseLeave={() => setHoveredExpense(null)} 
                style={{width:`${percentageLeisure}%`, backgroundColor:'#FF6347'}}
            />
            <div 
                ref={purchaseRef} 
                className='progress-bar-money' 
                onMouseOver={(e) => handleMouseOver('Purchase', percentagePurchase, expensePurchase, e, purchaseRef, '#FF7F50')} 
                onMouseLeave={() => setHoveredExpense(null)} 
                style={{width:`${percentagePurchase}%`, backgroundColor:'#FF7F50'}}
            />
            <div 
                ref={otherRef} 
                className='progress-bar-money' 
                onMouseOver={(e) => handleMouseOver('Other', percentageOther, expenseOther, e, otherRef, '#85605a')} 
                onMouseLeave={() => setHoveredExpense(null)} 
                style={{width:`${percentageOther}%`, backgroundColor:'#85605a'}}
            />



            </div>
            <div className='progress-bar-list'>
                {expenseBills ? <span style={{marginRight: '2%', display: 'flex', alignItems:'center'}}><div style={{width: '1vh', height: '1vh', borderRadius:'50%', backgroundColor:'#B22222', marginRight:'2px'}}/>Bills</span> : null}
                {expenseGroceries ? <span style={{marginRight: '2%', display: 'flex', alignItems:'center'}}><div style={{width: '1vh', height: '1vh', borderRadius:'50%', backgroundColor:'#8B0000', marginRight:'2px'}}/>Groceries</span> : null}
                {expenseFood ? <span style={{marginRight: '2%', display: 'flex', alignItems:'center'}}><div style={{width: '1vh', height: '1vh', borderRadius:'50%', backgroundColor:'#DC143C', marginRight:'2px'}}/>Food</span> : null}
                {expenseClothes ? <span style={{marginRight: '2%', display: 'flex', alignItems:'center'}}><div style={{width: '1vh', height: '1vh', borderRadius:'50%', backgroundColor:'#FF4500', marginRight:'2px'}}/>Clothes</span> : null}
                {expenseLeisure ? <span style={{marginRight: '2%', display: 'flex', alignItems:'center'}}><div style={{width: '1vh', height: '1vh', borderRadius:'50%', backgroundColor:'#FF6347', marginRight:'2px'}}/>Leisure</span> : null}
                {expensePurchase ? <span style={{marginRight: '2%', display: 'flex', alignItems:'center'}}><div style={{width: '1vh', height: '1vh', borderRadius:'50%', backgroundColor:'#FF7F50', marginRight:'2px'}}/>Purchase</span> : null}
                {expenseOther ? <span style={{marginRight: '2%', display: 'flex', alignItems:'center'}}><div style={{width: '1vh', height: '1vh', borderRadius:'50%', backgroundColor:'#85605a', marginRight:'2px'}}/>Other</span> : null}
            </div>

            {hoveredExpense}
        </>
    )
    
}

export default MoneyExpenseStats
