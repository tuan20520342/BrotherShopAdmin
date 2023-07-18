import React, { useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';
import EditStaffForm from '~/components/Staffs/EditStaffForm';
import NotFoundPage from './NotFound';
import { role } from '~/util/constants';
import NotAllowPage from './NotAllowPage';

const { Title } = Typography;

const EditStaffPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.authenticationSlice);
  useEffect(() => {
    if (currentUser?.role?.name === role.MANAGER) dispatch({ type: SagaActionTypes.GET_STAFF_BY_ID_SAGA, id: id });
  }, [dispatch, id, currentUser]);
  const { idLoading, staffById } = useSelector((state) => state.staffSlice);

  if (currentUser?.role?.name === role.STAFF) {
    return <NotAllowPage />;
  } else {
    if (idLoading) {
      return <LoadingSpin />;
    } else {
      if (staffById?._id === -1) {
        return <NotFoundPage />;
      }
      return (
        <Row>
          <Col span={24}>
            <Title level={2}>{`Nhân viên: ${staffById.name}`}</Title>
          </Col>
          <Col span={24}>
            <EditStaffForm />
          </Col>
        </Row>
      );
    }
  }
};

export default EditStaffPage;
