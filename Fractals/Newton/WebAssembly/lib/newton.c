#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include <string.h>
#include <stdint.h>
#define WIDTH 550
#define HEIGHT 550
#define SIZE WIDTH * HEIGHT *  4

typedef struct complexNumber {
	float realValue;
	float imagineValue;
}complexStruct;
struct complexNumber addComplex(complexStruct firstComplex, complexStruct secondComplex) {
	struct complexNumber  temp;
	temp.realValue = firstComplex.realValue + secondComplex.realValue;
	temp.imagineValue = firstComplex.imagineValue + secondComplex.imagineValue;
	return (temp);
}
struct complexNumber substractionComplex(complexStruct firstComplex, complexStruct secondComplex) {
	struct complexNumber  temp;
	temp.realValue = firstComplex.realValue - secondComplex.realValue;
	temp.imagineValue = firstComplex.imagineValue - secondComplex.imagineValue;
	return (temp);
}
struct complexNumber substrComplexOrdinary(complexStruct firstComplex, double ordinaryNumber) {
	struct complexNumber  temp;
	temp.realValue = firstComplex.realValue - ordinaryNumber;
	temp.imagineValue = firstComplex.imagineValue;
	return (temp);
}
struct complexNumber multiplicationComplex(complexStruct firstComplex, complexStruct secondComplex) {
	struct complexNumber  temp;
	temp.realValue = firstComplex.realValue * secondComplex.realValue - firstComplex.imagineValue *secondComplex.imagineValue;
	temp.imagineValue = firstComplex.realValue*secondComplex.imagineValue +firstComplex.imagineValue* secondComplex.realValue;
	return (temp);
}
struct complexNumber multiComplexOrdinary(complexStruct firstComplex, double ordinaryNumber) {
	struct complexNumber  temp;
	temp.realValue = firstComplex.realValue * ordinaryNumber;
	temp.imagineValue = firstComplex.imagineValue*ordinaryNumber;
	return (temp);
}
struct complexNumber divideComplex(complexStruct firstComplex, complexStruct secondComplex) {
	struct complexNumber  temp;
	temp.realValue = (firstComplex.realValue*secondComplex.realValue + firstComplex.imagineValue * secondComplex.imagineValue) / (secondComplex.realValue*secondComplex.realValue + secondComplex.imagineValue*secondComplex.imagineValue);
	temp.imagineValue = (-firstComplex.realValue * secondComplex.imagineValue + firstComplex.imagineValue * secondComplex.realValue) / (secondComplex.realValue*secondComplex.realValue + secondComplex.imagineValue*secondComplex.imagineValue);
	return (temp);
}
float absolute(complexStruct complex) {
	return (sqrt(complex.realValue*complex.realValue + complex.imagineValue*complex.imagineValue));
}
struct complexNumber fun(complexStruct complex) {
	struct complexNumber temp = multiplicationComplex(complex, complex);
	struct complexNumber temp2 = multiplicationComplex(temp, complex);
	struct complexNumber fun = substrComplexOrdinary(temp2, 1);

	return fun;
}
struct complexNumber df(complexStruct complex) {
	struct complexNumber temp = multiplicationComplex(complex, complex);
	struct complexNumber derevative = multiComplexOrdinary(temp, 3);

	return derevative;
}
uint8_t* newton(float width, float height, float maxiterations) {
	uint8_t content[SIZE];
    uint8_t *newtonImage = (uint8_t *)&content;
	float xb = -2;
	float xm = 2;
	float yb = -2;
	float ym = 2;
	float dx = (xm - xb) / (width);
	float dy = (ym - yb) / (height);
	int subpixel = 0;
	int k;
	int count;
	complexStruct complex;
	complexStruct root[3];

	root[0].realValue = 1;
	root[0].imagineValue = 0;
	root[1].realValue = -0.5;
	root[1].imagineValue = sqrt(3) / 2;
	root[2].realValue = -0.5;
	root[2].imagineValue = -sqrt(3) / 2;
	for (int i = 0; i < width; i++) {
		for (int j = 0; j < height; j++) {
			complex.realValue = xb + i * dx;
			complex.imagineValue = yb + j * dy;
			count = 0;
			for (int iteration = 0; iteration < maxiterations; iteration++)
			{
				complexStruct difference;
				complexStruct temp = divideComplex(fun(complex), df(complex));
				complex = substractionComplex(complex, temp);
				float tolerance = 0.0001;

				k = 0;
				difference = substractionComplex(complex, root[k]);
				if (fabs(difference.realValue) < tolerance && fabs(difference.imagineValue) < tolerance)
				{
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
				if (fabs(difference.realValue) < tolerance && fabs(difference.imagineValue) < tolerance)
				{
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
				if (fabs(difference.realValue) < tolerance && fabs(difference.imagineValue) < tolerance)
				{
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
int main() {
	return 0;
}
