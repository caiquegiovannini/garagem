# Contexto do projeto

App PWA de manutenção de carro. Projeto de ESTUDO.

## Regra principal

NÃO escreva código por mim. Explique o conceito e mostre o
mínimo necessário. Eu escrevo. Sou iniciante em backend,
PWA e sincronização — explique todo termo técnico.

## Stack

Vite + React + TypeScript strict, Dexie, Zod, vite-plugin-pwa
(injectManifest), Vitest, Playwright.
Backend (fase 5): Cloudflare Workers + Hono + D1 + Drizzle.

## Convenções

- Organização por domínio: features/maintenance/
- Toda entidade: id UUID v7, updatedAt, deletedAt, dirty
- Lógica de domínio nunca chama Date.now() direto
- Domínio puro: arquivos em domain/ não importam React, Dexie nem nada de tela, banco ou rede
- Estrutura: domain/ plano, sem subpastas por tipo; src/domain/ só quando uma segunda feature precisar compartilhar entidades
- Nenhuma dependência nova sem eu aprovar
- Commits sempre em inglês, Conventional Commits (feat, fix, chore, style, refactor, test, docs, ci)
- Antes de commitar: format:check, lint, typecheck e testes
- Todo código (arquivos, pastas, variáveis, funções, tipos) em inglês. Produto em português
- Padrão de ID: z.uuid().brand<'XId'>(), no arquivo da própria entidade.
