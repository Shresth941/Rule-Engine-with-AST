// Updated routes/rules.js
import express from 'express';
import { createRule, combineRules, evaluateRule, getAllRules, updateRule, deleteRule } from '../controllers/ruleController.js';

const router = express.Router();

router.post('/create', createRule);
router.post('/combine', combineRules);
router.post('/evaluate', evaluateRule);
router.get('/', getAllRules);
router.put('/update/:id', updateRule); 
router.delete('/delete/:id', deleteRule); 

export default router;
