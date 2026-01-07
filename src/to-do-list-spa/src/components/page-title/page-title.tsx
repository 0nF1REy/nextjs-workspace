"use client";

import "./page-title.scss";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export function PageTitle() {
  return (
    <h1 className="vintage-title" id="pageTitle">
      Minha Lista de Tarefas <CheckCircleIcon aria-hidden="true" />
    </h1>
  );
}
