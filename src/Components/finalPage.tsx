import ModalComponent from "@/dynamic/modal";
import useFetch from "@/hooks/useFetch";
import { FormContext, type StepThreeData } from "@/utils/types";
import { base_url } from "@/utils/utils";
import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FinalPage: React.FC = () => {
  const formContext = useContext(FormContext);
  const navigate = useNavigate();

  if (!formContext) {
    throw new Error("FinalPage must be used inside FormProvider");
  }

  const { loanAmount, userForm, formAddress, reset, setLoanAmount } = formContext;
  const { sendRequest, loading } = useFetch(base_url);

  const [errors, setErrors] = useState<{ loanAmount?: string; loanDays?: string }>({});
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleBack = () => navigate("/step2");

  const updateLoan = (key: keyof StepThreeData, value: number) => {
    setLoanAmount((prev: StepThreeData) => ({
      ...prev,
      [key]: value,
    }));
    if (errors[key as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!loanAmount.loanAmount || loanAmount.loanAmount <= 0) {
      newErrors.loanAmount = "Выберите корректную сумму займа";
    }
    if (!loanAmount.loanDays || loanAmount.loanDays <= 0) {
      newErrors.loanDays = "Выберите срок займа";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await sendRequest('/add', {
        method: 'POST',
        body: { ...formAddress, ...userForm, ...loanAmount },
      });
      setShowModal(true);
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
    navigate("/");
  };

  return (
    <>
      <Container className="mt-5 d-flex justify-content-center">
        <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "500px" }}>
          <Card.Body>
            <Card.Title className="mb-4 text-center fw-bold">Параметры займа</Card.Title>
            <Form.Group className="mb-4" controlId="loanAmount">
              <Form.Label className="d-flex justify-content-between">
                <span>Сумма займа:</span>
                <span className="fw-bold text-primary">{loanAmount.loanAmount}$</span>
              </Form.Label>
              <Form.Range
                min={200}
                max={1000}
                step={100}
                value={loanAmount.loanAmount ?? 200}
                onChange={(e) => updateLoan('loanAmount', Number(e.target.value))}
              />
              {errors.loanAmount && <small className="text-danger">{errors.loanAmount}</small>}
            </Form.Group>
            <Form.Group className="mb-4" controlId="loanDays">
              <Form.Label className="d-flex justify-content-between">
                <span>Срок займа:</span>
                <span className="fw-bold text-primary">{loanAmount.loanDays} дней</span>
              </Form.Label>
              <Form.Range
                min={10}
                max={30}
                step={1}
                value={loanAmount.loanDays ?? 10}
                onChange={(e) => updateLoan('loanDays', Number(e.target.value))}
              />
              {errors.loanDays && <small className="text-danger">{errors.loanDays}</small>}
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="outline-secondary" onClick={handleBack} disabled={loading}>
                Назад
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={loading}
                style={{ minWidth: '140px' }}
              >
                {loading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    <span className="ms-2">Отправка...</span>
                  </>
                ) : (
                  "Подать заявку"
                )}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>

      {showModal && (
        <ModalComponent
          show={showModal}
          onHide={handleCloseModal}
          userForm={userForm}
          loanData={loanAmount}
        />
      )}
    </>
  );
};

export default FinalPage;
