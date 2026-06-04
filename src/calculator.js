#!/usr/bin/env node
// Node.js CLI Calculator
// Supported operations:
// - addition (+, add)
// - subtraction (-, subtract)
// - multiplication (*, x, multiply)
// - division (/, divide)
// - modulo (%, mod)
// - power (^, pow)
// - square root (sqrt)

const readline = require('readline');

function printUsage() {
  console.log('Usage:');
  console.log('  node src/calculator.js <op> <a> [b]');
  console.log('  where <op> is one of: + - * / add subtract multiply divide x % mod ^ pow sqrt');
  console.log('Examples:');
  console.log('  node src/calculator.js + 2 3');
  console.log('  node src/calculator.js multiply 4 5');
  console.log('  node src/calculator.js % 10 3');
  console.log('  node src/calculator.js pow 2 8');
  console.log('  node src/calculator.js sqrt 9');
}

function modulo(a, b) {
  if (b === 0) throw new Error('Modulo by zero');
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) throw new Error('Cannot compute square root of negative number');
  return Math.sqrt(n);
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
    case '%':
    case 'mod':
      return modulo(a, b);
    case '^':
    case 'pow':
      return power(a, b);
    case 'sqrt':
      return squareRoot(a);
    default:
      throw new Error('Unknown operation: ' + op);
  }
}

function tryRunFromArgs(argv) {
  // argv: node, script, op, a, [b]
  // sqrt only needs 1 operand, other operations need 2
  const isUnaryOp = argv[2] === 'sqrt';
  const minArgs = isUnaryOp ? 4 : 5;
  
  if (argv.length < minArgs) return false;
  
  const op = argv[2];
  const a = Number(argv[3]);
  
  if (Number.isNaN(a)) {
    console.error('Error: operands must be numbers.');
    printUsage();
    process.exit(2);
  }
  
  if (!isUnaryOp) {
    const b = Number(argv[4]);
    if (Number.isNaN(b)) {
      console.error('Error: operands must be numbers.');
      printUsage();
      process.exit(2);
    }
  }
  
  try {
    const b = isUnaryOp ? undefined : Number(argv[4]);
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
// Only execute CLI behavior when run directly. This avoids running interactive
// prompts when required by tests.
if (require.main === module) {
  if (!tryRunFromArgs(process.argv)) {
    interactiveMode();
  }
}

// Export compute and helper functions for unit tests
module.exports = { compute, modulo, power, squareRoot };

