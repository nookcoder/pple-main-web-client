import React, { useState } from 'react';
import ChannelTalk from '../components/common/buttons/ChannelTalk';
import MyPageHeader from '../components/mypage/MyPageHeader';
import MyPageList from '../components/mypage/MyPageList';
import MyPageTemplate from '../components/mypage/MyPageTemplate';
import ProfileForm from '../container/my-page/ProfileForm';
const MyPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(!open);
  };

  return (
    <MyPageTemplate>
      <ChannelTalk />
      <MyPageHeader />
      <ProfileForm />
      <MyPageList />
    </MyPageTemplate>
  );
};

export default MyPage;
