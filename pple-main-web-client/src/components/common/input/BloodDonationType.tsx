import React, { useEffect, useState } from 'react';
import Label from '../Label';
import { ToggleButton, styled } from '@mui/material';
import palette from '../../../lib/styles/palette';

const BloodDonationTypeBlock = styled('div')({
  '& .MuiButtonBase-root': {
    background: '#f9f9f9',
    border: '1px solid #EDEDED',
    borderRadius: '10px',
    color: '#B7B7B7',
    marginTop: '8px',
  },
  '& .button-group': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
const StyleToggleButton = styled(ToggleButton)({
  '&.Mui-selected': {
    background: `${palette.red[1]} !important`,
    color: 'white !important',
  },
});

interface IBloodProduct {
  handleBloodProduction: any;
  currentBloodProduct?: string;
}

const BloodDonationType: React.FC<IBloodProduct> = ({
  handleBloodProduction,
  currentBloodProduct,
}) => {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const [selected4, setSelected4] = useState(false);
  const [selected5, setSelected5] = useState(false);

  const setSelectedByCurrentBloodProduct = (currentBloodProduct: string) => {
    switch (currentBloodProduct) {
      case 'WHOLE':
        setSelected1(true);
        break;
      case 'PLATELET':
        setSelected2(true);
        break;
      case 'LEUKOCYTE':
        setSelected3(true);
        break;
      case 'PACKED_RED_BLOOD_CELL':
        setSelected4(true);
        break;
      case 'LEUKOCYTE_REDUCED_RED_BLOOD_CELL':
        setSelected5(true);
        break;
      default:
        break;
    }
  };

  const resetSelected = () => {
    setSelected1(false);
    setSelected2(false);
    setSelected3(false);
    setSelected4(false);
    setSelected5(false);
  };

  const handleSelect =
    (
      selected: boolean,
      setSelect: React.Dispatch<React.SetStateAction<boolean>>,
    ) =>
    (e: React.ChangeEvent<HTMLButtonElement>) => {
      resetSelected();
      setSelect(!selected);
      handleBloodProduction(e);
    };

  useEffect(() => {
    if (currentBloodProduct != '') {
      setSelectedByCurrentBloodProduct(currentBloodProduct);
    }
  });

  return (
    <BloodDonationTypeBlock>
      <Label>헌혈 종류*</Label>
      <StyleToggleButton
        sx={{ background: selected1 ? '#FF6969' : 'gray' }}
        fullWidth
        value="WHOLE"
        selected={selected1}
        onChange={handleSelect(selected1, setSelected1)}
        name="전혈"
      >
        전혈
      </StyleToggleButton>
      <div className="button-group">
        <StyleToggleButton
          sx={{ width: '48%' }}
          value="PLATELET"
          selected={selected2}
          onChange={handleSelect(selected2, setSelected2)}
        >
          성분채혈 혈소판
        </StyleToggleButton>
        <StyleToggleButton
          sx={{ width: '48%' }}
          value="LEUKOCYTE"
          selected={selected3}
          onChange={handleSelect(selected3, setSelected3)}
        >
          성분채혈 백혈구
        </StyleToggleButton>
      </div>
      <div className="button-group">
        <StyleToggleButton
          sx={{ width: '48%' }}
          value="PACKED_RED_BLOOD_CELL"
          selected={selected4}
          onChange={handleSelect(selected4, setSelected4)}
        >
          농축적혈구
        </StyleToggleButton>
        <StyleToggleButton
          sx={{ width: '48%' }}
          value="LEUKOCYTE_REDUCED_RED_BLOOD_CELL"
          selected={selected5}
          onChange={handleSelect(selected5, setSelected5)}
        >
          백혈구여과재거적혈구
        </StyleToggleButton>
      </div>
    </BloodDonationTypeBlock>
  );
};

export default BloodDonationType;
