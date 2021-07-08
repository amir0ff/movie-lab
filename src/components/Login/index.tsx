import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner, ToggleButton } from 'react-bootstrap';
import './styles.scss';
import { useForm, ValuesType } from 'reactjs-use-form';
import { formSchema } from './formSchema';
import { globalContext } from '../../store';

export function Login(): ReactElement {
  const { globalState, dispatch } = useContext(globalContext);
  const [isLoading, setIsLoading] = useState(false);
  const storageOptions = [
    { name: 'Session', value: 'sessionStorage' },
    { name: 'Local', value: 'localStorage' },
  ];
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { values, errors, handleOnChange, handleOnSubmit, isDisabled } = useForm(formSchema, handleLogin);

  const { email, passphrase }: ValuesType = values;

  useEffect(() => {
    if (emailInputRef.current) emailInputRef.current.focus();
  }, []);

  const fakeAuth = {
    authenticate(callback: () => void) {
      setTimeout(callback, 900);
    },
  };

  function handleLogin() {
    setIsLoading(true);
    fakeAuth.authenticate(() => {
      dispatch({ type: 'SET_USER', payload: email });
      dispatch({ type: 'AUTHENTICATE_USER', payload: true });
    });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'SET_PERSISTENCE', payload: event.currentTarget.value });
  }

  return (
    <Container fluid="sm" className="login-container d-flex justify-content-center mt-4 p-0">
      <Col className="border border-secondary rounded p-4 col-sm-6">
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              ref={emailInputRef}
              value={email}
              size="sm"
              onChange={handleOnChange}
              isInvalid={errors.email.hasError}
            />
            <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Passphrase</Form.Label>
            <Form.Control
              type="password"
              name="passphrase"
              value={passphrase}
              size="sm"
              onChange={handleOnChange}
              isInvalid={errors.passphrase.hasError}
            />
            <Form.Control.Feedback type="invalid">{errors.passphrase.message}</Form.Control.Feedback>
          </Form.Group>
          <Col className="d-flex justify-content-center mt-2">
            <Button type="submit" size="sm" variant="info" disabled={isDisabled}>
              <span>{isLoading ? <Spinner animation="grow" variant="light" size="sm" /> : 'Log In'}</span>
            </Button>
          </Col>
          <Row className="d-flex justify-content-center mt-2">
            <Col className="mb-3 storage-container">
              <Row className="d-flex justify-content-center">
                <Form.Label className="mb-0 text-label">Storage Persistence</Form.Label>
              </Row>
              <Row className="d-flex justify-content-center">
                {storageOptions.map((radio, index) => (
                  <ToggleButton
                    key={index}
                    id={`radio-${index}`}
                    type="radio"
                    size="sm"
                    variant="outline-secondary"
                    name="radio"
                    className={index === 0 ? 'mr-2' : ''}
                    value={radio.value}
                    checked={radio.value === globalState.persistenceType}
                    onChange={handleChange}
                  >
                    <span> {radio.name}</span>
                  </ToggleButton>
                ))}
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Container>
  );
}
