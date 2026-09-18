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
- Organização por domínio: features/manutencao/
- Toda entidade: id UUID v7, updatedAt, deletedAt, dirty
- Lógica de domínio nunca chama Date.now() direto
- Nenhuma dependência nova sem eu aprovar
- Commits sempre em inglês

## Fase atual
Fase 0 — Fundação.
