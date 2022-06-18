# A Rest API with Express, PostgreSQL, TypeOrm, and TypeScript

## Getting started

```bash
npm i
```

```bash
npm start
```

first_time_start:

1.

```
 docker run -it -p 5433:5432 --name blog-api -e POSTGRES_USER=blog -e POSTGRES_PASSWORD=blog --mount src=db-blog,dst=/var/lib/postgresql/data postgres
```
2. login with pgAdming, connect to the server with params

	General (tab)
		name: blog-docker
	Connection (tab)
		Host name/addres: localhost
		Port: 5433
		Maintenace database: postgres
		Username: blog
	
3. If db blog does not exist, create new db with name blog

4.
```
 npm run migrate-generate-set-name initialMigration
```

second_time_start:

``` 
docker start blog-api
```