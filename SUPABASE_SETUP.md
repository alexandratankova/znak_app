# Setup Supabase per ZИАК

## 1. Crea un progetto Supabase

1. Vai su [supabase.com](https://supabase.com) e crea un account/progetto
2. Nel dashboard: **Settings → API** copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

## 2. Variabili d'ambiente

Copia `.env.example` in `.env.local` e compila:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

## 3. Schema database

Nel dashboard Supabase: **SQL Editor → New query**

Incolla ed esegui il contenuto di `supabase/schema.sql`. Crea la tabella `user_progress` e le policy RLS.

## 4. Auth (opzionale)

Per registrazione con email:
- **Authentication → Providers**: Email è attivo di default
- Per social (Google, GitHub): **Authentication → Providers** e abilita quelli desiderati

## Funzionalità attive

- **Login/Registrazione**: pulsante "Account" nella sidebar
- **Progressi salvati**: le lettere tracciate vengono sincronizzate su Supabase per gli utenti loggati
- **Utenti anonimi**: progressi solo in memoria (persi al refresh)
