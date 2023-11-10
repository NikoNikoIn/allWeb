import { useEffect, useState, useRef, useContext } from 'react'
import Items from '../Items'
const { addList } = Items
import { CurrencyContext } from '../../contexts/CurrencyContext'


const MoneyEarnStats = ({money}) => {

    const [earnSalary, setEarnSalary] = useState(0)
    const [earnSide, setEarnSide] = useState(0)
    const [earnOther, setEarnOther] = useState(0)

    const [percentageSalary, setPercentageSalary] = useState(0)
    const [percentageSide, setPercentageSide] = useState(0)
    const [percentageOther, setPercentageOther] = useState(0)

    const calculateEarnings= () => {
        addList.forEach((purpose) => {
            const total = money.filter((moneySingle) => moneySingle.purpose === purpose)
                               .reduce((acc, curr) => acc + curr.amount, 0)
            switch(purpose) {
                case 'Salary':
                    console.log('case salary')
                    setEarnSalary(total)
                    break
                case 'Side pay':
                    setEarnSide(total)
                    break
                case 'Other':
                    setEarnOther(total)
                    break
                default:
                    break
            }
        })
    }

    useEffect(() => {
        calculateEarnings()
        const totalEarn = earnSalary + earnSide + earnOther
        setPercentageSalary((earnSalary / totalEarn) * 100)
        setPercentageSide((earnSide / totalEarn) * 100)
        setPercentageOther((earnOther / totalEarn) * 100)
    }, [money, earnSalary, earnSide, earnOther])

    const [hoveredExpense, setHoveredExpense] = useState(null)

    const { currency } = useContext(CurrencyContext)


    const handleMouseOver = (name: string, percentage: number, earn: number, e: React.MouseEvent, ref: React.MutableRefObject<any>, color: string) => {
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
                <span>{percentage.toFixed(0)}% - {earn}{currency}</span>
            </div>
        )
        setHoveredExpense(content)
    }
    

    const salaryRef = useRef(null)
    const sideRef = useRef(null)
    const otherRef = useRef(null)

    return (
        <>
            <div className='progress-bar-container' style={{display: 'flex', alignContent: 'center'}}>
                <div 
                    ref={salaryRef} 
                    className='progress-bar-money' 
                    onMouseOver={(e) => handleMouseOver('Salary', percentageSalary, earnSalary, e, salaryRef, '#37b000')} 
                    onMouseLeave={() => setHoveredExpense(null)} 
                    style={{width:`${percentageSalary}%`, backgroundColor:'#37b000'}}
                />
                <div 
                    ref={sideRef} 
                    className='progress-bar-money' 
                    onMouseOver={(e) => handleMouseOver('Side pay', percentageSide, earnSide, e, sideRef, '#92de54')} 
                    onMouseLeave={() => setHoveredExpense(null)} 
                    style={{width:`${percentageSide}%`, backgroundColor:'#92de54'}}
                />
                <div 
                    ref={otherRef} 
                    className='progress-bar-money' 
                    onMouseOver={(e) => handleMouseOver('Other', percentageOther, earnOther, e, otherRef, '#9ab584')} 
                    onMouseLeave={() => setHoveredExpense(null)} 
                    style={{width:`${percentageOther}%`, backgroundColor:'#9ab584'}}
                />
            </div>
            <div className='progress-bar-list'>
                {earnSalary ? <span style={{marginRight: '2%', display: 'flex', alignItems:'center'}}><div style={{width: '1vh', height: '1vh', borderRadius:'50%', backgroundColor:'#37b000', marginRight:'2px'}}/>Salary</span> : null}
                {earnSide ? <span style={{marginRight: '2%', display: 'flex', alignItems:'center'}}><div style={{width: '1vh', height: '1vh', borderRadius:'50%', backgroundColor:'#92de54', marginRight:'2px'}}/>Side pay</span> : null}
                {earnOther ? <span style={{marginRight: '2%', display: 'flex', alignItems:'center'}}><div style={{width: '1vh', height: '1vh', borderRadius:'50%', backgroundColor:'#9ab584', marginRight:'2px'}}/>Other</span> : null}
            </div>

            {hoveredExpense}
        </>
    )
    
}

export default MoneyEarnStats
