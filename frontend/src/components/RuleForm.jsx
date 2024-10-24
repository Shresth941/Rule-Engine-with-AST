// RuleForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, List, ListItem, ListItemText, IconButton, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { SvgIcon } from '@mui/material';

const RuleForm = () => {
  const [ruleString, setRuleString] = useState('');
  const [rules, setRules] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editRuleId, setEditRuleId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteRuleId, setDeleteRuleId] = useState(null);

  const EditIcon = (props) => (
    <SvgIcon {...props}>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a1.003 1.003 0 0 0-1.42 0L15 4.34l3.75 3.75 1.96-1.96z" />
    </SvgIcon>
  );
  
  const DeleteIcon = (props) => (
    <SvgIcon {...props}>
      <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1z" />
    </SvgIcon>
  );

  useEffect(() => {
    fetchRules(); // Fetch rules initially when the component loads
  }, []);

  const fetchRules = async () => {
    try {
      const response = await axios.get('https://rule-engine-with-ast-2-myl2.onrender.com/api/rules');
      setRules(response.data);
    } catch (error) {
      console.error('Error fetching rules:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await handleUpdateRule();
    } else {
      await createNewRule();
    }
    setRuleString('');
    setIsEditing(false);
    setEditRuleId(null);
    fetchRules(); // Re-fetch rules after form submission
  };

  const createNewRule = async () => {
    try {
      await axios.post('https://rule-engine-with-ast-2-myl2.onrender.com/api/rules/create', { ruleString });
    } catch (error) {
      console.error('Error creating rule:', error);
    }
  };

  const handleOpenDialog = (id) => {
    setOpenDialog(true);
    setDeleteRuleId(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteRuleId(null);
  };

  const handleDeleteRule = async () => {
    try {
      await axios.delete(`https://rule-engine-with-ast-2-myl2.onrender.com/api/rules/delete/${deleteRuleId}`);
      handleCloseDialog();
      fetchRules(); // Re-fetch rules after deletion
    } catch (error) {
      console.error('Error deleting rule:', error);
    }
  };

  const handleEditRule = (rule) => {
    setIsEditing(true);
    setRuleString(rule.ruleName);
    setEditRuleId(rule._id);
  };

  const handleUpdateRule = async () => {
    try {
      await axios.put(`https://rule-engine-with-ast-2-myl2.onrender.com/api/rules/update/${editRuleId}`, { ruleString });
    } catch (error) {
      console.error('Error updating rule:', error);
    }
  };

  return (
    <Box sx={{ width: '60%', margin: '0 auto', mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {isEditing ? 'Edit Rule' : 'Create Rule'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter rule (e.g., age>30 AND salary=5000)"
            variant="outlined"
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button type="submit" variant="contained" color={isEditing ? 'primary' : 'success'} fullWidth>
            {isEditing ? 'Update Rule' : 'Create Rule'}
          </Button>
        </form>
      </Paper>

      {rules.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Saved Rules
          </Typography>

          <Paper elevation={2}>
            <List>
              {rules.map((rule) => (
                <ListItem
                  key={rule._id}
                  secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditRule(rule)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleOpenDialog(rule._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText primary={rule.ruleName} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this rule?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleDeleteRule} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RuleForm;
