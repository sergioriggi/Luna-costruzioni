# Luna Costruzioni — istruzioni permanenti

## Automazioni: controlla prima di costruire

Prima di creare un publisher, un connettore, una edge function, un token o
una routine, leggi il registro `docs/automazioni.md` nel repo
`sergioriggi/sussex-project` e chiama `list_triggers`. Se qualcosa fa già
quel lavoro, usalo o modificalo: non costruire doppioni.

La pubblicazione su Facebook e Instagram esiste già: routine «Luna
Costruzioni — post Facebook del mese» (il 27, un post ogni 2 giorni alle
19:00) e «Luna Costruzioni — copia su Instagram» (ogni sera), via Graph API
con l'app Meta «Luna social app» e il token nel Progetto Claude «Luna
costruzioni» (`claude/credenziali-api.md`). Prima di programmare post nuovi
leggi la coda (`/177378079005986/scheduled_posts`) e
`claude/social-calendario.md`, e usa solo date libere; rileggi la coda
subito prima di ogni programmazione. Quei due documenti stanno nel Progetto
Claude, non in questo repo: se non li puoi leggere, non programmare nulla.

`main` pubblica da solo su Hostinger: niente push diretti su main.
