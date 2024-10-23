import mongoose from 'mongoose';

// Define node schema
const nodeSchema = new mongoose.Schema({
  type: { type: String, required: true },  // Type of node (e.g., BinaryExpression, Literal, etc.)
  value: { type: String, default: null },  // Value for the node if applicable
  left: { type: mongoose.Schema.Types.Mixed, default: null },  // Left child node (can be another node or null)
  right: { type: mongoose.Schema.Types.Mixed, default: null },  // Right child node (can be another node or null)
});

// Define rule schema
const ruleSchema = new mongoose.Schema({
  ruleName: { type: String, required: true },  // Name or representation of the rule as a string
  rootNode: { type: nodeSchema, required: true },  // The root node of the AST for the rule
});

// Export the Rule model
export const Rule = mongoose.model('Rule', ruleSchema);
