/* eslint-disable eqeqeq */
export const getAccountId = (subAccountId, subAccounts) => {
    const accountId = subAccounts.find(sa => sa.id == subAccountId).account
    return accountId;
  }