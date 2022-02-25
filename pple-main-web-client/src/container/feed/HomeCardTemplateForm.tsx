import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDonationsOfActiveStatus } from '../../lib/api/donation';
import LoginRequestModal from '../../components/common/modal/LoginRequestModal';
import CardTemplate from '../../components/home/CardTemplate';
import { getCookie } from '../../lib/hooks/CookieUtil';

const HomeCardTemplateForm: React.FC = () => {
  const jwt = getCookie();
  const navigate = useNavigate();
  const [contentArray, setContentArray] = useState([]);
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
  };

  const handleAuth = () => {
    if (jwt == undefined) {
      setOpen(!open);
      return;
    }
    navigate('/post');
  };

  useEffect(() => {
    getDonationsOfActiveStatus()
      .then(res => {
        const newArray = res.data.content;
        setContentArray(newArray);
      })
      .catch(err => {
        console.log(err);
        console.log('ERROR_DONATION');
      });
  }, []);

  return (
    <div>
      <LoginRequestModal open={open} onClick={onClick} />
      <CardTemplate handleAuth={handleAuth} contentArray={contentArray} />
    </div>
  );
};

export default HomeCardTemplateForm;
