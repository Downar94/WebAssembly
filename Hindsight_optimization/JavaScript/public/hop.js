const IN = 99999;
const N = 20;
const origin = 0;
const target = 4;
let position = [];
let count = 1;
let pos;
let finalRoute = "";
let graph = [
 [0, 71, 151, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Oradea

 [71, 0, IN, 75, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Zerind

 [151, IN, 0, 140, IN, IN, IN, IN, IN, IN, 80, IN, 99, IN, IN, IN, IN, IN, IN, IN], //Sibiud

 [IN, 75, 140, 0, 118, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Arad

 [IN, IN, IN, 118, 0, 111, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Timisoara

 [IN, IN, IN, IN, 111, 0, 70, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Lugoj

 [IN, IN, IN, IN, IN, 70, 0, 75, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Mehadia

 [IN, IN, IN, IN, IN, IN, 75, 0, 120, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Drobeta

 [IN, IN, IN, IN, IN, IN, IN, 120, 0, 138, 146, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Craiova

 [IN, IN, IN, IN, IN, IN, IN, IN, 138, 0, 97, 101, IN, IN, IN, IN, IN, IN, IN, IN], //Pitesti

 [IN, IN, 80, IN, IN, IN, IN, IN, 146, 97, 0, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Rimnicu

 [IN, IN, IN, IN, IN, IN, IN, IN, IN, 101, IN, 0, 211, 90, 85, IN, IN, IN, IN, IN], //Bucharest

 [IN, IN, 99, IN, IN, IN, IN, IN, IN, IN, IN, 211, 0, IN, IN, IN, IN, IN, IN, IN], //Fagaras

 [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 90, IN, 0, IN, IN, IN, IN, IN, IN], //Giurgiu

 [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 85, IN, IN, 0, 98, IN, IN, IN, IN], //Urziceni

 [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 98, 0, 142, 86, IN, IN], //Hirsova

 [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 142, 0, IN, 92, IN], //Vaslui

 [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 86, IN, 0, IN, IN], //Eforie

 [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 92, IN, 0, 87], //Iasi

 [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 87, 0] //Neamt
];

const weatherGraph = [
 [0, 0, 0, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Oradea

 [0, 0, IN, 1, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Zerind

 [0, IN, 0, 0, IN, IN, IN, IN, IN, IN, 0, IN, 0, IN, IN, IN, IN, IN, IN, IN], //Sibiud

 [IN, 1, 0, 0, 1, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Arad

 [IN, IN, IN, 1, 0, 0, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Timisoara

 [IN, IN, IN, IN, 0, 0, 0, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Lugoj

 [IN, IN, IN, IN, IN, 0, 0, 0, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Mehadia

 [IN, IN, IN, IN, IN, IN, 0, 0, 0, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Drobeta

 [IN, IN, IN, IN, IN, IN, IN, 0, 0, 0, 0, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Craiova

 [IN, IN, IN, IN, IN, IN, IN, IN, 0, 0, 0, 0, IN, IN, IN, IN, IN, IN, IN, IN], //Pitesti

 [IN, IN, 0, IN, IN, IN, IN, IN, 0, 0, 0, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Rimnicu

 [IN, IN, IN, IN, IN, IN, IN, IN, IN, 0, IN, 0, 0, 0, 0, IN, IN, IN, IN, IN], //Bucharest

 [IN, IN, 0, IN, IN, IN, IN, IN, IN, IN, IN, 0, 0, IN, IN, IN, IN, IN, IN, IN], //Fagaras

 [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 0, IN, 0, IN, IN, IN, IN, IN, IN], //Giurgiu

 [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 0, IN, IN, 0, 0, IN, IN, IN, IN], //Urziceni

 [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 0, 0, 0, 0, IN, IN], //Hirsova

 [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 0, 0, IN, 0, IN], //Vaslui

 [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 0, IN, 0, IN, IN], //Eforie

 [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 0, IN, 0, 0], //Iasi

 [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 0, 0] //Neamt
];

function dijkstra(matrix, origin) {
 let previousNode = [];
 let visited = [];
 let unvisited = [];
 let shortDist = [];
 let sumTest = N
 let currentPosition;
 let currentLength;
 let currentMinimum;
 for (let i = 0; i < N; i++) {
  unvisited[i] = 1;
  previousNode[i] = undefined;
  visited[i] = 0;
  shortDist[i] = IN;
 }
 unvisited[origin] = 0;
 shortDist[origin] = 0;
 while (sumTest != 0) {
  currentMinimum = IN;
  sumTest = 0;
  for (let i = 0; i < N; i++) {
   if (shortDist[i] < currentMinimum && visited[i] == 0) {
    currentMinimum = shortDist[i];
    currentPosition = i;
   }
  }
  visited[currentPosition] = 1;
  unvisited[currentPosition] = 0;

  for (let i = 0; i < N; i++) {
   if (matrix[currentPosition][i] != IN && visited[i] != 1) {
    currentLength = shortDist[currentPosition] + matrix[currentPosition][i];
    if (currentLength < shortDist[i]) {
     shortDist[i] = currentLength;
     previousNode[i] = currentPosition;
    }
   }
  }
  for (let i = 0; i < N; i++) {
   sumTest += unvisited[i];
  }
 }
 return shortDist;
}

function heuristic(matrix, weatherMatrix, origin, target) {
 let visited = [
  [0, 71, 151, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Oradea

  [71, 0, IN, 75, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Zerind

  [151, IN, 0, 140, IN, IN, IN, IN, IN, IN, 80, IN, 99, IN, IN, IN, IN, IN, IN, IN], //Sibiud

  [IN, 75, 140, 0, 118, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Arad

  [IN, IN, IN, 118, 0, 111, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Timisoara

  [IN, IN, IN, IN, 111, 0, 70, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Lugoj

  [IN, IN, IN, IN, IN, 70, 0, 75, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Mehadia

  [IN, IN, IN, IN, IN, IN, 75, 0, 120, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Drobeta

  [IN, IN, IN, IN, IN, IN, IN, 120, 0, 138, 146, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Craiova

  [IN, IN, IN, IN, IN, IN, IN, IN, 138, 0, 97, 101, IN, IN, IN, IN, IN, IN, IN, IN], //Pitesti

  [IN, IN, 80, IN, IN, IN, IN, IN, 146, 97, 0, IN, IN, IN, IN, IN, IN, IN, IN, IN], //Rimnicu

  [IN, IN, IN, IN, IN, IN, IN, IN, IN, 101, IN, 0, 211, 90, 85, IN, IN, IN, IN, IN], //Bucharest

  [IN, IN, 99, IN, IN, IN, IN, IN, IN, IN, IN, 211, 0, IN, IN, IN, IN, IN, IN, IN], //Fagaras

  [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 90, IN, 0, IN, IN, IN, IN, IN, IN], //Giurgiu

  [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 85, IN, IN, 0, 98, IN, IN, IN, IN], //Urziceni

  [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 98, 0, 142, 86, IN, IN], //Hirsova

  [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 142, 0, IN, 92, IN], //Vaslui

  [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 86, IN, 0, IN, IN], //Eforie

  [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 92, IN, 0, 87], //Iasi

  [IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, IN, 0, 0, 0] //Neamt
 ];
 let n = 10;
 let i = n;
 let totalcost = 0;
 let shortDist;
 while (i > 0) {
  for (let i = 0; i < N; i++) {
   for (let j = 0; j < N; j++) {
    if (weatherMatrix[i][j] <= Math.random()) {
     visited[i][j] = matrix[i][j];
    } else {
     visited[i][j] = IN;
    }
   }
  }
  shortDist = dijkstra(visited, origin);
  if (shortDist[target] != IN) {
   totalcost += shortDist[target];
   i--;
  }
  shortDist = []
 }
 return totalcost / n;
}


function optimalPath(map, weather_matrix, origin, target) {
 let visited = [];
 let unvisited = [];
 let optimalPreviousNode = [];
 let reachingNodeCost = [];
 let finalreachingNodeCost = [];
 let testreachingNodeCost;
 let minimum;
 let position;
 let sum = 1;
 for (let i = 0; i < N; i++) {
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
  for (let i = 0; i < N; i++) {
   if (unvisited[i] == 1) {
    if (finalreachingNodeCost[i] < minimum) {
     minimum = finalreachingNodeCost[i];
     position = i;
    }
   }
  }
  if (position == target) {
   return optimalPreviousNode;
  }
  unvisited[position] = 0;
  visited[position] = 1;
  for (let i = 0; i < N; i++) {
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
  for (let i = 0; i < N; i++) {
   sum += unvisited[i];
  }
 }
}

let path = optimalPath(graph, weatherGraph, origin, target)
position[0] = target;
position[count] = path[target];
while (pos != origin) {
 count++;
 pos = path[position[count - 1]];
 position[count] = pos;
}
for (let i = 0; i < position.length; i++) {
 finalRoute += position[i];
 if (i != position.length - 1) {
  finalRoute += "<-";
 }
}
console.log(finalRoute)