# **Movie Service**

## **Overview**

The `movie_service` is an Express-based application that retrieves movie information from an **Azure SQL Database** called `Movies`. The database contains the following tables:

- `VHS`
- `DVD`
- `Projector`

This app provides a POST endpoint to query and retrieve data from the `Projector` table, running locally on port `5000`.

---

## **Installation**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd movie_service
   ```

## Install dependencies

```
npm install

```

## Run the applicaiton

```
npm run start

```

## Endpoints to be called in application or POSTMAN

```
POST http://localhost:5000/vhs

POST http://localhost:5000/dvd

POST http://localhost:5000/projector

JSON BODY
{
  "currentPage": 1,
  "pageSize": 3,
  "search": {
    "title": "The Godfather"
  }
}
```

## We get the following

```
{
	"currentPage": 1,
	"pageSize": 3,
	"films": [
		{
			"title": "The Godfather",
			"releaseYear": 1972,
			"numberOfCopiesAvailable": 7,
			"director": "Francis Ford Coppola",
			"distributor": "Paramount Pictures"
		}
	]
}
```

## Or no title to get everything

```

{
  "currentPage": 1,
  "pageSize": 3,
  "search": {
    "title": ""
  }
}

```

## reponse example

```
{
	"currentPage": 1,
	"pageSize": 3,
	"data": [
		{
			"title": "Back to the Future",
			"releaseYear": 1985,
			"numberOfCopiesAvailable": 3,
			"director": "Robert Zemeckis",
			"distributor": "Universal Pictures"
		},
		{
			"title": "Braveheart",
			"releaseYear": 1995,
			"numberOfCopiesAvailable": 2,
			"director": "Mel Gibson",
			"distributor": "Icon Productions"
		},
		{
			"title": "Clash of the Titans",
			"releaseYear": 2010,
			"numberOfCopiesAvailable": 2,
			"director": "Louis Leterrier",
			"distributor": "Warner Bros."
		}
	]
}
```
