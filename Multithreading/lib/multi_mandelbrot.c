
#define HAVE_STRUCT_TIMESPEC
#include <stdlib.h>
#include <stdio.h>
#include <pthread.h>
#include <errno.h>
#include <math.h>
#include <string.h>
#include <stdint.h>

#define WIDTH 300
#define HEIGHT 300
#define SIZE WIDTH * HEIGHT *  4
static uint8_t content[SIZE];
static uint8_t *mandelbrotImage = (uint8_t *)&content;

uint8_t *fractalImage() {
	return mandelbrotImage;
}

void mandelbrot(float width, float height, float maxiterations,float widththreads, float widththreade, int subpixel, int xthread) {
	float xb = -3;
	float xm = 3;
	float yb = -3;
	float ym = 3;
	float dx = (xm - xb) / (width);
	float dy = (ym - yb) / (height);

	for (int i = widththreads; i < widththreade; i++) {
		for (int j = 0; j < height; j++) {
			int iteration = 0;
			float real = xb + i * dx;
			float imagine = yb + j * dy;
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
	subpixel -= 1;

}
struct threadParameters {
	int width;
	int height;
	int maxiterations;
	int widththreads;
	int widthreade;
	int subpixel;
	int xthread;

};
void *mappingParameters(void* arg) {
	struct threadParameters* parameter = (struct threadParameters*) arg;
	mandelbrot(parameter->width, parameter->height, parameter->maxiterations, parameter->widththreads, parameter->widthreade,parameter->subpixel,parameter->xthread);
	return arg;
}

int main() {
	pthread_t threadsTable[3];
	struct threadParameters parameter[3];
	int id = 1;
	int mwidth = 300;
	int mheight = 300;
	int mmaxit = 10;
	int widththreads = 0;
	int widththreade = 100;
	int subpixel = 0;
	int xthread = -3;

	for (int i = 0; i < 2; i++) {
		parameter[id].width = WIDTH;
		parameter[id].height = HEIGHT;
		parameter[id].maxiterations = mmaxit;
		parameter[id].widththreads = widththreads;
		parameter[id].widthreade = widththreade;
		parameter[id].subpixel = subpixel;
		parameter[id].xthread = xthread;
		if (pthread_create(&threadsTable[i], NULL, mappingParameters, &parameter[id])) {
			return 1;
		}
		id += 1;
		widththreads += 100;
		widththreade += 100;
		subpixel += HEIGHT * WIDTH / 3 * 4;
		xthread += 2;
	}
	mandelbrot(WIDTH, HEIGHT, mmaxit, widththreads, widththreade, subpixel, xthread);
	for (int i = 0; i < 2; i++) {
		pthread_join(threadsTable[i], NULL);
	}

	return 0;
}
