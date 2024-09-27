

## Motivera ditt val av databas
Jag valde att använda MongoDB som min databas eftersom det är en flexibel databas som gör det enkelt att justera datamodellen över tid utan att behöva ändra strukturen. Man slipper också att skapa krångliga kopplingar mellan användaren och uppgifter, eller skapa fler tabeller som man skulle behövt göra i en relationsdatabas som PostgreSQL. MongoDB var färskt i minnet eftersom vi har arbetat med det sedan vi började den andra delen av kursen, så jag tyckte att det skulle passa bäst för den här typen av projekt.

## Redogör vad de olika teknikerna (ex. verktyg, npm-paket, etc.) gör i applikationen

**Node** möjliggör att använda Javascript för servrar och backend.

**Express** är ett ramverk för node som hanterar routing och server logik.

**TypeScript** används för att ge statisk typkontroll i projektet som gör koden mer stabil och lättare att felhantera.

**Mongoose** är ettt verktyg för MongoDB som förenklar datamodellering och hanterar datavalidering.

**Nodemon** startar automatiskt om servern när en filändring upptäcks.

**bcrypt** kan hasha och verifiera lösenord som används vid registrering och inloggning.

**dotenv** hanterar känslig data som lösenord och användarnamn i en .env-fil. Används under utvecklingen för att inte skicka upp känslig information till ett repo.

## Redogör översiktligt hur applikationen fungerar

Denna applikation är en uppgiftshanterare som låter användare registrera sig, skapa och hantera uppgifter. Det är en backend baserad applikation som använder Node, Express och MongoDB.

Användare måste skapa ett konto genom att ge ett användarnamn, en email och ett lösenord. Lösenordet krypteras med bcrypt innan den
sparas i databasen. En användare kan skapa en uppgift som kan tilldelas till användaren själv eller en annan användare. Det går också att sätta en status på en uppgift som till exempel "to-do" eller "in progress". En användare kan se när en uppgift skapades, och om uppgiften är markerad som slutförd visas även datumet för när den blev slutförd.

Applikationen använder MongoDB som databas där användare och uppgifter sparas. Till MongoDB används Mongoose för att underlätta interaktionen mellan applikationen och databasen.

För att hantera kommunikationen mellan klienten och servern använder applikationen ett REST API. Med hjälp av Express hanteras alla HTTP-förfrågningar och routes, vilket gör det enkelt att utföra operationer som att skapa, läsa, uppdatera och ta bort data.

Tillsammans skapar dessa komponenter en enkel och effektiv uppgiftshanterare som är både flexibel och lätt att använda.


| **Route**              | **HTTP Method** | **Beskrivning**                               |
|------------------------|-----------------|-----------------------------------------------|
| `/api/users/register`  | `POST`          | Skapar en ny användare (registrering)         |
| `/api/users/login`     | `POST`          | Loggar in en användare                        |
| `/api/users`           | `GET`           | Hämtar alla användare                         |
| `/api/users/:userId`   | `GET`           | Hämtar en användare med specifikt ID          |
| `/api/users/:userId`   | `PUT`           | Uppdaterar en användares uppgifter            |
| `/api/users/:userId`   | `DELETE`        | Tar bort en användare med specifikt ID        |
| `/api/tasks`           | `POST`          | Skapar en ny uppgift                          |
| `/api/tasks`           | `GET`           | Hämtar alla uppgifter                         |
| `/api/tasks/:taskId`   | `GET`           | Hämtar en specifik uppgift med ID             |
| `/api/tasks/:taskId`   | `PUT`           | Uppdaterar en specifik uppgift                |
| `/api/tasks/:taskId`   | `DELETE`        | Tar bort en specifik uppgift                  |
