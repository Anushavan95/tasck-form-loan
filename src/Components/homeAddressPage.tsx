import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Spinner } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import { FormContext, type StepTwoData } from "@/utils/types";
import { base_url } from "@/utils/utils";

type FormErrors = Partial<StepTwoData>;

const HomeAddressPage: React.FC = () => {
  const formContext = useContext(FormContext);
  const navigate = useNavigate();

  if (!formContext) {
    throw new Error("HomeAddressPage must be used inside FormProvider");
  }

  const { formAddress, setFormAddressPlace } = formContext;
  const { data, loading, sendRequest } = useFetch<string[]>(base_url);
  const [errors, setErrors] = useState<FormErrors>({});



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormAddressPlace((prev: StepTwoData) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formAddress.workplace) newErrors.workplace = "Выберите место работы";
    if (!formAddress.address?.trim()) newErrors.address = "Введите адрес проживания";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) navigate("/step3");
  };

  useEffect(() => {
    sendRequest('/products/category-list');
  }, [sendRequest]);

  const handleBack = () => navigate("/");

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "500px" }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center fw-bold">Адрес и место работы</Card.Title>

          <Form.Group className="mb-3" controlId="formWorkplace">
            <Form.Label>Место работы</Form.Label>
            {loading ? (
              <div className="d-flex justify-content-center my-3">
                <Spinner animation="border" variant="primary" size="sm" />
              </div>
            ) : (
              <Form.Select
                name="workplace"
                value={formAddress.workplace}
                onChange={handleChange}
                isInvalid={!!errors.workplace}
                disabled={loading}
              >
                <option value="">Выберите из списка...</option>
                {data?.map((wp) => (
                  <option key={wp} value={wp}>
                    {wp}
                  </option>
                ))}
              </Form.Select>
            )}
            <Form.Control.Feedback type="invalid">
              {errors.workplace}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formAddress">
            <Form.Label>Адрес проживания</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Напр. ул. Ленина, д. 10"
              value={formAddress.address}
              onChange={handleChange}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-between mt-4">
            <Button variant="outline-secondary" onClick={handleBack}>
              Назад
            </Button>
            <Button variant="primary" onClick={handleNext} style={{ minWidth: '100px' }}>
              Далее
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HomeAddressPage;
