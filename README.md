# bakeside med glutenfrie oppskrifter
Eksamen nettside med glutenfrie bakeoppskrifter🔆

Målet vårt er å tilby en side hvor folk med glutenallergi og evt. andre allergier kan enkelt finne en søt oppskrift de har lyst på uten å bry seg om allergiene sine.
### Hvordan systemet funker
Dette er en enkel nettside med et tag system for å skille de ulike oppskriftene. Prosjektet er kodet med **HTML**, **CSS** og **JavaScript**, med en **MariaDB**-database koblet til via en **Node.js** backend.

## Teknologier

HTML, CSS, JavaScript\
MariaDB\
Node.js (Express)\

### Forutsettninger, hva du trenger:
Visual Studio Code(eller annen tekseditor)\
Git

## Hvordan installere og kjøre prosjektet lokalt

1. Klon repoen i bestemt mappe
```bash
git clone https://github.com/M4t1lde/bakeside.git
cd quiz/
```

2. Installer **mariadb**
```bash
brew install mariadb
mysql.server start
brew services start mariadb
```
har du ikke homebrew? kjør denne før du laster ned mariadb:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
3. Installer nødvendige npm-pakker og MariaDB-klienten for Node.js:
```bash
npm install
npm install mariadb
```

4. Logg inn i mariadb som root brukeren
```bash
sudo mysql -u root
```

5. Kjør følgende kommandoer i en ny terminal for å opprette databsen med data:
```bash
cd /path/to/file
sudo mysql -u root < LAG DENNE

```
7. Åpne filen kalt dbconnector.js i prosjektmappen, og endre "user" og "password" til ditt eget(la passordet være blangt om du ikke har et).

```bash
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quiz',
    connectionLimit: 5
});
```


## Starte serveren
```bash
nodemon app.js
```
Standardporten er http://localhost:3000

vil ikke starte? Skjekk om du har lastet ned alle nødvendige pakker.

## Test selv
Se oppskriftene.

Test tag-funksjonen.

Legg til nye oppskrifter

### Lisens
Dette er et eksamensproskjekt som er fritt å bruke for alle.