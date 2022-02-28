import * as React from 'react';
import { styled } from '@mui/material/styles';
import Label from '../../../common/Label';
import CheckButton from '../../../../static/images/CheckButtonImage.svg';
import CheckedButton from '../../../../static/images/CheckedButtonImage.svg';
import { Divider, IconButton, ToggleButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';

const ButtonBlock = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& span': {
    color: '#767676',
  },
});

interface ITerms {
  all: boolean;
  privacy: boolean;
  term: boolean;
  marketing: boolean;
  handleAll: any;
  handlePrivacy: any;
  handleTerm: any;
  handleMarketing: any;
}

const TermsInput: React.FC<ITerms> = ({
  all,
  privacy,
  term,
  marketing,
  handleAll,
  handlePrivacy,
  handleTerm,
  handleMarketing,
}) => {
  const navigate = useNavigate();
  const navigatePrivacy = () => {
      window.open('https://pple.notion.site/a19608ee13a8436d900262685443c452');
};

  const navigateTerm = () => {
      window.open('https://pple.notion.site/52ab3b73d5f64d5891c9f6723dae7848');  
  };

  const navigateMarketing = () => {
      window.open('https://pple.notion.site/aa6a393366354c6aa884b14a5d07dbc4');
  };
  return (
    <>
      <Label>약관 동의</Label>
      <ButtonBlock>
        <div>
          <IconButton onClick={handleAll}>
            {all ? (
              <img src={CheckedButton} alt="동의" />
            ) : (
              <img src={CheckButton} alt="동의" />
            )}
          </IconButton>
          <span>전체동의</span>
        </div>
      </ButtonBlock>
      <Divider sx={{ color: '#767676', margin: '10px 0px' }} />
      <ButtonBlock>
        <div>
          <IconButton onClick={handlePrivacy}>
            {privacy ? (
              <img src={CheckedButton} alt="동의" />
            ) : (
              <img src={CheckButton} alt="동의" />
            )}
          </IconButton>
          <span>개인정보 취급방침 (필수)</span>
        </div>
        <div>
          <IconButton sx={{ color: '#767676' }} onClick={navigatePrivacy}>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </ButtonBlock>
      <ButtonBlock>
        <div>
          <IconButton onClick={handleTerm}>
            {term ? (
              <img src={CheckedButton} alt="동의" />
            ) : (
              <img src={CheckButton} alt="동의" />
            )}
          </IconButton>
          <span>서비스 이용약관 (필수)</span>
        </div>
        <div>
          <IconButton sx={{ color: '#767676' }} onClick={navigateTerm}>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </ButtonBlock>
      <ButtonBlock>
        <div>
          <IconButton onClick={handleMarketing}>
            {marketing ? (
              <img src={CheckedButton} alt="동의" />
            ) : (
              <img src={CheckButton} alt="동의" />
            )}
          </IconButton>
          <span>마케팅 활용동의(선택)</span>
        </div>
        <div>
          <IconButton sx={{ color: '#767676' }} onClick={navigateMarketing}>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </ButtonBlock>
    </>
  );
};
export default TermsInput;
