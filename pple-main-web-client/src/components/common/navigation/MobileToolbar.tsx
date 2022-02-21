import React, { MouseEventHandler } from 'react';
import { IconButton, styled } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Chat from '../../../static/images/mobile-gnb/Chat.png';
import Edit from '../../../static/images/mobile-gnb/Edit.svg';
import Search from '../../../static/images/mobile-gnb/Search.png';
import { useNavigate } from 'react-router-dom';
import palette from '../../../lib/styles/palette';

const MobileGNBBlock = styled('div')({
  padding: '0.2rem',
  display: 'flex',
  alignItems: 'center',
  background: `linear-gradient(109.4deg, #FF6969 -3.19%, #FF3333 109.95%);`,
  fontWeight: 'bold',
  '& .title': {
    width: '80%',
    textAlign: 'center',
  },
});

interface Props {
  isBack?: boolean;
  title: string;
  isSearch?: boolean;
  isWrite?: boolean;
  isChat?: boolean;
}

const MobileToolbar: React.FC<Props> = ({
  isBack,
  title,
  isSearch,
  isWrite,
  isChat,
}) => {
  const navigate = useNavigate();
  const handleBack: MouseEventHandler = () => {
    navigate(-1);
  };
  const goPostRegister: MouseEventHandler = () => {
    navigate('/post/register');
  };
  return (
    <MobileGNBBlock>
      {isBack ? (
        <IconButton
          className="back-icon"
          sx={{ color: 'white' }}
          onClick={handleBack}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      ) : (
        <div></div>
      )}
      <div className="title" style={{ color: 'white', fontWeight: 'bold' }}>
        {title}
      </div>
      {isSearch ? (
        <IconButton className="search-icon" onClick={goPostRegister}>
          <img src={Search} alt="검색" />
        </IconButton>
      ) : (
        <div></div>
      )}
      {isWrite ? (
        <IconButton onClick={goPostRegister}>
          <img src={Edit} alt="검색" />
        </IconButton>
      ) : (
        <div></div>
      )}
      {isChat ? (
        <IconButton onClick={goPostRegister}>
          <img src={Chat} alt="검색" />
        </IconButton>
      ) : (
        <div></div>
      )}
    </MobileGNBBlock>
  );
};

export default MobileToolbar;
