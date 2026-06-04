#!/usr/bin/env node
// Node.js CLI Calculator
// Supported operations:
// - addition (+, add)
// - subtraction (-, subtract)
// - multiplication (*, x, multiply)
// - division (/, divide)

const readline = require('readline');

function printUsage() {
  console.log('Usage:');
  console.log('  node src/calculator.js <op> <a> <b>');
  console.log('  where <op> is one of: + - * / add subtract multiply divide x');
  console.log('Examples:');
  console.log('  node src/calculator.js + 2 3');
  console.log('  node src/calculator.js multiply 4 5');
}

function compute(op, a, b) {
  switch (op) {
    case '+':
    case 'add':
      return a + b;
    case '-':
    case 'subtract':
      return a - b;
    case '*':
    case 'x':
    case 'multiply':
      return a * b;
    case '/':
    case 'divide':
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    default:
      throw new Error('Unknown operation: ' + op);
  }
}

function tryRunFromArgs(argv) {
  // argv: node, script, op, a, b
  if (argv.length < 5) return false;
  const op = argv[2];
  const a = Number(argv[3]);
  const b = Number(argv[4]);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: operands must be numbers.');
    printUsage();
    process.exit(2);
  }
  try {
    const result = compute(op, a, b);
    console.log(result);
    return true;
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(3);
  }
}

function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter operation (e.g. +, -, *, /, add, subtract, multiply, divide): ', (op) => {
    rl.question('Enter first number: ', (aStr) => {
      rl.question('Enter second number: ', (bStr) => {
        const a = Number(aStr);
        const b = Number(bStr);
        if (Number.isNaN(a) || Number.isNaN(b)) {
          console.error('Operands must be valid numbers.');
          rl.close();
          process.exit(2);
        }
        try {
          const result = compute(op, a, b);
          console.log('Result:', result);
        } catch (err) {
          console.error('Error:', err.message);
          process.exit(3);
        }
        rl.close();
      });
    });
  });
}

// Try to run from CLI args first; otherwise fall back to interactive prompt
if (!tryRunFromArgs(process.argv)) {
  interactiveMode();
}
