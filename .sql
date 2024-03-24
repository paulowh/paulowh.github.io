CREATE TABLE "tb_atribuicao" (
    "colaborador" VARCHAR2(50),
    "projeto" VARCHAR2(40),
    "funcao" VARCHAR2(40)
);

CREATE TABLE "tb_colaborador" (
    "matricula" VARCHAR2(5),
    "cpf" VARCHAR2(11),
    "nome" VARCHAR2(50),
    "salario" FLOAT(126),
    "rua" VARCHAR2(90),
    "numero" VARCHAR2(10),
    "complemento" VARCHAR2(50),
    "bairro" VARCHAR2(50),
    "cep" VARCHAR2(12),
    "departamento" VARCHAR2(50),
    "cidade" VARCHAR2(40),
    "estado" VARCHAR2(2)
);

CREATE TABLE "tb_departamento" (
    "sigla" VARCHAR2(5),
    "nome" VARCHAR2(5),
    "chefe" VARCHAR2(50)
);

CREATE TABLE "tb_departamento_sup" ("sigla" VARCHAR2(5), "nome" VARCHAR2(5));

CREATE TABLE "tb_dependente" (
    "cpf" VARCHAR2(11),
    "colaborador" VARCHAR2(50),
    "nome" VARCHAR2(50),
    "data_nascimento" DATE,
    "parentesco" VARCHAR2(20)
);

CREATE TABLE "tb_email_colaborador" (
    "email_pessoal" VARCHAR2(80),
    "email_corporativo" VARCHAR2(80),
    "email_alternativo" VARCHAR2(80)
);

CREATE TABLE "tb_papel" ("id" VARCHAR2(5), "nome" VARCHAR2(50));

CREATE TABLE "tb_projeto" (
    "id" VARCHAR2(5),
    "nome" VARCHAR2(50),
    "reponsavel" VARCHAR2(60),
    "inicio" DATE,
    "fim" DATE
);

CREATE TABLE "tb_telefone_colaborador" (
    "tel_residencial" VARCHAR2(20),
    "tel_comercial" VARCHAR2(20),
    "tel_celulat" VARCHAR2(20)
);

CREATE UNIQUE INDEX "pk_tb_colaborador" ON "tb_colaborador" ("matricula");

CREATE UNIQUE INDEX "pk_tb_departamento" ON "tb_departamento" ("sigla");

CREATE UNIQUE INDEX "pk_tb_departamento_sup" ON "tb_departamento_sup" ("sigla");

CREATE UNIQUE INDEX "pk_tb_dependente" ON "tb_dependente" ("cpf");

CREATE UNIQUE INDEX "pk_tb_papel" ON "tb_papel" ("id");

CREATE UNIQUE INDEX "pk_tb_projeto" ON "tb_projeto" ("id");

ALTER TABLE
    "tb_atribuicao"
MODIFY
    ("colaborador" NOT NULL ENABLE);

ALTER TABLE
    "tb_atribuicao"
MODIFY
    ("projeto" NOT NULL ENABLE);

ALTER TABLE
    "tb_atribuicao"
MODIFY
    ("funcao" NOT NULL ENABLE);

ALTER TABLE
    "tb_colaborador"
ADD
    CONSTRAINT "pk_tb_colaborador" PRIMARY KEY ("matricula") USING INDEX ENABLE;

ALTER TABLE
    "tb_departamento"
ADD
    CONSTRAINT "pk_tb_departamento" PRIMARY KEY ("sigla") USING INDEX ENABLE;

ALTER TABLE
    "tb_departamento_sup"
ADD
    CONSTRAINT "pk_tb_departamento_sup" PRIMARY KEY ("sigla") USING INDEX ENABLE;

ALTER TABLE
    "tb_dependente"
ADD
    CONSTRAINT "pk_tb_dependente" PRIMARY KEY ("cpf") USING INDEX ENABLE;

ALTER TABLE
    "tb_papel"
ADD
    CONSTRAINT "pk_tb_papel" PRIMARY KEY ("id") USING INDEX ENABLE;

ALTER TABLE
    "tb_projeto"
ADD
    CONSTRAINT "pk_tb_projeto" PRIMARY KEY ("id") USING INDEX ENABLE;