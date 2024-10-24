import React, { useState, useEffect } from 'react';
import { 
  TextField, Button,  Snackbar, Alert, 
  MenuItem, Card, CardContent, Typography, Grid, Paper, CircularProgress 
} from '@mui/material';
import { SvgIcon } from '@mui/material';
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
  const RuleIcon = (props) => (
    <SvgIcon {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M16 13H8v-2h8v2zm0-4H8V7h8v2zm0 8H8v-2h8v2zM6 19h12v2H6zm0-4h2v2H6zm0-4h2v2H6zm0-4h2v2H6zm0-4h2v2H6z" />
    </SvgIcon>
  );
  const CheckCircleIcon = (props) => (
    <SvgIcon {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
    </SvgIcon>
  );
  const ErrorIcon = (props) => (
    <SvgIcon {...props}>
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </SvgIcon>
  );
    
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
              startAdornment: <RuleIcon sx={{ mr: 1 }} />,
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
              {success ? <CheckCircleIcon sx={{ mr: 1 }} /> : <ErrorIcon sx={{ mr: 1 }} />}
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
