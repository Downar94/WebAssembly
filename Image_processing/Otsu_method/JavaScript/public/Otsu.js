function otsu(originPixelsTable, tableLength) {
 let hist = [256];
 let image = []
 let count = 0;
 let total = 0;
 let treshold = 0;
 let varianceC1 = 0;
 let varianceC2 = 0;
 let meanC1 = 0;
 let meanC2 = 0;
 let countC1 = 0;
 let countC2 = 0;
 let sumC1 = 0;
 let sumC2 = 0;
 let varianceBC = 0;
 let max = 0;
 let maxtreshold = 0;;

 let redPointer = 0;
 let greenPointer = 1;
 let bluePointer = 2;
 let grayscale = 0;

 for (let i = 0; i < tableLength; i++) {
  grayscale = ((0.3 * originPixelsTable[redPointer]) + (0.59 * originPixelsTable[greenPointer]) + (0.11 * originPixelsTable[bluePointer]));
  if (i == redPointer) {
   image[i] = grayscale;
   redPointer += 4;
  } else if (i == greenPointer) {
   image[i] = grayscale;
   greenPointer += 4;
  } else if (i == bluePointer) {
   image[i] = grayscale;
   bluePointer += 4;
  } else {
   image[i] = originPixelsTable[i];
  }
 }

 for (let i = 0; i < 256; i++) {
  count = 0;
  for (let j = 0; j < tableLength; j += 4) {
   if (Math.round(image[j]) == i) {
    count++;
   }
  }
  hist[i] = count;
  total += hist[i];
 }

 while (treshold != 255) {
  varianceC1 = 0;
  varianceC2 = 0;
  meanC1 = 0;
  meanC2 = 0;
  countC1 = 0;
  countC2 = 0;
  sumC1 = 0;
  sumC2 = 0;
  varianceBC = 0;

  for (let i = 0; i < 256; i++) {
   if (i <= treshold) {
    countC1 += hist[i];
    sumC1 += (hist[i] * i);
    meanC1 = sumC1 / countC1;
   } else if (i > treshold) {
    countC2 += hist[i];
    sumC2 += (hist[i] * i);
    meanC2 = sumC2 / countC2;
   }
  }

  varianceC1 += (countC1 / (tableLength / 4));
  varianceC2 += (countC2 / (tableLength / 4));
  varianceBC += (varianceC1 * varianceC2) * ((meanC1 - meanC2) * (meanC1 - meanC2));
  if (varianceBC > max) {
   max = varianceBC;
   maxtreshold = treshold;
  }
  treshold += 1;
 }

 for (let i = 0; i < tableLength; i += 4) {
  if (image[i] <= maxtreshold) {
   image[i] = 0;
   image[i + 1] = 0;
   image[i + 2] = 0;
   image[i + 3] = 255;
  } else if (image[i] > maxtreshold) {
   image[i] = 255;
   image[i + 1] = 255;
   image[i + 2] = 255;
   image[i + 3] = 255;
  }
 }
 return image;
}