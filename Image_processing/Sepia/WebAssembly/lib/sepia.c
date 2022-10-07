#include <stdio.h>
#include <time.h>
#include <emscripten.h>
#include <math.h>
#include <string.h>
#include <stdint.h>
EMSCRIPTEN_KEEPALIVE


float* sepia(float *originPixelsTable, int pixelsNumber){
  float content[pixelsNumber];
  float *sepiaImage = (float *)&content;
  int redPointer = 0;
  int greenPointer = 1;
  int bluePointer = 2;
  int densityPointer = 3;
  float grayscale = 0;
    for(int i = 0; i < pixelsNumber; i++){
    if(i == redPointer){
      sepiaImage[i] = originPixelsTable[i] * 0.393 + originPixelsTable[greenPointer] * 0.769 + originPixelsTable[bluePointer] * 0.189;
      redPointer += 4;
    }
    else if(i == greenPointer) {
      sepiaImage[i] = originPixelsTable[i] * 0.349 + originPixelsTable[greenPointer] * 0.686 + originPixelsTable[bluePointer] * 0.168;
      greenPointer += 4;
    }
    else if(i == bluePointer) {
      sepiaImage[i] = originPixelsTable[i] * 0.272 + originPixelsTable[greenPointer] * 0.534 + originPixelsTable[bluePointer] * 0.131;
      bluePointer += 4;
    }
    else {
      sepiaImage[i] = originPixelsTable[i];
    }
  }
  return sepiaImage;
}

int main()
{
  return 0;
}
