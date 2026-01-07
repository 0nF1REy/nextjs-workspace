"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Cliente } from "@/interfaces/cliente";
import MyInputComponent from "@/components/my-input/index";

export default function CadastroPage() {
  const cli: Cliente = {} as Cliente;

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  const submitHandler = async (form: FormEvent<HTMLFormElement>) => {
    form.preventDefault();

    const inputs: HTMLCollectionOf<HTMLInputElement> = form.currentTarget.getElementsByTagName("input");

    cli.idade = Number(inputs.namedItem("idade")?.value);
    cli.nome = inputs.namedItem("nome")?.value ?? "";
    const sexoChecked = form.currentTarget.querySelector<HTMLInputElement>('input[name="sexo"]:checked');
    cli.sexo = sexoChecked?.value ?? "";
    cli.email = inputs.namedItem("email")?.value;
    cli.nascimento = inputs.namedItem("nascimento")?.value ?? "";

    await mostrarCliente();
  }

  const mostrarCliente = async () => {
    console.log(cli);
  };

  return (
    <Card className="max-w-3/12 w-1/3">
      <CardHeader className="w-full text-center">
        <CardTitle>Faça o seu cadastro agora mesmo!</CardTitle>
        <CardDescription>Favor preencher o formulário abaixo!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(element) => setNome(element.target.value)}
                required
              />
            </div>
            <MyInputComponent
              labelProps={{
                htmlFor: "email"
              }}
              labelText="E-mail"
              inputProps = {{
                name: "email",
                type: "email",
                id: 'email',
                placeholder: "Digite o seu e-mail",
                className: "bg-red",
                required: true
              }}
            />
            {/* Substituir por componentes */}
            <div className="grid gap-2">
              <Label htmlFor="idade">Idade</Label>
              <Input
                id="idade"
                name="idade"
                type="number"
                placeholder="Digite sua idade"
                value={idade}
                onChange={(element) => setIdade(element.target.value)}
                required
              />
            </div>

            <RadioGroup name="sexo" defaultValue="comfortable">
              <Label htmlFor="fem">Informe seu gênero</Label>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="m" id="masc" />
                <Label htmlFor="masc">Masculino</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="f" id="fem" />
                <Label htmlFor="fem">Feminino</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="n" id="nao" />
                <Label htmlFor="nao">Prefiro não informar</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-2 mt-4">
          <Button
          type="submit"
          className="w-full"
          onClick={() => mostrarCliente()}
        >
          Cadastrar
        </Button>

        <Button variant="outline" type="reset" className="w-full">
          Cancelar
        </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
