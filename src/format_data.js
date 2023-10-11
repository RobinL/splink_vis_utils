export function formatRowToAppearInTable(row) {
    let formattedRow = {};
    for (const key in row) {
        if (typeof row[key] === "object") {
            formattedRow[key] = JSON.stringify(row[key]);
        } else {
            formattedRow[key] = row[key];
        }
    }
    return formattedRow;
}
