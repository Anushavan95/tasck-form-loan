import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import { FormContext, type StepOneData } from "@/utils/types";
import { formatPhoneNumber } from "@/utils/utils";

type FormErrors = Partial<Record<keyof StepOneData, string>>;

const HomePage: React.FC = () => {
  const formContext = useContext(FormContext);
  const navigate = useNavigate();

  if (!formContext) {
    throw new Error("HomePage must be used inside FormProvider");
  }

  const { userForm, setUserForm } = formContext;
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    if (name === "phone") {
      const formattedValue = formatPhoneNumber(value);
      setUserForm((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setUserForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!userForm.phone?.trim()) newErrors.phone = "Введите номер телефона";
    if (!userForm.firstName?.trim()) newErrors.firstName = "Введите ваше имя";
    if (!userForm.lastName?.trim()) newErrors.lastName = "Введите вашу фамилию";
    if (!userForm.gender) newErrors.gender = "Выберите ваш пол";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (): void => {
    if (validate()) {
      navigate("/step2");
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 shadow-sm" style={{ width: "100%", maxWidth: "500px" }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center fw-bold">Личные данные</Card.Title>

          <Form>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Телефон</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="0 000 00000"
                value={userForm.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
                maxLength={12}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Иван"
                value={userForm.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Иванов"
                value={userForm.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Пол */}
            <Form.Group className="mb-4" controlId="formGender">
              <Form.Label>Пол</Form.Label>
              <Form.Select
                name="gender"
                value={userForm.gender}
                onChange={handleChange}
                isInvalid={!!errors.gender}
              >
                <option value="">Выберите...</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.gender}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" className="w-100 py-2" onClick={handleNext}>
              Далее
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HomePage;
