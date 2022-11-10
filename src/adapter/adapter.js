export const adapterFromClient = (rows, columns, string) => {
    let response = {w: string, fnc: []}
    rows.map(row => {
        let json = {root: row.Terminals, states: []}
        for (const [key, value] of Object.entries(row)) {
            if (key !== 'id' && key !== 'Terminals') {
                value.split('|').forEach(v => json.states.push(v))
            }
        }
        return response.fnc.push(json);
    })
    console.log(response)
    return response
}