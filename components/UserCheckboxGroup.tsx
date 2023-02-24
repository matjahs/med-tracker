import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function UserCheckboxGroup() {
  const [state, setState] = React.useState({
    user1: true,
    user2: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { user1, user2 } = state;
  const error = [user1, user2].filter((v) => v).length !== 2;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={user1} onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={user2} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Pick two</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={user1} onChange={handleChange} name="gilad" />
            }
            label="User 1"
          />
          <FormControlLabel
            control={
              <Checkbox checked={user2} onChange={handleChange} name="jason" />
            }
            label="User 2"
          />
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
      </FormControl>
    </Box>
  );
}
