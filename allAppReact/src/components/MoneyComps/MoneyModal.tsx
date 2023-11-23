import {useContext, FC} from 'react'
import '../../App.scss'
import '../../styles/Money.scss'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


import Items from '../Items'
const { addList, subtractList } = Items

interface MoneyModalProps {
    active: boolean;
    setActive: (active: boolean) => void;
    type: string;
    setPurpose: (purpose: string) => void;
    onSubmit: (item: string) => void;
    input: string;
}


const MoneyModal: FC<MoneyModalProps> = ({ active, setActive, type, setPurpose, onSubmit, input }) => {

    const handleClick = (e: any, item: any) => {
        e.preventDefault()
        setPurpose(item)
        setActive(false)
        onSubmit(item)
    }

    const currencyContext = useContext(CurrencyContext)

    if (!currencyContext) {
        throw new Error('CurrencyContext not found. Make sure you have wrapped your component with CurrencyProvider')
    }
    const { currency } = currencyContext

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
                        <div>

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

                <FontAwesomeIcon icon={faXmark} style={{color:'var(--moneySpend)', cursor: 'pointer'}}
                    onClick={() => setActive(false)}
                />

            </div>

        </div>
    )
}

export default MoneyModal
