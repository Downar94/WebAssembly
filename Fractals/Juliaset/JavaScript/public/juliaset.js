let juliasetImage = []

function juliaset(height, width, maxiterations) {
 let subpixel = 0;
 let xb = -2;
 let xm = 2;
 let yb = -2;
 let ym = 2;
 let xstep = (xm - xb) / width;
 let ystep = (ym - yb) / height;
 let cx = -0.7269 ;
 let cy = 0.1889;
 for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
   let iteration = 0;
   let real = xb + i * xstep;
   let imagine = yb + j * ystep;
   while (iteration < maxiterations) {
    let realcv = real * real - imagine * imagine + cx;
    let imaginecv = 2 * real * imagine + cy;
    real = realcv;
    imagine = imaginecv;
    if (real * real + imagine * imagine > 4) {
     break;
    }
    iteration++;
   }
   let tone = iteration / maxiterations;
   juliasetImage[subpixel] = 255 - tone * 255;
   subpixel++;
   juliasetImage[subpixel] = 255 - tone * 255;
   subpixel++;
   juliasetImage[subpixel] = 255 - tone * 255;
   subpixel++;
   juliasetImage[subpixel] = 255;
   subpixel++;
  }
 }
}