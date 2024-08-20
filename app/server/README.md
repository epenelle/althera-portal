# Althera Portal

## Start the database

In order to see the database, we are using Microsoft SQL Server Management Studio.
The server is <mark>(localdb)\mssqllocaldb</mark>

Move into the right folder
```
cd .\app\server\Althera
```

Get the dependancies
```
dotnet restore
```
If the folder : "Migrations" already exist, delete it with :
```
dotnet ef migrations remove
```
Make sure the Database deosn't existe (look with SQL Server Managment Studio and delete the database)

Start & create the database
```
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Build the projet (to check if there is no error(s))
```
dotnet build
```


## Run the API & Swagger

Move into the right folder:
```
cd .\app\server\Althera
```

Run the API :
```
dotnet run
```

Run the API and Swagger :
```
--launch-profile "https"
```
Swagger at : https://localhost:7025/swagger/index.html


## Run the API test website

API should be runing prior trying to run the test website

Move into the right folder
```
cd .\app\clinic-client\testAPI\althera_test_api
```

Start the website 
```
npm start
```

