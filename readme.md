

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