import React, {useContext} from 'react'
import '../App.scss'
import '../styles/Money.scss'
import { CurrencyContext } from '../contexts/CurrencyContext'


import Items from './Items'
const { addList, subtractList } = Items


const MoneyModal = ({ active, setActive, type, setPurpose, onSubmit, input }) => {


    const handleClick = (e, item) => {
        e.preventDefault()
        setPurpose(item)
        setActive(false)
        onSubmit(item)
    }

    const { currency } = useContext(CurrencyContext)

    return (
        <div className={active ? 'money-modal active' : 'money-modal'}>
            <div className='money-modal-content'>
                {type === 'add' ? (
                    <div>
                        <h4>How did you <span style={{color:'#3dc257'}}>earn</span> {input}{currency}?</h4>
                        <div className='modal-list'>
                            {addList.map((item) => (
                                <button className='modal-button add' onClick={(e) => handleClick(e, item)} key={item}>{item}</button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4>Whad did you <span style={{color:'#c40606'}}>spend</span> {input}{currency} on?</h4>
                        <div className='modal-list'>
                            {subtractList.map((item) => (
                                <button className='modal-button subtract' onClick={(e) => handleClick(e, item)} key={item}>{item}</button>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default MoneyModal
