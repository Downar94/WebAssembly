#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

#define SIZE 600 * 600 *  4

uint8_t* mandelbrot(float width, float height, float maxiterations) {
	uint8_t content[SIZE];
    uint8_t *mandelbrotImage = (uint8_t *)&content;

	int subpixel = 0;
	float xb = -2;
    float xm = 2;
    float yb = -2;
    float ym = 2;
    float xstep = (xm - xb) / width;
    float ystep = (ym - yb) / height;

	for (int i = 0; i < width; i++) {
		for (int j = 0; j < height; j++) {
			int iteration = 0;
			float real = xb + i * xstep;
			float imagine = yb + j * ystep;
			float cx = real;
			float cy = imagine;
			while (iteration < maxiterations) {
				float realcv = real * real - imagine * imagine + cx;
				float imaginecv = 2 * real*imagine + cy;
				real = realcv;
				imagine = imaginecv;
				if (real * real + imagine * imagine > 4) {
					break;
				}
				iteration++;
			}
			float tone = iteration / maxiterations;
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
	return mandelbrotImage;
}

int main() {
	return 0;
}
