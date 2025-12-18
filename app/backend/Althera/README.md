# Althera Portal

## Run the API

Move into the right folder:

```
cd .\app\server\Althera
```

Run the API :

```
dotnet run
```

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

## Run the database

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

Start the database

```
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Build the projet

```
dotnet build
```

Run the project

```
dotnet run
```

```
dotnet run --launch-profile "https"
```
