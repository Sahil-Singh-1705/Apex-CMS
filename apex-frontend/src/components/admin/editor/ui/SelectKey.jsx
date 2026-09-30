import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { Typography, TextField,Button} from "@mui/material";

const CustomChipInput = () => {
  const [personName, setPersonName] = useState([]);
  const [customValue, setCustomValue] = useState('');

  const handleCustomInputChange = (event) => {
    setCustomValue(event.target.value);
  };

  const handleAddCustomValue = () => {
    if (customValue.trim() !== '' && !personName.includes(customValue)) {
      setPersonName([...personName, customValue]);
      setCustomValue('');
    }
  };

  const handleRemoveChip = (valueToRemove) => {
    const updatedPersonName = personName.filter((value) => value !== valueToRemove);
    setPersonName(updatedPersonName);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography marginBottom={"5px"}>Keywords</Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          value={customValue}
          onChange={handleCustomInputChange}
          size='medium'
          sx={{
            width: "50%",
            "& input": {
              padding: "21px",
            },
          }}
          variant="outlined"
        />
         <Button variant='contained' onClick={handleAddCustomValue}>
          Add
        </Button>
      
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, marginTop: 2 }}>
        {personName.map((value) => (
          <Chip
            key={value}
            label={value}
             color="info"
        
             size="medium"
             variant="elevated"
            onDelete={() => handleRemoveChip(value)}
          />
        ))}
      </Box>
    </div>
  );
};

CustomChipInput.propTypes = {
  // Add prop types if needed
};

export default CustomChipInput;
