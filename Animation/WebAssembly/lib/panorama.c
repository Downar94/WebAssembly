#include <stdio.h>
#include <time.h>
#include <emscripten.h>
#include <math.h>
#include <string.h>
#include <stdint.h>
#include <stdbool.h>
#include <stdlib.h>
EMSCRIPTEN_KEEPALIVE

float* panoramaFrame(int pixStart,float *table){
    float content[512*512*4];
    float *interpolated = (float *)&content;
	int CntRow = 512;
	int CntCol = 512;
	int row[CntRow];
    int column[CntCol];
	float rowRatio = 1;
    float columnRatio = (1024 / 512);
	int posCol = 1;
    int posRow = 1;
	int iPos = 0;

 	 for (int i = 0; i < CntCol; i++) {
  column[i] = round((i + 1) * columnRatio);
 }
  	 for (int i = 0; i < CntRow; i++) {
  row[i] = round((i + 1) * rowRatio);
 }
  for (int countCol = 10; countCol < CntCol; countCol++) {
  posCol = (column[countCol] * 4232*4) - (4232*4) + pixStart;
  for (int countRow = 0; countRow < CntRow; countRow++) {
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
  
int main()
{
  return 0;
}
