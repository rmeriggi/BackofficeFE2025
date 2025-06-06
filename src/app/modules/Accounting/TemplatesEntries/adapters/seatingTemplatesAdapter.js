export const seatingTemplatesAdapter = (seatingTemplates) => {
    const seatingTemplatesFormatted = seatingTemplates.map((e) => {
        const seat = {
            id: e.id,
            module:  e.module?.module,
            description: e.description
        }
        return seat
    })
    return seatingTemplatesFormatted
}