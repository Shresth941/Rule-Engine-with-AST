import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Grid, Paper, Divider } from '@mui/material';
import axios from 'axios';

const CombineForm = ({ rules }) => {
  const [selectedRule1, setSelectedRule1] = useState('');
  const [selectedRule2, setSelectedRule2] = useState('');
  const [operator, setOperator] = useState('');
  const [message, setMessage] = useState('');

  const handleCombine = async (e) => {
    e.preventDefault();

    const rule1 = rules.find((rule) => rule.ruleName === selectedRule1)?.ruleName;
    const rule2 = rules.find((rule) => rule.ruleName === selectedRule2)?.ruleName;

    if (!rule1 || !rule2 || !operator) {
      setMessage('Please select both rules and an operator');
      return;
    }

    const combinedRuleString = `${rule1} ${operator} ${rule2}`;

    try {
      const response = await axios.post('https://rule-engine-with-ast-2-myl2.onrender.com/api/rules/create', {
        ruleString: combinedRuleString,
      });
      setMessage(`Rules combined and submitted: ${response.data.message}`);
    } catch (error) {
      console.error('Failed to combine rules:', error);
      setMessage('Failed to combine and submit rules');
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 600,
        margin: 'auto',
        p: 4,
        mt: 5,
        borderRadius: 3,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Combine Rules
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <form onSubmit={handleCombine}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              select
              label="Select First Rule"
              value={selectedRule1}
              onChange={(e) => setSelectedRule1(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            >
              <MenuItem value="">
                <em>Select Option</em>
              </MenuItem>
              {rules.map((rule) => (
                <MenuItem key={rule._id} value={rule.ruleName}>
                  {rule.ruleName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              label="Select Second Rule"
              value={selectedRule2}
              onChange={(e) => setSelectedRule2(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            >
              <MenuItem value="">
                <em>Select Option</em>
              </MenuItem>
              {rules.map((rule) => (
                <MenuItem key={rule._id} value={rule.ruleName}>
                  {rule.ruleName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              label="Operator"
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            >
              <MenuItem value="">
                <em>Select Option</em>
              </MenuItem>
              <MenuItem value="AND">AND</MenuItem>
              <MenuItem value="OR">OR</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="success" fullWidth>
              Combine Rules
            </Button>
          </Grid>
        </Grid>
      </form>

      {message && (
        <Typography
          variant="body1"
          align="center"
          sx={{ mt: 3, color: message.includes('Failed') ? 'error.main' : 'success.main' }}
        >
          {message}
        </Typography>
      )}
    </Paper>
  );
};

export default CombineForm;
