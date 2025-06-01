import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { MenuItem, Select } from '@mui/material';

interface ModalFormProps {
  buttonLabel: string;
  title: string;
  onSubmit: (name: string, category?: string) => void;
  darkMode: boolean;
  categories?: { name: string; color: string }[];
}

export default function ModalForm({
  buttonLabel,
  title,
  onSubmit,
  darkMode,
  categories,
}: ModalFormProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setValue('');
    setSelectedCategory('');
  };


  const handleSubmit = () => {
    if (value.trim() !== '') {
      onSubmit(value.trim(), selectedCategory || undefined);
      handleClose();
    }
  };

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: darkMode ? '#2B2335' : '#B3B3B3',
    border: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius: '16px',
    fontFamily: 'Itim, cursive',
    color: darkMode ? '#EDEDED' : '#674F4A',
  };

  return (
    <div>
      <Button
        className={`!capitalize !font-itim !font-bold !text-[#8E7069] ${darkMode ? "!bg-[#2B2335]" : "!bg-[#B3B3B3]"}`}
        variant="contained"
        onClick={handleOpen}
      >
        {buttonLabel}
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2
            className={`!font-itim !mb-4 !text-xl !text-[#8E7069]`}
          >
            {title}
          </h2>

          <TextField
            fullWidth
            variant="outlined"
            label="Add your tasks or categories"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{
              mb: 2,
              '& label': {
                color: '#674F4A',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#674F4A',
                },
                '& input': {
                  color: '#674F4A',
                },
              },
            }}
          />

          {categories && (
            <>
              <p className='!text-[#8E7069] mb-1'>Select Category</p>
              <Select
                className='w-full !text-[#8E7069] !mb-2 !outline-[#8E7069] !border-[#8E7069]'
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Select Category"
                aria-placeholder='Select Category'
              >
                {categories.map((cat) => (
                  <MenuItem value={cat.name}>{cat.name}</MenuItem>
                ))}
              </Select>
            </>
          )}

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: darkMode ? '#3B3048' : '#B3B3B3',
              color: '#8E7069',
              fontFamily: 'Itim, cursive',
              ':hover': {
                backgroundColor: '#A9827A',
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
