export function colorCode() {
  var makingColorCode = '0123456789ABCDEF';
  var finalCode = '#';
  for (var counter = 0; counter < 6; counter++) {
     finalCode =finalCode+ makingColorCode[Math.floor(Math.random() * 16)];
  }
  return finalCode;
}