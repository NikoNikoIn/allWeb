import { useContext } from 'react'
import '../../App.scss'
import '../../styles/Money.scss'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons'


type MoneySingleType = {
    amount: number;
    type: string;
    id: number;
    purpose: string;
    date: string;
}


const MoneyComponent = ({ moneySingle, removeMoneySingle }: { moneySingle: MoneySingleType, removeMoneySingle: (id: number) => void }) => {

    const currencyContext = useContext(CurrencyContext)

    if (!currencyContext) {
        throw new Error('CurrencyContext not found. Make sure you have wrapped your component with CurrencyProvider')
    }
    const { currency } = currencyContext


    return (
        <div className='money-component'>
            <span className='money-amount' title={moneySingle.amount.toString() + '' + currency}>
                {moneySingle.amount.toString().length > 5 ? `${moneySingle.amount.toString().slice(0, 5)}...` : moneySingle.amount + '' + currency}
                <FontAwesomeIcon 
                    className='money-trend' 
                    style={{
                        color: moneySingle.type === 'add' ? '#3dc257' : '#c40606',
                        marginLeft: '10px'
                    }} 
                    icon={moneySingle.type === 'add' ? faArrowTrendUp : faArrowTrendDown}
                />
            </span>

            <FontAwesomeIcon icon={faXmark} className='money-cancel'
                onClick={() => removeMoneySingle(moneySingle.id)}
            />
            <br/>
            
            <div style={{display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
                <span style={{ margin: '10px'}} className='money-comp-purpose'>{moneySingle.purpose}</span>
                <span style={{
                    color: moneySingle.type === 'add' ? '#3dc257' : '#c40606',
                    marginLeft: '10px',
                }} >{moneySingle.date}</span>
            </div>
        </div>
        
    )
}


export default MoneyComponent
