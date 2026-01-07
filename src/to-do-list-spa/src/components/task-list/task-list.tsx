"use client";

import {
  List,
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import styles from "./task-list.module.scss";
import { MouseEvent } from "react";

interface Task {
  id: number;
  nome: string;
  descricao: string;
  realizado: boolean;
  prioridade: 1 | 2 | 3;
}

const tasks: Task[] = [
  {
    id: 1,
    nome: "Estudar Svelte",
    descricao: "Entender como funciona o funcionamento do compilador svelte",
    realizado: false,
    prioridade: 1,
  },
  {
    id: 2,
    nome: "Estudar Angular",
    descricao: "Aprimorar os conhecimentos sobre diretivas angular",
    realizado: true,
    prioridade: 2,
  },
  {
    id: 3,
    nome: "Estudar Next JS",
    descricao: "Entender a estrutura e a utilização da lógica",
    realizado: false,
    prioridade: 3,
  },
];

const openTaskDetails = (task: Task) =>
  console.log("Open details for:", task.nome);
const toggleTaskStatus = (task: Task) =>
  console.log("Toggle status for:", task.nome);
const editTask = (task: Task) => console.log("Editing task:", task.nome);
const deleteTask = (id: number) => console.log("Deleting task with id:", id);

export function TaskList() {
  const handleItemClick =
    (task: Task) => (_event: MouseEvent<HTMLLIElement>) => {
      openTaskDetails(task);
    };

  const handleCheckboxClick =
    (task: Task) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      toggleTaskStatus(task);
    };

  const handleEditClick =
    (task: Task) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      editTask(task);
    };

  const handleDeleteClick =
    (id: number) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      deleteTask(id);
    };

  return (
    <div className="container-vintage">
      {tasks && tasks.length > 0 ? (
        <List className={styles["list-vintage"]}>
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              className={`${styles["item-vintage"]} ${
                styles[`priority-${task.prioridade}`]
              }`}
              onClick={handleItemClick(task)}
              disablePadding
            >
              <Checkbox
                className={styles["checkbox-vintage"]}
                checked={task.realizado}
                onClick={handleCheckboxClick(task)}
                aria-label={
                  task.realizado
                    ? `Marcar como não concluída: ${task.nome}`
                    : `Marcar como concluída: ${task.nome}`
                }
              />

              <ListItemText
                className={styles["task-details"]}
                primary={
                  <Typography
                    component="span"
                    className={`${styles["task-name"]} ${
                      task.realizado ? styles.completed : ""
                    }`}
                  >
                    {task.nome}
                  </Typography>
                }
                secondary={
                  <Typography component="small" className={styles["task-desc"]}>
                    {task.descricao}
                  </Typography>
                }
              />

              <IconButton
                className={styles["btn-edit-vintage"]}
                onClick={handleEditClick(task)}
                aria-label={`Editar tarefa: ${task.nome}`}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                className={styles["btn-delete-vintage"]}
                onClick={handleDeleteClick(task.id)}
                aria-label={`Remover tarefa: ${task.nome}`}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box className={styles["empty-state"]}>
          <CheckBoxOutlineBlankIcon className={styles["empty-state-icon"]} />
          <Typography variant="h6" className={styles["empty-state-text"]}>
            Nenhuma tarefa encontrada.
          </Typography>
          <Typography variant="caption">
            Adicione sua primeira tarefa no formulário ao lado!
          </Typography>
        </Box>
      )}
    </div>
  );
}
