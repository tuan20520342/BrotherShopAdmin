import { Modal } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../redux/reducer/ModalReducer';

const ModalForm = () => {
  const { visible, ComponentContent, title } = useSelector((state) => state.modalSlice);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(modalActions.hideModal());
  };

  return (
    <Modal title={title} open={visible} onCancel={handleCancel} closable={true} footer={null} destroyOnClose={true}>
      {ComponentContent}
    </Modal>
  );
};

export default ModalForm;
