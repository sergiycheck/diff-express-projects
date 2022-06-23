SOLVED
{
problem: {
not appending logs to access.log when starting
app with docker compose and command

    ```bash
    command: sh -c 'npm run start:prod'
    ```

}

solution {
helpful info
https://docs.docker.com/engine/reference/builder/#notes-about-specifying-volumes

stackOverflow question to answer
https://stackoverflow.com/questions/56499271/docker-compose-volume-not-synced

specify volume in DockerFile
remove old volumes, rebuild with

```bash
docker-compose up --build
```

}

problem: {

not showing db postgres data in
pg-db-data mount point after creating table and
inserting data into it. Volumes not synced or
dont understand something.
Volumes're not listed in docker volume ls,
but data is persisted after container delete and
restart.
}

SOLUTION: {
vscode in ubuntu doest not show
the content fo pg-db-data
because the owner of pg-db-data is root.
It actually exists and there is data in there!
}

error: {
winston does not logged in docker.
maybe because of incorrect build
}

}
