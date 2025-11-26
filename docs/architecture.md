# Arquitetura inicial

## Componentes principais
- **Frontend** (apps/frontend): React + Vite + Tailwind, Zustand para estado global, React Query para dados, WebSockets para atualizações em tempo real.
- **Backend** (apps/backend): NestJS com módulos de autenticação, clientes, campanhas, mensageria, pedidos, automações e relatórios.
- **Banco de dados**: PostgreSQL estruturado em schemas para clientes, mensagens, pedidos, automações.
- **Mensageria**: Redis para filas de disparo, throttling e cache.
- **Integrações**: adaptadores para provedores WhatsApp (Meta Cloud, WATI, Z-API), pagamentos (Pix, Mercado Pago, Stripe) e ERPs.

## Fluxo de mensagens
1. Campanha disparada cria tarefas na fila `campaign.send`.
2. Worker envia mensagens via provedor WhatsApp e registra `message_events`.
3. Webhooks retornam status (enviado, entregue, lido, respondido) e alimentam dashboards.
4. Respostas com intenção positiva disparam automação de pedidos.

## Fluxo de pedidos
1. Automação identifica produto/estoque e abre pedido em `orders`.
2. Sistema gera link de pagamento; callback atualiza `payments` e status.
3. Operadores acompanham via painel Kanban e enviam atualizações ao cliente.

## Fluxos inteligentes
- Editor visual monta gatilhos → condições → ações.
- Execuções registradas em `flow_logs` para análise e auditoria.

## Considerações de segurança
- JWT + refresh tokens, RBAC (admin, marketing, operador).
- Tokens de integrações protegidos por criptografia e rotation periódica.
- Logs e métricas monitorados com observabilidade (Grafana + OpenTelemetry).
