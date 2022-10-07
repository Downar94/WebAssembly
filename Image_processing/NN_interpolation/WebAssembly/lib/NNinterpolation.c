#include <stdio.h>
#include <time.h>
#include <emscripten.h>
#include <math.h>
#include <string.h>
#include <stdint.h>
EMSCRIPTEN_KEEPALIVE

float* interpolation (float *table, int tableLength, int scale){
  float content[tableLength * scale * scale];
  float *interpolated = (float *)&content;
  int newRowAmount = sqrt((tableLength * scale * scale / 4));
  int newColumnAmount = sqrt((tableLength * scale * scale / 4));
  int row[newRowAmount];
  int column[newColumnAmount];
  float rowRatio = 1 / (float)scale;
  float columnRatio = 1 / (float)scale;
  
  int iPos = 0;
  int posRow = 1;
  int posCol = 1;

int tablepos = 0;
  for (int i = 0; i < newRowAmount; i++) {
  row[i] = round((i + 1) * rowRatio);
  }

 for (int i = 0; i < newColumnAmount; i++) {
  column[i] = round((i + 1) * columnRatio);
  }

 for (int countCol = 0; countCol < newColumnAmount; countCol++) {
  posCol = (column[countCol] * (sqrt(tableLength/4)*4)) - (sqrt(tableLength/4)*4);
  for (int countRow = 0; countRow < newRowAmount; countRow++) {
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

int main(){
	return 0;
}
