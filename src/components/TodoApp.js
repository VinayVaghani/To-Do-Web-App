import React, { useState } from "react";
import { Button, Form, ListGroup, Container, Row, Col, Card, Badge } from "react-bootstrap";

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();
    const text = task.trim();
    if (!text) return;
    setTasks((prev) => [...prev, { id: Date.now(), text, completed: false }]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={7} lg={6}>
          <Card className="shadow p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="m-0">📝 To-Do List</h2>
              <Badge bg="secondary">
                {done}/{total} done
              </Badge>
            </div>

            <Form onSubmit={addTask} className="d-flex gap-2 mb-3">
              <Form.Control
                type="text"
                placeholder="Enter a task..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                aria-label="Task input"
              />
              <Button type="submit">Add</Button>
            </Form>

            {tasks.length === 0 ? (
              <div className="text-center text-muted py-4">
                No tasks yet. Add your first one!
              </div>
            ) : (
              <ListGroup>
                {tasks.map((t) => (
                  <ListGroup.Item
                    key={t.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span
                      className={t.completed ? "strike" : ""}
                      role="button"
                      onClick={() => toggleComplete(t.id)}
                      title="Click to toggle complete"
                    >
                      {t.text}
                    </span>

                    <div className="d-flex gap-2">
                      <Button
                        variant={t.completed ? "warning" : "success"}
                        size="sm"
                        onClick={() => toggleComplete(t.id)}
                      >
                        {t.completed ? "Undo" : "Done"}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteTask(t.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}

            <div className="mt-3 text-center footer-note">
              Tip: click a task to mark it complete.
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
