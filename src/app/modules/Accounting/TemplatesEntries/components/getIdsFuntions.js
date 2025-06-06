/* eslint-disable eqeqeq */
export const getCurrencyId = (idAccount, auxiliaryAccounts) => {
    const currency = auxiliaryAccounts.auxiliaryAccountsMock.find(a => a.id == idAccount).idCurrency;
    return currency
}

export const getEntityId = (idAccount, auxiliaryAccounts) => {
    const entity = auxiliaryAccounts.auxiliaryAccountsMock.find(a => a.id == idAccount).idEntity;
    return entity
}

export const getAccountId = (idAccount, auxiliaryAccounts) => {
    const account = auxiliaryAccounts.auxiliaryAccountsMock.find(a => a.id == idAccount).idGroup;
    return account
}