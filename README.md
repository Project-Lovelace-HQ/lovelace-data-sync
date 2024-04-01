# LOVELACE DATA SYNC

This project is part of **Project Lovelace**, which aims to develop a price tracker for the [Ludopedia](https://ludopedia.com.br/) website, where a user can specify which games they want to track via a [Notion](https://www.notion.so) database.

**Lovelace Data Sync**'s main goal is to interact with the [Notion API](https://developers.notion.com/) to get the user's subscribed games and update its database contents when requested. It is built with Node.js and TypeScript.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Setting up the Notion Database

For this project you will need a database (a table) in Notion, where the data will be collected and updated. For connecting it with the API in the next step, create an [Integration](https://www.notion.so/my-integrations) in Notion and take note of the key.

Database example:
| Game Name     | Subscribed?   | URL                | Lowest Price (USD) |
| ------------- | ------------- | ------------------ | ------------------ |
| My Board Game | Yes           | http://example.com |                    |
| Another Game  | No            |                    |                    |

### Installing

1. Clone the repository
2. Install the dependencies with `npm install`
3. Copy the `.env.example` file to `.env` and fill in your environment variables

Notes about the Environment Variables:

- The `NOTION_KEY` must be created and retrieved from the [My Integrations](https://www.notion.so/my-integrations) page for your user. Must have 50 characters.
- The `NOTION_DATABASE_ID` is from a database connected to the integration stated above and can be simply retrieved from the URL of the database. Must have 32 characters.
- The `NOTION_DATABASE_SUBSCRIPTION_COLUMN_NAME` is the **name** of the column in the database that defines if the user wants to fetch updates on that game's price. It must be a `select` property.
- The `NOTION_DATABASE_SUBSCRIPTION_COLUMN_POSITIVE_VALUE_NAME` is the **value** that should be in the property stated above for it to be accepted as true (if set to any other value the tracker will ignore this record).
- The `NOTION_DATABASE_LUDOPEDIA_URL_COLUMN_NAME` is the **name** of the column in the database with the URL of the game on the Ludopedia website. It must be a `URL` property.
- `NODE_ENV` can either be **development** or **production**.

### Running the application

You can start the application with the following command:

```sh
npm start
```

### Building the application

You can build the application with the following command:

```sh
npm run build
```

### Running the tests

You can run the tests with the following command:

```sh
npm test
```
