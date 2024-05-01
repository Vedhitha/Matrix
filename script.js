const form = document.getElementById('matrix-form');
const result = document.getElementById('result');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const matrixSizeInput = document.getElementById('matrix-size');
  const matrixSize = parseMatrixSize(matrixSizeInput.value);

  const matrixAInput = document.getElementById('matrix-a');
  const matrixA = parseMatrix(matrixAInput.value, matrixSize.rows1, matrixSize.columns1);

  const matrixBInput = document.getElementById('matrix-b');
  const matrixB = parseMatrix(matrixBInput.value, matrixSize.rows2, matrixSize.columns2);

  if (matrixSize.columns1!== matrixSize.rows2) {
    result.textContent = 'Error: The number of columns in the first matrix must match the number of rows in the second matrix.';
    return;
  }

  const matrixC = multiplyMatrices(matrixA, matrixB);
  const matrixCString = matrixC.map(row => row.join(' ') + '\n').join('');
  result.textContent = `Solution:\n\nC = \n\n${matrixCString}`;
});

function parseMatrixSize(input) {
  const matches = input.match(/A: (\d+) x (\d+), B: (\d+) x (\d+)/);
  if (!matches) {
    throw new Error('Invalid matrix size input');
  }
  return {
    rows1: parseInt(matches[1], 10),
    columns1: parseInt(matches[2], 10),
    rows2: parseInt(matches[3], 10),
    columns2: parseInt(matches[4], 10),
  };
}

function parseMatrix(input, rows, columns) {
  const lines = input.trim().split('\n');
  if (lines.length!== rows) {
    throw new Error('Invalid matrix input');
  }
  const matrix = [];
  for (let i = 0; i < lines.length; i++) {
    const row = lines[i].trim().split(/\s+/).map(Number);
    if (row.length!== columns) {
      throw new Error('Invalid matrix input');
    }
    matrix.push(row);
  }
  return matrix;
}

function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const columnsA = matrixA[0].length;
  const rowsB = matrixB.length;
  const columnsB = matrixB[0].length;

  const matrixC = new Array(rowsA);
  for (let i = 0; i < rowsA; i++) {
    matrixC[i] = new Array(columnsB);
    for (let j = 0; j < columnsB; j++) {
      matrixC[i][j] = 0;
      for (let k = 0; k < columnsA; k++) {
        matrixC[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }
  return matrixC;
}
