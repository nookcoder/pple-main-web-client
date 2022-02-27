import React, { useEffect, useState } from 'react';
import { styled, Grid, FormControl, Input } from '@mui/material';
import palette from '../../../../lib/styles/palette';
import Label from '../../../common/Label';
import StyleInput from '../../../common/input/StyleInput';
const InputBlock = styled('div')({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'space-between',
  '& .divider': {
    borderBottom: '1px solid #EDEDED',
    height: '28px',
    width: '50px',
    margin: '0px 10px',
  },
});
const HelpText = styled('div')({
  marginBottom: '30px',
  color: 'gray',
  fontSize: 'small',
  lineHeight: '15px',
});

interface IPhone {
  phone: {
    first: string;
    second: string;
    third: string;
  };
  handlePhoneNumber: any;
}

const PhoneInput: React.FC<IPhone> = ({ phone, handlePhoneNumber }) => {
  return (
    <div>
      <Label>휴대폰 번호</Label>
      <InputBlock>
        <StyleInput
          widthValue="30%"
          name="first"
          id="first"
          value={phone.first}
          onChange={handlePhoneNumber}
        ></StyleInput>
        <StyleInput
          widthValue="30%"
          name="second"
          id="second"
          value={phone.second}
          onChange={handlePhoneNumber}
        ></StyleInput>
        <StyleInput
          widthValue="30%"
          name="third"
          id="third"
          value={phone.third}
          onChange={handlePhoneNumber}
        ></StyleInput>
      </InputBlock>
      <HelpText>
        연락처는 수정 불가합니다. 수정이 필요하시다면 <br />
        contact.pple2022@gmail.com 로 연락바랍니다
      </HelpText>
    </div>
  );
};

export default PhoneInput;
