import React from 'react';
import { currencyList } from '../components/Items';

export const CurrencyContext = React.createContext({
    currency: 'BYN',
    setCurrency: (currency: string) => {} // Placeholder function
})