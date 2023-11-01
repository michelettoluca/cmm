![header](https://github.com/michelettoluca/cmm/blob/main/header.png?raw=true)

## Cloe Microservice Manager
Cloe Microservice Manager is a multiplatform lightweight application to start/stop springboot microservices.\
I built this app for my coworkers and me because the suggested way to setup the local dev environment was to open up an IntelliJ window for each microservice, and that required way too much resources (up to 700MB per instance).

## Installation guide
- Clone the repository running the command
  ```
  git clone https://github.com/michelettoluca/cmm
  ```
- Install dependencies with
  ```
  npm i
  ```
- Build the application with
  ```
  npm run build
  ```
- Depending on the OS run the .deb or .msi generated

## Screenshots
![home](https://github.com/michelettoluca/cmm/blob/main/screenshots/main.png?raw=true)
![add](https://github.com/michelettoluca/cmm/blob/main/screenshots/add.png?raw=true)
![delete](https://github.com/michelettoluca/cmm/blob/main/screenshots/delete.png?raw=true)

## Todo 
- [ ] Implement Redux
- [ ] Fix tracking sidecar processes
