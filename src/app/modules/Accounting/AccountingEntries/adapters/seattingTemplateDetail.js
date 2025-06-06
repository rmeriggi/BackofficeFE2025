export const seattingTemplateDetailAdapter = (oneSeattingTemplate) => {
    if(!oneSeattingTemplate) return []
    const oneSeattingTemplateFormatted = oneSeattingTemplate.map((e) => {
        const oneSeattingTemplate = {
            id: e.id,
            idHeader: e.idHeader,
            idAuxiliary: e.idAuxiliary,
            movementType: e.movementType,
            amountCod: e.amountCod,
            auxName: e.auxName,
            subAccountId: e.subAccountId,
            subAccountName: e.subAccountName,
            accountId: e.accountId,
            accountName: e.accountName,
            groupId: e.groupId,
            groupName: e.groupName 
        }
        return oneSeattingTemplate
    })
    return oneSeattingTemplateFormatted
}