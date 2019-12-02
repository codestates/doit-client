import React, { useCallback } from 'react';
import { Row, Col, Avatar, Card, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, [dispatch]);

  return (
    <Row className="profile" type="flex" justify="space-between" align="middle">
      <Col xs={15}>
        <Card>
          <Card.Meta
            avatar={<Avatar>{me.nickname[0]}</Avatar>}
            title={me.nickname}
          />
        </Card>
      </Col>
      <Col xs={8}>
        <Button
          className="btn-logout"
          type="danger"
          onClick={onLogout}
        >
          Logout
        </Button>
      </Col>
      <style jsx global>{`
        .profile {
          width: 100%;
        }
        .profile .ant-card {
          border-radius: 4px;
        }
        .profile .ant-card-body {
          padding: 21px;
        }
        .btn-logout {
          height: 73px;
          margin: 5px 0;
        }

      `}</style>
    </Row>
  );
};

export default UserProfile;
