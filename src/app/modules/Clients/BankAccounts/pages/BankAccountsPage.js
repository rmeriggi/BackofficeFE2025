import React from 'react';
import { Switch } from 'react-router-dom';
import { ContentRoute } from '../../../../../_metronic/layout';
import {BankAccountEdit} from './BankAccountEdit';
import { BankAccountsContextProvider } from '../context/BankAccountsContext';
import Listing from "./Listing";
import { ClientsContextProvider } from '../../Clients/context/ClientsContext';
import ClientListing from "../../Clients/pages/Listing"

const BankAccountsPage = () => {
    return (
        <Switch>
            <ContentRoute 
                exact
                path="/clients/bankaccounts" 
                component={ClientListing} 
                ContextProvider={ClientsContextProvider} 
            />
            <ContentRoute 
                exact
                path="/clients/bankaccounts/list/:id" 
                component={Listing} 
                ContextProvider={BankAccountsContextProvider} 
            />
            <ContentRoute
                    path="/clients/bankaccounts/edit/:id"
                    component={BankAccountEdit}
                    ContextProvider={BankAccountsContextProvider}
                />
        </Switch>    
    )
}

export default BankAccountsPage;