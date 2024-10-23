// RuleForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, List, ListItem, ListItemText, IconButton, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const RuleForm = () => {
  const [ruleString, setRuleString] = useState('');
  const [rules, setRules] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editRuleId, setEditRuleId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteRuleId, setDeleteRuleId] = useState(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rules');
        setRules(response.data);
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    };
    fetchRules();
  }, []);

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
  };

  const createNewRule = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/rules/create', { ruleString });
      setRules([...rules, response.data]);
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
      await axios.delete(`http://localhost:5000/api/rules/delete/${deleteRuleId}`);
      setRules(rules.filter((rule) => rule._id !== deleteRuleId));
      handleCloseDialog();
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
      const response = await axios.put(`http://localhost:5000/api/rules/update/${editRuleId}`, { ruleString });
      setRules(rules.map((rule) => (rule._id === editRuleId ? response.data.rule : rule)));
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
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
