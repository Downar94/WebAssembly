function interpolation(table, tableLength, scale) {
 let interpolated = [tableLength * scale * scale];
 let newRowAmount = Math.sqrt((tableLength * scale * scale / 4));
 let newColumnAmount = Math.sqrt((tableLength * scale * scale / 4));
 let row = [newRowAmount];
 let column = [newColumnAmount];
 let rowRatio = 1 / scale;
 let columnRatio = 1 / scale;

 let iPos = 0;
 let posRow = 1;
 let posCol = 1;

 for (let i = 0; i < newRowAmount; i++) {
  row[i] = Math.round((i + 1) * rowRatio);
 }

 for (let i = 0; i < newColumnAmount; i++) {
  column[i] = Math.round((i + 1) * columnRatio);
 }

 for (let countCol = 0; countCol < newColumnAmount; countCol++) {
  posCol = (column[countCol] * (Math.sqrt(tableLength / 4) * 4)) - (Math.sqrt(tableLength / 4) * 4);
  for (let countRow = 0; countRow < newRowAmount; countRow++) {
   posRow = row[countRow];
   interpolated[iPos] = table[posCol + (4 * posRow - 4)];
   iPos += 1;
   interpolated[iPos] = table[posCol + (4 * posRow - 3)];
   iPos += 1;
   interpolated[iPos] = table[posCol + (4 * posRow - 2)];
   iPos += 1;
   interpolated[iPos] = table[posCol + (4 * posRow - 1)];
   iPos += 1;
  }
 }
 return interpolated;
}