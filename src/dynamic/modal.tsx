import type { StepOneData, StepThreeData } from '@/utils/types';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ModalComponentProps {
  show: boolean;
  onHide: () => void;
  userForm: StepOneData;
  loanData: StepThreeData;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  show,
  onHide,
  userForm,
  loanData
}) => {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Результат заявки</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center py-4">
        <p className="fs-5">
          Поздравляем,
          <span className="text-primary fw-bold"> {userForm.lastName} {userForm.firstName}</span>!
        </p>
        <p className="mb-0">
          Вам одобрена сумма
          <span className="text-success fw-bold"> {loanData.loanAmount}$</span> на
          <span className="text-info fw-bold"> {loanData.loanDays}</span> дней.
        </p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={onHide} className="px-5">
          Отлично
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
