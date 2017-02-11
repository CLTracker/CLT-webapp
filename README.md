# CLTracker

This is the web app repository for the convention logistics tracker. Inside this repo you will find:
* An Angular2 frontend
* A Flask backend
* A docker configuration for deploying to production

Repo is based off https://github.com/ansrivas/angular2-flask

## Info

1.  `backend` directory contains the flask backend with simple authentication methods

2.  `front` directory contains the angular2 frontend based on [angular2-webpack](https://github.com/preboot/angular2-webpack)

## Usage

1.  Clone the repo

    ```bash
    git clone --depth 1 https://github.com/CLTracker/CLT-webapp.git
    cd CLT-webapp
    ```

2.  Install the backend related requirements and run. The following will start a flask-server on `localhost:8080`

    ```bash
    cd backend
    sudo pip install -r requirements.txt
    python run.py
    ```

3.  Install frontend related dependencies

    ```bash
    cd front

    # install global dependencies
    npm install webpack-dev-server rimraf webpack typescript -g

    # install project related dependencies
    npm install

    # run server
    npm run server:dev:hmr
    ```

4.  Now navigate to `http://localhost:8080` and login using default credential : `admin:admin`

### Docker support:

The current build is using `nginx` to serve static files. The pre-requisite is to run the following commands and then use `docker-compose`

1. Build the frontend ( production build )

  ```bash
  cd front
  npm install webpack-dev-server rimraf webpack typescript -g
  npm install
  npm run build:prod
  ```
  
4. Now, in project root directory execute `docker-compose up`

3. Navigate to `http://localhost:3000` and login using `admin:admin`  
