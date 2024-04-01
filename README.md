# LOVELACE DATA SYNC

This project is part of **Project Lovelace**, which aims to develop a price tracker for the [Ludopedia](https://ludopedia.com.br/) website and integrate it with a [Notion](https://www.notion.so) Database.

**Lovelace Data Sync**'s main goal is to interact with the [Notion API](https://developers.notion.com/) to update database contents when requested. It is built with Node.js and TypeScript.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Setting up the Notion Database

For this project you will need a database (a table) in Notion, where the data will be collected and updated. For connecting it with the API in the next step, create an [Integration](https://www.notion.so/my-integrations) in Notion and take note of the key.

### Installing

1. Clone the repository
2. Install the dependencies with `npm install`
3. Copy the `.env.example` file to `.env` and fill in your environment variables

Notes about the Environment Variables:

- The `NOTION_KEY` must be created and retrieved from the [My Integrations](https://www.notion.so/my-integrations) page for your user. Must have 50 characters.
- The `NOTION_DATABASE_ID` is from a database connected to the integration stated above and can be simply retrieved from the URL of the database. Must have 32 characters.
- The `NOTION_DATABASE_SUBSCRIPTION_COLUMN_NAME` is the **name** of the column in the database that defines if the user want to fetch updates on that game's price. It must be a `select` property.
- The `NOTION_DATABASE_SUBSCRIPTION_COLUMN_POSITIVE_VALUE_NAME` is the **value** that should be in the property stated above for it to be accepted as true (if set to any other value the tracker will ignore this record).
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
