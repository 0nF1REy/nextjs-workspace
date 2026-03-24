"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { motion } from "framer-motion";
import "./task-form.scss";

export function TaskForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState({
    nome: "",
    descricao: "",
    prioridade: "",
  });
  const [errors, setErrors] = useState({
    nome: "",
    descricao: "",
    prioridade: "",
  });

  const isDisabled = !task.nome || !task.descricao || !task.prioridade;

  const validate = () => {
    const tempErrors = { nome: "", descricao: "", prioridade: "" };
    let isValid = true;

    if (!task.nome) {
      tempErrors.nome = "O nome da tarefa é obrigatório.";
      isValid = false;
    } else if (task.nome.length < 3) {
      tempErrors.nome = "O nome deve ter no mínimo 3 caracteres.";
      isValid = false;
    }

    if (!task.descricao) {
      tempErrors.descricao = "A descrição é obrigatória.";
      isValid = false;
    }

    if (!task.prioridade) {
      tempErrors.prioridade = "Selecione uma prioridade.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Formulário enviado:", task);
      // Lógica
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handlePriorityChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTask({ nome: "", descricao: "", prioridade: "" });
    setErrors({ nome: "", descricao: "", prioridade: "" });
  };

  return (
    <div className="container-vintage">
      <Card className="card-vintage">
        <CardContent>
          <Typography variant="h5" component="div" className="card-title">
            {isEditing ? "Editar Tarefa" : "Adicionar Nova Tarefa"}
          </Typography>
          <form onSubmit={handleSubmit} className="form-vintage" noValidate>
            <TextField
              label="Nome da Tarefa"
              variant="outlined"
              name="nome"
              placeholder="Ex: Estudar Angular"
              value={task.nome}
              onChange={handleChange}
              required
              fullWidth
              className="vintage-input"
              inputProps={{ maxLength: 50 }}
              error={!!errors.nome}
              helperText={errors.nome}
            />

            <TextField
              label="Descrição"
              variant="outlined"
              name="descricao"
              placeholder="Ex: Concluir o módulo de componentes e serviços."
              value={task.descricao}
              onChange={handleChange}
              required
              multiline
              rows={4}
              fullWidth
              className="vintage-input"
              inputProps={{ maxLength: 200 }}
              error={!!errors.descricao}
              helperText={
                errors.descricao ? (
                  errors.descricao
                ) : (
                  <span className="description-counter">
                    {`${task.descricao.length} / 200`}
                  </span>
                )
              }
            />

            <FormControl
              fullWidth
              variant="outlined"
              className="vintage-input"
              required
              error={!!errors.prioridade}
            >
              <InputLabel>Prioridade</InputLabel>
              <Select
                name="prioridade"
                value={task.prioridade}
                onChange={handlePriorityChange}
                label="Prioridade"
              >
                <MenuItem value={1}>Alta</MenuItem>
                <MenuItem value={2}>Média</MenuItem>
                <MenuItem value={3}>Baixa</MenuItem>
              </Select>
              {errors.prioridade && (
                <FormHelperText>{errors.prioridade}</FormHelperText>
              )}
            </FormControl>

            <Box className="form-actions">
              <motion.div
                whileHover={
                  !isDisabled
                    ? {
                        y: -6,
                        boxShadow:
                          "0 10px 20px rgba(0, 0, 0, 0.25), 0 15px 30px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15)",
                      }
                    : {}
                }
                transition={{ duration: 0.3 }}
                style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isDisabled}
                  className="btn-vintage"
                >
                  {isEditing ? "Atualizar Tarefa" : "Adicionar Tarefa"}
                </Button>
              </motion.div>
              {isEditing && (
                <motion.div
                  whileHover={{
                    y: -6,
                    boxShadow:
                      "0 10px 20px rgba(0, 0, 0, 0.25), 0 15px 30px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleCancelEdit}
                    className="btn-cancel-vintage"
                  >
                    Cancelar
                  </Button>
                </motion.div>
              )}
            </Box>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
