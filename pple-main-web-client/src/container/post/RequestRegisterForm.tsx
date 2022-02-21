import React, { useState } from 'react';
import RequestRegister from '../../components/request/register/RequestRegister';
import { customAxios } from '../../lib/customAxios';
import { getCookie } from '../../lib/hooks/CookieUtil';
import { useNavigate } from 'react-router-dom';

export type RequestState = {
  bloodProduct: string;
  content: string;
  abo: string;
  rh: string;
  first: string;
  second: string;
  third: string;
  title: string;
};

const RequestRegisterForm: React.FC = () => {
  // Submit 에서 사용
  const jwt = getCookie();
  const navigate = useNavigate();

  const [post, setPost] = useState<RequestState>({
    bloodProduct: '',
    content: '',
    abo: 'A',
    rh: 'POSITIVE',
    first: '',
    second: '',
    third: '',
    title: '',
  });

  const onChange = (e: { target: HTMLInputElement | HTMLButtonElement }) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleRh = () => {
    if (post.rh == 'POSITIVE') {
      setPost({
        ...post,
        rh: 'NEGATIVE',
      });
      return;
    }
    setPost({
      ...post,
      rh: 'POSITIVE',
    });
  };

  const handleBloodType = (e: {
    target: HTMLInputElement | HTMLButtonElement;
  }) => {
    const { ariaLabel, value } = e.target;
    setPost({
      ...post,
      [ariaLabel]: value,
    });
  };

  // 핸드폰 정보
  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // 숫자만 입력 받기
    const onlyNumber = value.replace(/[^0-9]/g, '');
    // 첫 번째 자리
    if (name === 'first') {
      if (onlyNumber.length <= 3) {
        setPost({
          ...post,
          [name]: onlyNumber,
        });
      }
      return;
    }
    // 두 번째 자리
    else if (name === 'second') {
      if (onlyNumber.length <= 4) {
        setPost({
          ...post,
          [name]: onlyNumber,
        });
      }
    }
    // 세 번쨰 자리
    else {
      if (onlyNumber.length <= 4) {
        setPost({
          ...post,
          [name]: onlyNumber,
        });
      }
    }
  };

  const handleBloodProduction = async (
    e: React.ChangeEvent<HTMLButtonElement>,
  ) => {
    const { value } = e.target;
    setPost({
      ...post,
      bloodProduct: value,
    });
    console.log(post.bloodProduct);
    return;
  };

  const isFiledPatientInfo = () => {
    if (
      post.first == '' ||
      post.second == '' ||
      post.third == '' ||
      post.title == '' ||
      post.abo == '' ||
      post.content == '' ||
      post.bloodProduct == ''
    ) {
      return false;
    }
    return true;
  };

  const setRequestBody = () => {
    if (isFiledPatientInfo()) {
      return {
        bloodProduct: post.bloodProduct,
        content: post.content,
        patient: {
          blood: {
            abo: post.abo,
            rh: post.rh,
          },
        },
        phoneNumber: post.first + post.second + post.third,
        title: post.title,
      };
    }
    return undefined;
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const body = setRequestBody();
    if (!body) {
      alert('모든 정보를 입력해주세요');
      return;
    }
    customAxios
      .post('/api/v1/donation', body, {
        headers: { 'X-AUTH-TOKEN': `${jwt}` },
      })
      .then(() => {
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <RequestRegister
          post={post}
          onChange={onChange}
          handleRh={handleRh}
          handleBloodType={handleBloodType}
          handlePhoneNumber={handlePhoneNumber}
          handleBloodProduction={handleBloodProduction}
        />
      </form>
    </>
  );
};

export default RequestRegisterForm;
