// Parse the rule string into an Abstract Syntax Tree (AST)
export const parseRule = (ruleString) => {
  const simpleRegex = /^(\w+)([<>=]+)(\d+)$/;
  const operatorRegex = /\s+(AND|OR)\s+/;

  const parts = ruleString.split(operatorRegex);
  console.log('Rule Parts:', parts);

  if (parts.length === 1) {
    const match = ruleString.match(simpleRegex);
    if (match) {
      const [_, field, operator, value] = match;
      return { type: 'condition', field, operator, value: Number(value) };
    }
  } else if (parts.length === 3) {
    const left = parseRule(parts[0].trim());
    const operator = parts[1].trim();
    const right = parseRule(parts[2].trim());

    return { type: 'operator', operator, left, right };
  }

  throw new Error('Failed to parse rule string');
};

// Evaluate the AST with the provided user data
// Evaluate the AST with the provided user data
export const evaluateAST = (ast, userData) => {
  console.log("Evaluating AST:", ast);
  console.log("User Data:", userData);

  if (ast.type === 'condition') {
    console.log(`Evaluating Condition: ${ast.field} ${ast.operator} ${ast.value}`);
    return evalOperand(ast, userData);
  } else if (ast.type === 'operator') {
    const leftResult = evaluateAST(ast.left, userData);
    const rightResult = evaluateAST(ast.right, userData);

    // Default operator handling if not provided
    const operator = ast.operator ? ast.operator.trim().toUpperCase() : 'AND'; // Fallback to 'AND'
    console.log(`Left: ${leftResult}, Right: ${rightResult}, Operator: ${operator}`);

    // Logical evaluation
    if (operator === 'AND') {
      return leftResult && rightResult;
    } else if (operator === 'OR') {
      return leftResult || rightResult;
    } else {
      console.error('Invalid logical operator:', operator);
      throw new Error('Invalid logical operator');
    }
  }

  console.error('Unexpected AST structure:', ast);
  return false; // Handle unexpected AST structure
};



// Evaluate individual condition
export const evalOperand = (condition, userData) => {
  const { field, operator, value } = condition;
  const userValue = parseFloat(userData[field]);

  console.log(`Comparing: ${userValue} ${operator} ${value}`);

  if (isNaN(userValue) || isNaN(value)) return false;

  switch (operator) {
    case '>':
      return userValue > value;
    case '<':
      return userValue < value;
    case '>=':
      return userValue >= value;
    case '<=':
      return userValue <= value;
    case '=':
      return userValue == value;
    default:
      return false;
  }
};

// Combine multiple ASTs with 'AND'
// Combine multiple ASTs using 'AND' operator
export const combineASTs = (ruleASTs) => {
  if (ruleASTs.length === 0) return null;
  console.log(ruleASTs);
  

  let combinedAST = ruleASTs[0];

  // Combine all ASTs with 'AND'
  for (let i = 1; i < ruleASTs.length; i++) {
    combinedAST = {
      type: 'operator',
      operator: 'AND',
      left: combinedAST,
      right: ruleASTs[i],
    };
  }

  console.log('Combined AST:', combinedAST);
  return combinedAST;
};
