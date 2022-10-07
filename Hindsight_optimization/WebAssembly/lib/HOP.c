#include<stdio.h>
#include<string.h>
#include<math.h>
#include <time.h>
#include <stdlib.h>
#include <emscripten.h>
#define IN 99999
#define N 20
EMSCRIPTEN_KEEPALIVE

double randomNumber()
{
	return((rand() % 10000) / 10000.0);
}
float heuristic(int matrix[N][N], float weatherMatrix[N][N], int origin, int target) {
	int n = 10;
	int i = n;
	float totalCost = 0;
	static int heuristicVisited[N][N];
	int dijkstraVisited[N];
	int previousNode[N];
	int shortDist[N];
	int currentMinimum = IN;
	int currentLength;
	int currentPosition;
	int testCount;
	while (i > 0) {
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < N; j++) {
				if (weatherMatrix[i][j] <= randomNumber()) {
					heuristicVisited[i][j] = matrix[i][j];
				}
				else {
					heuristicVisited[i][j] = IN;

				}
			}
		}
		for (int i = 0; i < N; i++) {
			dijkstraVisited[i] = 0;
			shortDist[i] = IN;
			previousNode[i] = -1;
		}
		shortDist[origin] = 0;
		testCount = 1;
		while (testCount < N - 1) {
			currentMinimum = IN;
			for (int i = 0; i < N; i++) {
				if (dijkstraVisited[i] != 1 && shortDist[i] <= currentMinimum) {
					currentMinimum = shortDist[i];
					currentPosition = i;
				}
			}
			dijkstraVisited[currentPosition] = 1;
			for (int i = 0; i < N; i++) {
				if (heuristicVisited[currentPosition][i] != IN && dijkstraVisited[i] != 1) {
					currentLength = shortDist[currentPosition] + heuristicVisited[currentPosition][i];
					if (currentLength < shortDist[i]) {
						shortDist[i] = currentLength;
						previousNode[i] = currentPosition;
					}
				}
			}
			testCount++;
		}

		if (shortDist[target] != IN) {
			totalCost += shortDist[target];
			i--;
		}
	}
	return totalCost / n;
}
void optimalPath(int origin, int target) {
	float bufScore[N];
	float bufprev[N];
	int map[N][N] =
	{
	{0,     71,   151,  IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,   IN,	IN,	  IN,	IN,	  IN,	IN}, //Oradea

	{71,	0,	  IN,	75,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN}, //Zerind

	{151,	IN,	  0,	140,  IN,	IN,	  IN,	IN,	  IN,	IN,	  80,	IN,	  99,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN}, //Sibiud

	{IN,	75,	  140,	0,	  118,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN}, //Arad

	{IN,	IN,	  IN,	118,  0,	111,  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN}, //Timisoara

	{IN,	IN,	  IN,	IN,	  111,	0,	  70,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN}, //Lugoj

	{IN,	IN,	  IN,	IN,	  IN,	70,	  0,	75,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN}, //Mehadia

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  75,	0,	  120,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN}, //Drobeta

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	120,  0,	138,  146,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN}, //Craiova

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  138,	0,	  97,	101,  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN}, //Pitesti

	{IN,	IN,	  80,	IN,	  IN,	IN,	  IN,	IN,	  146,	97,	  0,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN}, //Rimnicu

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	101,  IN,	0,	  211,	90,	  85,	IN,	  IN,	IN,	  IN,	IN}, //Bucharest

	{IN,	IN,	  99,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	211,  0,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN}, //Fagaras

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	90,	  IN,	0,	  IN,	IN,	  IN,	IN,	  IN,	IN}, //Giurgiu

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	85,	  IN,	IN,	  0,	98,	  IN,	IN,	  IN,	IN}, //Urziceni

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  98,	0,	  142,	86,	  IN,	IN}, //Hirsova

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	142,  0,	IN,	  92,	IN}, //Vaslui

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	86,	  IN,	0,	  IN,	IN}, //Eforie

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,   IN,	IN,	  IN,	IN,	  92,	IN,	  0,	87}, //Iasi

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  87,	0} //Neamt
	};
	float weather_matrix[N][N] =
	{
	{0,     0,    0,    IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,   IN,	IN,	  IN,	IN,	  IN,	IN},  //Oradea

	{0,	    0,	  IN,	1,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN},  //Zerind

	{0,	    IN,	  0,	0,    IN,	IN,	  IN,	IN,	  IN,	IN,	  0,	IN,	  0,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN},  //Sibiud

	{IN,	1,	  0,	0,	  1,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN},  //Arad

	{IN,	IN,	  IN,	1,    0,	0,    IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN},  //Timisoara

	{IN,	IN,	  IN,	IN,	  0,	0,	  0,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN},  //Lugoj

	{IN,	IN,	  IN,	IN,	  IN,	0,	  0,	0,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN},  //Mehadia

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  0,	0,	  0,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN},  //Drobeta

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	0,    0,	0,    0.1,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN},  //Craiova

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  0,	0,	  0.2,	0.1,  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN},  //Pitesti

	{IN,	IN,	  0,	IN,	  IN,	IN,	  IN,	IN,	  0.1,	0.2,  0,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN},  //Rimnicu

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	0.1,  IN,	0,	  0.1,	0.1,  0,	IN,	  IN,	IN,	  IN,	IN},  //Bucharest

	{IN,	IN,	  0,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	0.1,  0,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN},  //Fagaras

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	0.1,  IN,	0,	  IN,	IN,	  IN,	IN,	  IN,	IN},  //Giurgiu

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	0,	  IN,	IN,	  0,	0.1,  IN,	IN,	  IN,	IN},  //Urziceni

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  0.1,	0,	  0,	0.1,  IN,	IN},  //Hirsova

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	0,    0,	IN,	  0,	IN},  //Vaslui

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	0.1,  IN,	0,	  IN,	IN},  //Eforie

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,   IN,	IN,	  IN,	IN,	  0,	IN,	  0,	0},  //Iasi

	{IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  IN,	IN,	  0,	0}  //Neamt
	};
	int visited[N];
	int unvisited[N];
	static float optimalPreviousNode[N];
	float reachingNodeCost[N];
	float finalreachingNodeCost[N];
	float testreachingNodeCost;
	float minimum;
	int position;
	int sum = 1;
	for (int i = 0; i < N; i++) {
		visited[i] = 0;
		unvisited[i] = 0;
		optimalPreviousNode[i] = -1;
		reachingNodeCost[i] = IN;
		finalreachingNodeCost[i] = IN;
	}
	reachingNodeCost[origin] = 0;
	finalreachingNodeCost[origin] = heuristic(map, weather_matrix, origin, target);
	unvisited[origin] = 1;
	while (sum != 0) {
		sum = 0;
		minimum = IN;
		for (int i = 0; i < N; i++) {
			if (unvisited[i] == 1) {
				if (finalreachingNodeCost[i] < minimum) {
					minimum = finalreachingNodeCost[i];
					position = i;
				}
			}
		}
		if (position == target) {
			for (int i = 0; i < N; i++) {
				printf("%f \n", optimalPreviousNode[i]);
			}
			for (int i = 0; i < N; i++) {
				bufScore[i] = reachingNodeCost[i];
				bufprev[i] = optimalPreviousNode[i];
			}
			return;
		}
		unvisited[position] = 0;
		visited[position] = 1;
		for (int i = 0; i < N; i++) {
			if (map[position][i] != IN) {
				if (visited[i] != 1) {
					testreachingNodeCost = reachingNodeCost[position] + map[position][i];
					if (unvisited[i] == 0) {
						unvisited[i] = 1;
					}

					if (testreachingNodeCost <= reachingNodeCost[i]) {
						optimalPreviousNode[i] = position;
						reachingNodeCost[i] = testreachingNodeCost;
						finalreachingNodeCost[i] = reachingNodeCost[i] + heuristic(map, weather_matrix, i, target);
					}
				}

			}
		}
		for (int i = 0; i < N; i++) {
			sum += unvisited[i];
		}
	}
}

	int main()
	{
		srand(time(NULL));
		optimalPath(0, 4);
		return 0;

	}
