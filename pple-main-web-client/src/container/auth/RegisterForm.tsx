import React, { useState } from 'react';
import MRegisterBody from '../../components/auth/register/MRegisterBody';
import produce from 'immer';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import { customAxios } from '../../lib/customAxios';
import { getCookie } from '../../lib/hooks/CookieUtil';
import { useNavigate } from 'react-router-dom';

// 회원 정보 관련 인터페이스
interface IUser {
  nickname: string;
  year: string;
  month: string;
  day: string;
  gender: string;
  rh: string;
  abo: string;
  phone: {
    first: string;
    second: string;
    third: string;
  };
  phoneNumber: string;
}

const RegisterForm = () => {
  const uuid = useSelector((state: RootState) => state.account.uuid);
  const jwt = getCookie();
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({
    nickname: '',
    year: '',
    month: '',
    day: '',
    gender: '',
    rh: 'POSITIVE',
    abo: 'A',
    phone: {
      first: '',
      second: '',
      third: '',
    },
    phoneNumber: '',
  });
  const [privacy, setPrivate] = React.useState(false);
  const [term, setTerm] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);
  const [all, setAll] = React.useState(false);

  const handleAll = () => {
    setAll(!all);
    setPrivate(!all);
    setTerm(!all);
    setMarketing(!all);
  };
  const handlePrivacy = () => {
    setPrivate(!privacy);
  };
  const handleTerm = () => {
    setTerm(!term);
  };
  const handleMarketing = () => {
    setMarketing(!marketing);
  };

  const onChange = (e: { target: HTMLInputElement | HTMLButtonElement }) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleBirthDay = (e: {
    target: HTMLInputElement | HTMLButtonElement;
  }) => {
    const { name, value } = e.target;
    if (parseInt(value) < 10) {
      setUser({
        ...user,
        [name]: `0${value}`,
      });
      return;
    }
    setUser({
      ...user,
      [name]: value,
    });
  };
  // 핸드폰 정보
  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // 숫자만 입력 받기
    const onlyNumber = value.replace(/[^0-9]/g, '');
    const nextState = produce(user, draftState => {
      // 첫 번째 자리
      if (name === 'first') {
        if (onlyNumber.length <= 3) {
          draftState.phone.first = onlyNumber;
        }
        return;
      }
      // 두 번째 자리
      else if (name === 'second') {
        if (onlyNumber.length <= 4) {
          draftState.phone.second = onlyNumber;
        }
      }
      // 세 번쨰 자리
      else {
        if (onlyNumber.length <= 4) {
          draftState.phone.third = onlyNumber;
        }
      }
    });
    setUser(nextState);
  };

  const handleBloodType = (e: {
    target: HTMLInputElement | HTMLButtonElement;
  }) => {
    const { ariaLabel, value } = e.target;
    setUser({
      ...user,
      [ariaLabel]: value,
    });
  };

  const handleRh = (e: { target: HTMLButtonElement }) => {
    if (user.rh == 'POSITIVE') {
      setUser({
        ...user,
        rh: 'NEGATIVE',
      });
      return;
    }
    setUser({
      ...user,
      rh: 'POSITIVE',
    });
  };
  const isFilledUserInfo = () => {
    if (
      user.year == '' ||
      user.month == '' ||
      user.day == '' ||
      user.abo == '' ||
      user.gender == '' ||
      user.phone.first == '' ||
      user.phone.second == '' ||
      user.phone.third == ''
    )
      return false;
    return true;
  };
  const setRegisterBody = () => {
    if (isFilledUserInfo) {
      const body = {
        uuid: uuid,
        displayName: user.nickname,
        birthDay: `${user.year}-${user.month}-${user.day}`,
        gender: user.gender,
        phoneNumber: user.phone.first + user.phone.second + user.phone.third,
        blood: {
          rh: user.rh,
          abo: user.abo,
        },
      };
      return body;
    }
    return false;
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (privacy == false || term == false) {
      alert('필수항목에 동의해주세요');
      return;
    }
    const body = setRegisterBody();
    if (body == false) {
      alert('모든 정보를 입력해주세요');
      return;
    }

    customAxios
      .patch('/api/v1/account', body, {
        headers: { 'X-AUTH-TOKEN': `${jwt}` },
      })
      .then(() => {
        console.log('success');
        navigate('/');
      })
      .catch(e => {
        console.log('ERROR');
        console.log(e);
      });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <MRegisterBody
          user={user}
          onChange={onChange}
          handlePhoneNumber={handlePhoneNumber}
          handleBloodType={handleBloodType}
          handleRh={handleRh}
          handleBirthDay={handleBirthDay}
          all={all}
          privacy={privacy}
          term={term}
          marketing={marketing}
          handleAll={handleAll}
          handlePrivacy={handlePrivacy}
          handleTerm={handleTerm}
          handleMarketing={handleMarketing}
        />
      </form>
    </>
  );
};

export default RegisterForm;
