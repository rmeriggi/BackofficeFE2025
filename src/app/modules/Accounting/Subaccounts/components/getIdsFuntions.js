/* eslint-disable eqeqeq */
export const getCurrencyId = (account, accounts, accountingGroups) => {
    const idGroup = accounts.find(a => a.id == account)?.group;
    const idCurrency = accountingGroups.find(e => e.id == idGroup)?.currency;
    return idCurrency
}

export const getEntityId = (account, accounts, accountingGroups) => {
    const idGroup = accounts.find(a => a.id == account)?.group;
    const idEntity = accountingGroups.find(e => e.id == idGroup)?.entity;
    return idEntity
}