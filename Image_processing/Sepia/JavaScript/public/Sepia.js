function sepia(originPixelsTable, pixelsNumber) {

 let sepiaImage = [];

 let redPointer = 0;
 let greenPointer = 1;
 let bluePointer = 2;
 let grayscale = 0;

 for (let i = 0; i < pixelsNumber; i++) {
  if (i == redPointer) {
   sepiaImage[i] = originPixelsTable[i] * 0.393 + originPixelsTable[greenPointer] * 0.769 + originPixelsTable[bluePointer] * 0.189;
   redPointer += 4;
  } else if (i == greenPointer) {
   sepiaImage[i] = originPixelsTable[i] * 0.349 + originPixelsTable[greenPointer] * 0.686 + originPixelsTable[bluePointer] * 0.168;
   greenPointer += 4;
  } else if (i == bluePointer) {
   sepiaImage[i] = originPixelsTable[i] * 0.272 + originPixelsTable[greenPointer] * 0.534 + originPixelsTable[bluePointer] * 0.131;
   bluePointer += 4;
  } else {
   sepiaImage[i] = originPixelsTable[i];
  }
 }
 return sepiaImage;
}