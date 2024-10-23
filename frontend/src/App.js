import React, { useState, useEffect } from 'react';
import RuleForm from './components/RuleForm';
import EvaluationForm from './components/RuleEvaluation';
import CombineForm from './components/RuleCombine';
import { Container, Typography, Box, Button } from '@mui/material';
import axios from 'axios';

const App = () => {
  const [activeForm, setActiveForm] = useState('create');
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/rules');
        setRules(data);
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    };
    fetchRules();
  }, []);

  const renderForm = () => {
    switch (activeForm) {
      case 'evaluate':
        return <EvaluationForm rules={rules} />;
      case 'combine':
        return <CombineForm rules={rules} />;
      default:
        return <RuleForm rules={rules} setRules={setRules} />;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Rule Engine
        </Typography>
        <Button
          variant={activeForm === 'create' ? 'contained' : 'outlined'}
          onClick={() => setActiveForm('create')}
          sx={{ mr: 2 }}
        >
          Create Rule
        </Button>
        <Button
          variant={activeForm === 'evaluate' ? 'contained' : 'outlined'}
          onClick={() => setActiveForm('evaluate')}
          sx={{ mr: 2 }}
        >
          Evaluate Rule
        </Button>
        <Button
          variant={activeForm === 'combine' ? 'contained' : 'outlined'}
          onClick={() => setActiveForm('combine')}
        >
          Combine Rules
        </Button>
      </Box>
      {renderForm()}
    </Container>
  );
};

export default App;
