# NSI-Berichtserstellung – Anleitung für Betrieb und Updates

Diese Anleitung ist für alle, die die Seite übernehmen oder neu hochladen müssen, ohne Vorkenntnisse.

## 1. Was ist das?

Eine Webseite zum Erstellen von QS-Berichten und Kurzberichten (PDF-Export direkt im Browser).
Sie besteht aus nur drei wichtigen Dateien:

| Datei | Ordner | Aufgabe |
|---|---|---|
| `index.html` | `public/` | die komplette App |
| `middleware.js` | Hauptordner | Passwortschutz und Anmeldeseite |
| `package.json` | Hauptordner | Hilfsdatei für den Passwortschutz |

Gehostet wird sie bei **Vercel** (Anzeige im Internet). Die Dateien liegen bei **GitHub** (Repo `Bocho0/QS-NSI`).
Sobald in GitHub etwas geändert wird, veröffentlicht Vercel automatisch die neue Version (dauert ca. 1 Minute).

## 2. Neue Version hochladen (häufigster Fall)

1. Die neue ZIP-Datei entpacken.
2. Auf GitHub das Repo `Bocho0/QS-NSI` öffnen und anmelden.
3. **Add file → Upload files** wählen.
4. Die Dateien per Drag & Drop hochladen und dabei die Ordnerstruktur beibehalten:
   - `middleware.js`, `package.json`, `README.md` ins Hauptverzeichnis
   - `index.html` in den Ordner `public`
   (Am einfachsten den Inhalt des entpackten Ordners „Berichtserstellung-PB“ komplett in das Upload-Feld ziehen.)
5. Unten auf **Commit changes** klicken.
6. Bei Vercel im Projekt unter **Deployments** warten, bis oben „Ready“ steht.
7. Seite im Inkognito-Fenster öffnen (Strg + Shift + N) und prüfen.

## 3. Einstellungen bei Vercel

Alles im Vercel-Projekt (Dashboard → Projekt `nsi-berichtserstellung`):

- **Projektname / Adresse:** Settings → General → Project Name. Nur Kleinbuchstaben und Bindestriche, z. B. `nsi-berichtserstellung`. Die Adresse lautet dann `<name>.vercel.app`.
- **Passwort und Benutzername:** Settings → Environment Variables → **Add Environment Variable**.

  | Key (genau so schreiben) | Value |
  |---|---|
  | `NSI_BERICHTSERSTELLUNG` | das Passwort |
  | `APP_USER` | der Benutzername (optional; ohne diese Variable wird jeder Name akzeptiert) |

  Der Key darf nur Buchstaben, Ziffern und Unterstriche enthalten (keine Bindestriche, keine Leerzeichen). Environments: mindestens **Production** angehakt lassen.
- **Nach jeder Änderung an Variablen:** Deployments → oberste Zeile → **⋯ → Redeploy**. Erst danach gilt die Änderung.
- **Passwort ändern:** Variable über **⋯ → Edit** bearbeiten, speichern, Redeploy.

## 4. Komplett neu aufsetzen (neues Projekt)

1. Bei GitHub ein neues Repo anlegen und den Inhalt der ZIP-Datei hochladen (siehe Abschnitt 2).
2. Bei Vercel: **Add New → Project** → das GitHub-Repo auswählen → **Import**.
3. Framework Preset: **Other**. Falls später „404 – Not Found“ erscheint: Settings → General → **Output Directory** auf `public` setzen und neu deployen.
4. Variablen anlegen (Abschnitt 3) und **Redeploy** ausführen.
5. Projektnamen festlegen (Abschnitt 3).

## 5. So verhält sich die Anmeldung

- Beim Öffnen erscheint eine Anmeldeseite (Benutzername + Passwort).
- Ein neuer Tab oder ein Browser-Neustart verlangt die Anmeldung erneut. Neu laden (F5) im selben Tab nicht.

## 6. Wichtig: Daten sichern

Die Berichtsdaten (Fotos, Texte) liegen **nur im Browser** des jeweiligen Rechners, nicht auf dem Server.
Deshalb regelmäßig in der App **„Sitzung sichern (.json)“** drücken und die Datei im Projektordner ablegen.
Beim Browserwechsel oder nach dem Löschen der Browserdaten über „Vorherige Sitzung laden“ wieder einlesen.

## 7. Wenn etwas nicht klappt

| Problem | Ursache / Lösung |
|---|---|
| Seite zeigt „Passwort-Variable … ist in Vercel nicht gesetzt“ | Variable `NSI_BERICHTSERSTELLUNG` fehlt, ist falsch geschrieben oder es wurde nicht neu deployt. Abschnitt 3. |
| Seite ist ohne Passwort offen | `middleware.js` oder `package.json` liegt nicht im Hauptordner des Repos. Abschnitt 2. |
| „404 – Not Found“ | Output Directory auf `public` stellen (Abschnitt 4) und `index.html` muss im Ordner `public` liegen. |
| Alte Version wird noch angezeigt | Seite mit Strg + F5 neu laden, Inkognito-Fenster nutzen, bei Vercel prüfen, ob das Deployment „Ready“ ist. |
| Anmeldung klappt nicht, Passwort wurde geändert | Nach dem Ändern der Variable Redeploy ausführen. |
| PDF-Export schlägt fehl | Internetverbindung prüfen (die App lädt Hilfsprogramme aus dem Netz) und Seite neu laden. |
| Dateiname/Fußzeile zeigt falsches Kürzel | In der App im Feld „Baustellenbezeichnung“ nur das Kürzel eintragen (z. B. `NSI`). |
