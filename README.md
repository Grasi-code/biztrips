# Deploy Pipeline
## Trigger
- **Push:** Die Pipeline wird ausgelöst, wenn Änderungen in den `main`-Branch gepusht werden.
---
## Build Job
Ein Job, der auf einem Ubuntu-Host (`ubuntu-latest`) ausgeführt wird.
### Schritte (Steps)
1. **Checkout des Repositories**  
  - **Action:** `actions/checkout@v3`  
  - **Beschreibung:** Lädt den Code aus dem GitHub-Repository auf den Runner, um ihn in den nächsten Schritten zu verwenden.
2. **Erstellen des Docker-Images**  
  - **Name:** Build the Docker image  
  - **Befehl:**  
    ```bash
    docker build -t alexanderstern776514/biztrips .
    ```  
  - **Beschreibung:** Baut das Docker-Image aus dem aktuellen Verzeichnis (`.`) und taggt es als `alexanderstern776514/biztrips`.
3. **Login bei Docker Hub**  
  - **Name:** Log in to Docker Hub  
  - **Befehl:**  
    ```bash
    docker login -u alexanderstern776514 -p ${{ secrets.DOCKER_ACCESS_TOKEN }}
    ```  
  - **Beschreibung:** Meldet sich bei Docker Hub mit Benutzernamen und Token aus GitHub-Secrets an.
4. **Pushen des Docker-Images**  
  - **Name:** Push the Docker image  
  - **Befehl:**  
    ```bash
    docker push alexanderstern776514/biztrips
    ```  
  - **Beschreibung:** Läd das erstellte Docker-Image auf Docker Hub hoch.
---
## Deploy Job
Ein Job, der auf einem Ubuntu-Host (`ubuntu-latest`) ausgeführt wird.  
**Abhängigkeit:** Der Build-Job muss erfolgreich abgeschlossen sein.
### Schritte (Steps)
1. **Checkout des Repositories**  
  - **Name:** Checkout repository  
  - **Action:** `actions/checkout@v4`  
  - **Beschreibung:** Lädt den Code aus dem GitHub-Repository auf den Runner.
2. **Set up Docker**  
  - **Name:** Set up Docker  
  - **Action:** `docker/setup-buildx-action@v3`  
  - **Beschreibung:** Rüstet den Runner mit Docker und `buildx`-Funktionalität aus.
3. **Pull des Docker-Images**  
  - **Name:** Pull the Docker image  
  - **Befehl:**  
    ```bash
    docker pull alexanderstern776514/biztrips:latest
    ```  
  - **Beschreibung:** Lädt das Docker-Image mit dem Tag `latest` von Docker Hub herunter.
4. **Extrahieren der App-Dateien aus dem Container**  
  - **Name:** Extract app files from the container  
  - **Befehl:**  
    ```bash
    container_id=$(docker create alexanderstern776514/biztrips:latest)
    mkdir -p ./app/build
    docker cp $container_id:/app/build ./app/
    docker rm $container_id
    ```  
  - **Beschreibung:** Erstellt einen Container, extrahiert die Build-Dateien, und entfernt den Container anschließend.
## Rollen und Verantwortlichkeiten
| **Person** | **Verantwortung**       |
|------------|--------------------------|
| Alex       |Pipeline und Tests              |
---
## Testumgebung
- **Unit Testing:** Jest  
- **Component Testing:** Cypress  
- **End-to-End Testing (E2E):** Cypress  
---
## Test Cases 
| **TestID** | **User Story**                                                                 | **Erwartetes Ergebnis**                                                                                                                                 |
|------------|-------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1          | Ich als Benutzer kann alle Business Trips sehen.                              | Es werden mir alle 3 Business Trips angezeigt.                                                                                                          |
| 2          | Ich als Benutzer kann die Liste mit Business Trips nach Monat filtern.        | Im Februar werden alle 2 Business Trips angezeigt.                                                                                                     |
| 3          | Ich als Benutzer kann einen Business Trip zu meiner Wishlist hinzufügen.      | Wenn auf den "Add to Wishlist"-Button gedrückt wird, wird der Business Trip auf der Wishlist ersichtlich.                                              |
| 4          | Ich als Benutzer kann einen Business Trip aus meiner Wishlist entfernen.      | Wenn der "delete Item"-Button gedrückt wird, dann wird der Business Trip aus der Wishlist entfernt.                                                    |
| 5          | Ich als Benutzer kann alle Business Trips aus meiner Wishlist entfernen.      | Wenn der "empty wishlist"-Button gedrückt wird, dann werden alle Business Trips aus der Wishlist entfernt.                                             |
| 6          | Ich als Benutzer kann jeden Business Trip nur einmal in die Wishlist packen.  | Wenn ein Business Trip bereits auf der Wishlist enthalten ist, dann wird bei erneutem Drücken des "Add to Wishlist"-Buttons eine Fehlermeldung angezeigt. |
| 7          | Ich als Benutzer kann jeden Business Trip favoritisieren.                     | Wenn ein Trip favorisiert wird, ist das Herz ausgefüllt.                                                                                               |
