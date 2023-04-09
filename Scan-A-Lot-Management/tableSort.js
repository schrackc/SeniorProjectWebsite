//Table Sort

//Table to sort
//Column index of the column to sort
//asc is a bool, determines sorting order. 
function sortTableByColumn(table, column, asc = true){
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    //Sort Each Row
    const sortedRows = rows.sort((a,b) => {
        const aColText =a.querySelector('td:nth-child(${ column + 1 })').textContent.trim();
        const bColText =b.querySelector('td:nth-child(${ column + 1 })').textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });
    
    //Remove all TRs from table
    while(tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    //Readd the newly sorted rows
    tBody.append(...sortedRows);

}

sortTableByColumn(document.querySelector("table"), 1, true);