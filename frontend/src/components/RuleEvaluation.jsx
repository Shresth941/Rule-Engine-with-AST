import React, { useState, useEffect } from 'react';
import { 
  TextField, Button, Box, Snackbar, Alert, 
  MenuItem, Card, CardContent, Typography, Grid, Paper, CircularProgress 
} from '@mui/material';
import { Rule, CheckCircle, Error } from '@mui/icons-material';
import axios from 'axios';

const EvaluationForm = ({ rules }) => {
  const [selectedRule, setSelectedRule] = useState('');
  const [userData, setUserData] = useState({ age: '', department: '', salary: '', experience: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [validRules, setValidRules] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (rules && Array.isArray(rules)) {
      const filteredRules = rules.filter(rule => rule.rootNode); // Filter only valid rules
      setValidRules(filteredRules);
    }
  }, [rules]);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!selectedRule) {
      setMessage('Please select a valid rule to evaluate.');
      setSuccess(false);
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://rule-engine-with-ast-2-myl2.onrender.com/api/rules/evaluate', {
        ast: selectedRule.rootNode,
        userData,
      });

      const resultMessage = response.data.result
        ? 'User matches the rule.'
        : 'User does not match the rule.';
      setMessage(resultMessage);
      setSuccess(response.data.result);
      setEvaluationResult(response.data.result);
    } catch (error) {
      setMessage('Failed to evaluate the rule.');
      setSuccess(false);
      setEvaluationResult(null);
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Paper 
      elevation={3} 
      sx={{ p: 4, maxWidth: 600, margin: 'auto', mt: 6, borderRadius: 2 }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Evaluate User Against Rules
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            select
            label="Select Rule"
            value={selectedRule}
            onChange={(e) => setSelectedRule(e.target.value)}
            fullWidth
            variant="outlined"
            helperText="Please choose a rule to evaluate"
            InputProps={{
              startAdornment: <Rule sx={{ mr: 1 }} />,
            }}
          >
            {validRules.map((rule) => (
              <MenuItem key={rule._id} value={rule}>
                {rule.ruleName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Age"
            name="age"
            value={userData.age}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            type="number"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Salary"
            name="salary"
            value={userData.salary}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            type="number"
          />
        </Grid>

        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="success" 
            onClick={handleSubmit} 
            fullWidth 
            startIcon={loading ? <CircularProgress size={20} /> : null}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Evaluating...' : 'Evaluate Rule'}
          </Button>
        </Grid>
      </Grid>

      {evaluationResult !== null && (
        <Card 
          sx={{ mt: 4, bgcolor: success ? 'white.light' : 'error.light' }}
        >
          <CardContent>
            <Typography 
              variant="h6" 
              color={success ? 'white.main' : 'error.main'} 
              align="center"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {success ? <CheckCircle sx={{ mr: 1 }} /> : <Error sx={{ mr: 1 }} />}
              {message}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={success ? 'success' : 'error'} 
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default EvaluationForm;
