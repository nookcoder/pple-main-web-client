import React, { useState } from 'react';
import {
  styled,
  FormControl,
  MenuItem,
  Select,
  InputBase,
} from '@mui/material';
import Label from '../../../common/Label';

const BirthSelectBox = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '25px',
});

const BaseInput = styled(InputBase)({
  '& .MuiInputBase-input': {
    background: '#F9F9F9',
    border: '1px solid #EDEDED',
    borderRadius: '10px',
    padding: '12px 0px 12px 12px',
  },
});

interface IBirth {
  year: string;
  month: string;
  day: string;
}

const Year: Array<number> = [...Array(100).keys()];
const Month: Array<number> = [...Array(12).keys()];
const Day: Array<number> = [...Array(31).keys()];

interface IBirthForm {
  year: string;
  month: string;
  day: string;
  onChange: any;
}

const BirthForm: React.FC<IBirthForm> = ({ year, month, day, onChange }) => {
  return (
    <>
      <Label>생년월일</Label>
      <BirthSelectBox className="form">
        <FormControl
          variant="outlined"
          className="form-birth"
          sx={{ width: '30%' }}
        >
          <Select
            value={year}
            name="year"
            onChange={onChange}
            input={<BaseInput />}
            displayEmpty
            renderValue={select => {
              if (select.length == 0) {
                return <em>연도</em>;
              }
              return select;
            }}
          >
            {Year.map((year, idx) => (
              <MenuItem key={1922 + year} value={1922 + year}>
                {1922 + year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          className="form-birth"
          sx={{ width: '30%' }}
        >
          <Select
            placeholder="월"
            value={month}
            name="month"
            onChange={onChange}
            input={<BaseInput />}
            displayEmpty
            renderValue={select => {
              if (select.length == 0) {
                return <em>월</em>;
              }
              return select;
            }}
          >
            {Month.map((month, idx) => (
              <MenuItem key={month + 1} value={month + 1}>
                {month + 1 < 10 ? `0${month + 1}` : month + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          className="form-birth"
          sx={{ width: '30%' }}
        >
          <Select
            placeholder="일"
            value={day}
            name="day"
            onChange={onChange}
            input={<BaseInput />}
            displayEmpty
            renderValue={select => {
              if (select.length == 0) {
                return <em>일</em>;
              }
              return select;
            }}
          >
            {Day.map((day, idx) => (
              <MenuItem key={day + 1} value={day + 1}>
                {day + 1 < 10 ? `0${day + 1}` : day + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </BirthSelectBox>
    </>
  );
};

export default BirthForm;
