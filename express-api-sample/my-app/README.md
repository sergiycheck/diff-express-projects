# A Rest API with Express, PostgreSQL, TypeOrm, and TypeScript

## Getting started

```bash
npm i
```

first_time_start:

1. 
```
 docker run -it -p 5435:5432 --name company-api -e POSTGRES_USER=company -e POSTGRES_PASSWORD=company --mount src=db-company,dst=/var/lib/postgresql/data postgres
```
2. login with pgAdming, connect to the server with params

	General (tab)
		name: company-docker
	Connection (tab)
		Host name/addres: localhost
		Port: 5435
		Maintenace database: postgres
		Username: company
		Password: company
	
3. If db company does not exist, create new db with name company

4. 
```
 npm run migrate-generate-set-name initialMigration
```

```bash
npm start
```

second_time_start:

1. 
``` 
docker start company-api
```

2. 
```bash
npm start
```