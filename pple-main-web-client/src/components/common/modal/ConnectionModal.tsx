import React, { useState } from 'react';
import Modal from 'react-modal';
import { styled, Paper, IconButton, MobileStepper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Phone from '../../../static/images/modal/Phone.svg';
import Capture from '../../../static/images/modal/capture.svg';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import '../../../static/fonts/fonts.css';

const StyledModal = styled(Modal)({
  fontFamily: 'Pretendard',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});
const StyledPaper = styled(Paper)({
  borderRadius: '20px',
});
const CloseBox = styled('div')({
  width: '100%',
  textAlign: 'end',
});
const ImageBox = styled('div')({
  textAlign: 'center',
  marginBottom: '15px',
});
const TitleBox = styled('div')({
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '22px',
  lineHeight: '28px',
  textAlign: 'center',
  color: '#222222',
  marginBottom: '10px',
  padding: '0px 70px',
  '& .capture': {
    fontSize: '20px',
    padding: '0px',
  },
});
const TitleBox2 = styled('div')({
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '28px',
  textAlign: 'center',
  color: '#222222',
  marginBottom: '10px',
});
const ContentBox = styled('div')({
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '150%',
  textAlign: 'center',
  color: '#B7B7B7',
  padding: '0px 38px',
});
const PhoneBox = styled('div')({
  width: '100%',
  textAlign: 'center',
  marginTop: '25px',
  marginBottom: '50px',
});

interface Props {
  open: boolean;
  handleOpen: any;
  phoneNumber: string;
}

const createPhoneNumber = (phoneNumber: string): string => {
  const first = phoneNumber.slice(0, 3);
  const second = phoneNumber.slice(3, 7);
  const third = phoneNumber.slice(7, 11);
  return `${first}-${second}-${third}`;
};

const ConnectionModal: React.FC<Props> = ({
  open,
  handleOpen,
  phoneNumber,
}) => {
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  const onClick = () => {
    handleOpen(open);
  };
  return (
    <>
      <StyledModal isOpen={open}>
        <StyledPaper elevation={1}>
          <CloseBox>
            <IconButton onClick={onClick}>
              <CloseIcon style={{ color: '#C7C7C7' }} />
            </IconButton>
          </CloseBox>

          <Swiper
            style={{ width: '340px' }}
            slidesPerView={1}
            centeredSlides
            pagination={true}
          >
            <SwiperSlide>
              <ImageBox>
                <img src={Phone} alt="수혈자와 연락" width={90} height={90} />
              </ImageBox>

              <TitleBox>
                수혈자와 연락을 통해
                <br />
                헌혈을 진행해보세요
              </TitleBox>
              <ContentBox>
                지정헌혈도움 이외의 대화는
                <br />
                삼가해주세요
              </ContentBox>
              <PhoneBox>{createPhoneNumber(phoneNumber)}</PhoneBox>
            </SwiperSlide>
            <SwiperSlide>
              <ImageBox>
                <img
                  src={Capture}
                  alt="수혈자에게 안내 문자 캡쳐본을 받으세요"
                  width={90}
                  height={90}
                />
              </ImageBox>

              <TitleBox2>
                수혈자에게 수혈자등록번호가 적힌
                <br /> 안내 문자 캡쳐본을 전달받아주세요
              </TitleBox2>
              <ContentBox>
                근처 헌혈의 집 혹은 헌혈카페에 방문해
                <br /> 지정헌혈을 완료해주세요
              </ContentBox>
            </SwiperSlide>
          </Swiper>
        </StyledPaper>
      </StyledModal>
    </>
  );
};

export default ConnectionModal;
