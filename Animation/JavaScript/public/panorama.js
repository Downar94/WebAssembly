function panoramaFrame(pixStart, table) {
 let interpolated = [512 * 512 * 4];
 let CntRow = 512;
 let CntCol = 512;
 let row = [CntRow];
 let column = [CntCol];
 let rowRatio = 1;
 let columnRatio = (1024 / 512);
 let posCol = 1;
 let posRow = 1;
 let iPos = 0;

 for (let i = 0; i < CntCol; i++) {
  column[i] = Math.round((i + 1) * columnRatio);
 }
 for (let i = 0; i < CntRow; i++) {
  row[i] = Math.round((i + 1) * rowRatio);
 }
 for (let countCol = 10; countCol < CntCol; countCol++) {
  posCol = (column[countCol] * 4232 * 4) - (4232 * 4) + pixStart;
  for (let countRow = 0; countRow < CntRow; countRow++) {
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