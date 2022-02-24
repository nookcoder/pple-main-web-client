import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModifyProfile from '../../components/mypage/ModifyProfile';
import { customAxios } from '../../lib/customAxios';
import { getCookie, getUuid } from '../../lib/hooks/CookieUtil';
import { RootState } from '../../models';
import { setUuid } from '../../models/auth/account';

const ModifyProfileForm = () => {
  const [displayName, setDisplayName] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const uuid = useSelector((state: RootState) => state.account.uuid);
  const jwt = getCookie();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    customAxios
      .get('/api/v1/account/profile', {
        headers: { 'X-AUTH-TOKEN': `${jwt}` },
      })
      .then(res => {
        if (uuid == '' || uuid == null) {
          dispatch(setUuid(res.data.uuid));
        }
        setDisplayName(res.data.displayName);
        setProfileImageUrl(res.data.profileImageUrl);
      })
      .catch(() => {
        console.log('ERROR');
      });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setDisplayName(value);
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    const body = {
      displayName: displayName,
    };
    // 닉네임 변경
    console.log(`/api/v1/account/${uuid}`);
    customAxios
      .patch(`/api/v1/account/${uuid}`, body, {
        headers: { 'X-AUTH-TOKEN': `${jwt}` },
      })
      .then(res => {
        console.log(uuid);
        console.log(res);
        navigate('/page');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <ModifyProfile
          profileImageUrl={profileImageUrl}
          displayName={displayName}
          onChange={onChange}
        />
      </form>
    </>
  );
};

export default ModifyProfileForm;
