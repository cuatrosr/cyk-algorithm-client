export function validateMachineData(rows) {
    for (const row of rows) {
        for (const [key, value] of Object.entries(row)) {
            if (key !== 'id' && key !== 'Variables') {
                if (value === '') {
                    return false;
                }
            }
        }
    }
    return true
}
