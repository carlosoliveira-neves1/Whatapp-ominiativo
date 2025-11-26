# WhatsApp Omnichannel WebApp

## Visão geral

Plataforma omnichannel centrada no WhatsApp para campanhas, pedidos e CRM inteligente. Permite disparos segmentados (texto, botões, catálogo, links), automações e acompanhamento em tempo real.

### Objetivos principais
- Aumentar conversão através de campanhas personalizadas e automações.
- Consolidar relacionamento com clientes (CRM com insights e gatilhos).
- Integrar pedidos, pagamentos e estoque no fluxo do WhatsApp.

## Arquitetura proposta

- **Frontend:** React + Vite + Tailwind, Zustand p/ estado, Recharts e sockets para dashboards live.
- **Backend:** Node.js (NestJS), com módulos: Auth, Customers, Campaigns, Messaging, Orders, Automations, Reports.
- **Banco:** PostgreSQL (schemas para clientes, campanhas, mensagens, pedidos, automações).
- **Mensageria:** Redis (filas de envio, rate limiting, automações).
- **Integrações:** WhatsApp Business API ou provedores (WATI, Z-API, UltraMSG), pagamentos (Pix, Mercado Pago, Stripe), ERPs.

### Principais módulos
- Campanhas WhatsApp: segmentação, editor drag-and-drop, A/B test, agendamento.
- Pedidos: criação automática via chat, pipeline Kanban, integrações de pagamento.
- CRM & Insights: dashboards, scoring, triggers automáticos (aniversário, inatividade, pós-venda).
- Fluxos inteligentes: construtor visual com gatilhos, condições e ações.
- IA Assistida: respostas automáticas contextualizadas, recomendações de produtos.

## Estrutura do repositório

```
windsurf-project-4/
├─ README.md
├─ docs/
└─ apps/
   ├─ frontend/
   └─ backend/
```

### Próximos passos
1. Scaffold frontend (React + Vite) com Tailwind.
2. Scaffold backend (NestJS) com módulos base.
3. Criar documentação detalhada em `docs/` (fluxos, diagramas, APIs).
4. Configurar pipelines de build/test e ambiente containerizado.

