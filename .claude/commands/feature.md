# Feature Workflow

Implementiere ein neues Feature mit vollständigem GitHub-Workflow.

## Eingabe
Feature-Beschreibung: $ARGUMENTS

## Workflow

Führe folgende Schritte der Reihe nach aus:

### 1. GitHub Issue erstellen
- Erstelle ein GitHub Issue mit der Feature-Beschreibung
- Verwende einen aussagekräftigen Titel
- Füge im Body eine detaillierte Beschreibung und Akzeptanzkriterien hinzu
- Merke dir die Issue-Nummer

### 2. Feature Branch erstellen
- Erstelle einen neuen Branch vom aktuellen main/master Branch
- Benenne ihn nach dem Schema: `feature/<issue-nummer>-<kurze-beschreibung>`
- Wechsle auf den neuen Branch

### 3. Code implementieren
- Analysiere die bestehende Codebase
- Implementiere das Feature entsprechend der Architektur
- Halte dich an die bestehenden Code-Konventionen
- Erstelle oder aktualisiere Tests für das neue Feature

### 4. Tests ausführen
- Führe `./gradlew test` im backend/ Verzeichnis aus
- Bei Fehlern: Behebe die Fehler und führe die Tests erneut aus
- Fahre erst fort, wenn alle Tests grün sind

### 5. Änderungen committen und pushen
- Erstelle einen aussagekräftigen Commit mit Referenz zum Issue (z.B. "Implements #123")
- Pushe den Branch zum Remote Repository

### 6. Pull Request erstellen
- Erstelle einen PR mit dem `gh pr create` Befehl
- Referenziere das Issue im PR-Body (z.B. "Closes #123")
- Füge eine Zusammenfassung der Änderungen hinzu

### 7. Auf Bestätigung warten
- Zeige mir den PR-Link
- Frage mich, ob ich den PR mergen möchte
- Wenn ich bestätige: Merge den PR mit `gh pr merge --squash`
- Wenn ich ablehne: Frage nach gewünschten Änderungen und gehe zurück zu Schritt 3

## Wichtig
- Halte mich bei jedem Schritt über den Fortschritt informiert
- Bei Problemen: Informiere mich und warte auf weitere Anweisungen
- Verwende die TodoWrite-Tool um den Fortschritt zu tracken
