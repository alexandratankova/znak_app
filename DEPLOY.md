# Deploy su Vercel – guida rapida

## Opzione 1: Dal terminale di Cursor (più facile)

1. In Cursor apri il **Terminale**: `Terminal` → `New Terminal` (oppure `` Ctrl+` ``)
2. Copia e incolla **uno alla volta** questi comandi:

```bash
cd "/Users/alexandratankova/cursor test/ultima-cyrillic-calligraphy-2"
git push origin main
```

Se ti chiede login per GitHub, segui le istruzioni. Dopo il push, Vercel farà il deploy da solo se il progetto è collegato.

---

## Opzione 2: Deploy con Vercel CLI

Se il push non basta o vuoi controllare il deploy:

```bash
cd "/Users/alexandratankova/cursor test/ultima-cyrillic-calligraphy-2"
npx vercel login
```

Si aprirà il browser per fare login. Poi:

```bash
npx vercel --prod
```

---

## Serve aiuto?

Se qualcosa non funziona, scrivi quale messaggio di errore compare.
