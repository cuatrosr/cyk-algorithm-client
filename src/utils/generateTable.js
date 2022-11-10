export function generateColumns() {
    return [{field: 'Terminals', width: 200}, {field: 'Var', headerName: 'Var', width: 200, editable: true}]
}

export const generateRows = (columns, amountOfTerminals) => {
    let rows = [{id: 1, Terminals: 'S', Var: ''}]
    let aux = 0;
    for (let i = 1; i < amountOfTerminals; i++) {
        let row = {id: i + 1}
        for (let j = 0; j < columns.length; j++) {
            row[columns[j].field] = (j === 0) ? (String.fromCharCode(65 + aux++)) : ''
        }
        rows[i] = row
    }
    return rows
}