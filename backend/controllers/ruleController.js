import { Rule } from '../models/rule.js';
import { parseRule, combineASTs, evaluateAST } from '../services/ruleService.js';

// Validate the rule format to support strings and numeric values
const isValidRule = (ruleString) => {
  const validFormat = /^(\w+)([<>=]+)([\w\s]+)(\s+(AND|OR)\s+(\w+)([<>=]+)([\w\s]+))*$/;
  return validFormat.test(ruleString);
};

// Create a new rule
export const createRule = async (req, res) => {
  const { ruleString } = req.body;
  console.log(ruleString);
  

  if (!ruleString || ruleString.trim() === "" || !isValidRule(ruleString)) {
    return res.status(400).json({ error: 'Invalid rule format. Use expressions like "age>30", "department=HR" or "salary=5000".' });
  }

  try {
    const parsedAST = parseRule(ruleString);
    if (!parsedAST) {
      return res.status(400).json({ error: 'Failed to parse rule string.' });
    }

    const newRule = new Rule({ ruleName: ruleString, rootNode: parsedAST });
    await newRule.save();

    res.status(201).json({ message: 'Rule created successfully', ast: parsedAST });
  } catch (error) {
    console.error('Error creating rule:', error);
    res.status(500).json({ error: 'Failed to create rule' });
  }
};

// Combine rules
export const combineRules = async (req, res) => {
  const { rules } = req.body;

  try {
    const combinedAST = combineASTs(rules);

    const combinedRuleString = `${rules[0].ruleName} ${rules[0].operator} ${rules[1].ruleName}`;
    const newCombinedRule = new Rule({ ruleName: combinedRuleString, rootNode: combinedAST });

    await newCombinedRule.save();

    res.json({ message: 'Rules combined and saved successfully', rule: newCombinedRule });
  } catch (error) {
    console.error('Error combining rules:', error);
    res.status(500).json({ error: 'Failed to combine and save rules' });
  }
};

// Evaluate a rule
export const evaluateRule = (req, res) => {
  const { ast, userData } = req.body;

  try {
    const sanitizedData = {
      age: userData.age || undefined,
      salary: userData.salary || undefined,
    };

    const result = evaluateAST(ast, sanitizedData);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to evaluate rule' });
  }
};

// Get all rules
export const getAllRules = async (req, res) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rules' });
  }
};

// Update a rule
export const updateRule = async (req, res) => {
  const { id } = req.params;
  const { ruleString } = req.body;

  if (!isValidRule(ruleString)) {
    return res.status(400).json({ error: 'Invalid rule format.' });
  }

  try {
    const updatedRule = await Rule.findByIdAndUpdate(id, { ruleName: ruleString }, { new: true });
    res.json({ message: 'Rule updated successfully', rule: updatedRule });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update rule' });
  }
};

// Delete a rule
export const deleteRule = async (req, res) => {
  const { id } = req.params;

  try {
    await Rule.findByIdAndDelete(id);
    res.json({ message: 'Rule deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete rule' });
  }
};
