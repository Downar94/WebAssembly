function ComplexNumber(realValue, imagineValue) {
 this.realValue = realValue;
 this.imagineValue = imagineValue;
}

function addComplex(firstComplex, secondComplex) {
 let realValue = firstComplex.realValue + secondComplex.realValue;
 let imagineValue = firstComplex.imagineValue + secondComplex.imagineValue;
 let add_sum = new ComplexNumber(realValue, imagineValue);
 return add_sum;
}

function substractionComplex(firstComplex, secondComplex) {
 let temp = new ComplexNumber(0, 0);
 temp.realValue = firstComplex.realValue - secondComplex.realValue;
 temp.imagineValue = firstComplex.imagineValue - secondComplex.imagineValue;
 return temp;
}

function substrComplexOrdinary(firstComplex, ordinaryNumber) {
 let temp = new ComplexNumber(0, 0);
 temp.realValue = firstComplex.realValue - ordinaryNumber;
 temp.imagineValue = firstComplex.imagineValue;
 return (temp);
}

function multiplicationComplex(firstComplex, secondComplex) {
 let temp = new ComplexNumber(0, 0);
 temp.realValue = firstComplex.realValue * secondComplex.realValue - firstComplex.imagineValue * secondComplex.imagineValue;
 temp.imagineValue = firstComplex.realValue * secondComplex.imagineValue + firstComplex.imagineValue * secondComplex.realValue;
 return (temp);
}

function multiComplexOrdinary(firstComplex, ordinaryNumber) {
 let temp = new ComplexNumber(0, 0);
 temp.realValue = firstComplex.realValue * ordinaryNumber;
 temp.imagineValue = firstComplex.imagineValue * ordinaryNumber;
 return (temp);
}

function divideComplex(firstComplex, secondComplex) {
 let temp = new ComplexNumber(0, 0);
 temp.realValue = (firstComplex.realValue * secondComplex.realValue + firstComplex.imagineValue * secondComplex.imagineValue) / (secondComplex.realValue * secondComplex.realValue + secondComplex.imagineValue * secondComplex.imagineValue);
 temp.imagineValue = (-firstComplex.realValue * secondComplex.imagineValue + firstComplex.imagineValue * secondComplex.realValue) / (secondComplex.realValue * secondComplex.realValue + secondComplex.imagineValue * secondComplex.imagineValue);
 return (temp);
}

function absolute(complex) {
 return (sqrt(complex.realValue * complex.realValue + complex.imagineValue * complex.imagineValue));
}

function fun(complex) {
 let temp = new ComplexNumber(0, 0);
 let temp2 = new ComplexNumber(0, 0);
 let fun = new ComplexNumber(0, 0);
 temp = multiplicationComplex(complex, complex);
 temp2 = multiplicationComplex(temp, complex);
 fun = substrComplexOrdinary(temp2, 1);
 return fun;
}

function df(complex) {
 let temp = new ComplexNumber(0, 0);
 let derevative = new ComplexNumber(0, 0);
 temp = multiplicationComplex(complex, complex);
 derevative = multiComplexOrdinary(temp, 3);
 return derevative;
}

function newton(width, height, maxiterations) {
 let newtonImage = [];
 let xb = -2;
 let xm = 2;
 let yb = -2;
 let ym = 2;
 let dx = (xm - xb) / (width);
 let dy = (ym - yb) / (height);
 let subpixel = 0;
 let k;
 let count;
 let complex = new ComplexNumber(0, 0);
 let root = [3];
 root[0] = new ComplexNumber(1, 0);
 root[1] = new ComplexNumber(-0.5, Math.sqrt(3) / 2);
 root[2] = new ComplexNumber(-0.5, -Math.sqrt(3) / 2);


 for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
   complex.realValue = xb + i * dx;
   complex.imagineValue = yb + j * dy;
   count = 0;
   for (let iteration = 0; iteration < maxiterations; iteration++) {
    let difference = new ComplexNumber(0, 0);
    let temp = new ComplexNumber(0, 0);
    temp = divideComplex(fun(complex), df(complex));
    complex = substractionComplex(complex, temp);
    let tolerance = 0.0001;

    k = 0;
    difference = substractionComplex(complex, root[k]);
    if (Math.abs(difference.realValue) < tolerance && Math.abs(difference.imagineValue) < tolerance) {
     newtonImage[subpixel] = 255;
     subpixel++;
     newtonImage[subpixel] = 1;
     subpixel++;
     newtonImage[subpixel] = 1;
     subpixel++;
     newtonImage[subpixel] = 255;
     subpixel++;
     break;
    }
    k++;
    difference = substractionComplex(complex, root[k]);
    if (Math.abs(difference.realValue) < tolerance && Math.abs(difference.imagineValue) < tolerance) {
     newtonImage[subpixel] = 2;
     subpixel++;
     newtonImage[subpixel] = 255;
     subpixel++;
     newtonImage[subpixel] = 2;
     subpixel++;
     newtonImage[subpixel] = 255;
     subpixel++;
     break;
    }
    k++;
    difference = substractionComplex(complex, root[k]);
    if (Math.abs(difference.realValue) < tolerance && Math.abs(difference.imagineValue) < tolerance) {
     newtonImage[subpixel] = 3;
     subpixel++;
     newtonImage[subpixel] = 3;
     subpixel++;
     newtonImage[subpixel] = 255;
     subpixel++;
     newtonImage[subpixel] = 255;
     subpixel++;
     break;
    }
    count++;
   }
   if (count == maxiterations) {
    newtonImage[subpixel] = 4;
    subpixel++;
    newtonImage[subpixel] = 4;
    subpixel++;
    newtonImage[subpixel] = 4;
    subpixel++;
    newtonImage[subpixel] = 255;
    subpixel++;
   }
  }
 }
 return newtonImage;
}