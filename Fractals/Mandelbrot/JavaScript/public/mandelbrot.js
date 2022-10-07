let mandelbrotImage = []

function mandelbrot(height, width, maxiterations) {
 let subpixel = 0;
 let xb = -2;
 let xm = 2;
 let yb = -2;
 let ym = 2;
 let xstep = (xm - xb) / width;
 let ystep = (ym - yb) / height;

 for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
   let iteration = 0;
   let real = xb + i * xstep;
   let imagine = yb + j * ystep;
   let cx = real;
   let cy = imagine;
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
   mandelbrotImage[subpixel] = 255 - tone * 255;
   subpixel++;
   mandelbrotImage[subpixel] = 255 - tone * 255;
   subpixel++;
   mandelbrotImage[subpixel] = 255 - tone * 255;
   subpixel++;
   mandelbrotImage[subpixel] = 255;
   subpixel++;
  }
 }
}