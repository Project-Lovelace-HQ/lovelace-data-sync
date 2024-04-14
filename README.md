# LOVELACE DATA SYNC

This project is part of **Project Lovelace**, aiming to develop a price tracker for the [Ludopedia](https://ludopedia.com.br/) website, where a user can specify which games they want to track via a [Notion](https://www.notion.so) database.

**Lovelace Data Sync** is an Azure Function app for interacting with the [Notion API](https://developers.notion.com/) to get the user's subscribed games and update its database contents after fetching the relevant data from the [Lovelace Data Extractor](https://github.com/Project-Lovelace-HQ/lovelace-data-extractor) service. It is built with Node.js and TypeScript.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Setting up the Notion Database

For this project, you will need a database (a table) in Notion where the data will be collected and updated. For connecting it to the API in the next step, create an [Integration](https://www.notion.so/my-integrations) in Notion and take note of the key.

Database example:
| Game Name     | Subscribed?   | URL                | Lowest Price (USD) |
| ------------- | ------------- | ------------------ | ------------------ |
| My Board Game | Yes           | http://example.com |                    |
| Another Game  | No            |                    |                    |

### Installing and Running this Project

For this project, you will need **NodeJS** in version 18+.

1. Clone the repository
2. Install the dependencies with `npm install`
3. Copy the `local.settings.example.json` file to `local.settings.json` and fill in your environment variables following the notes below
4. Install the [Azurite](https://marketplace.visualstudio.com/items?itemName=Azurite.azurite) extension for VSCode and run the `Azurite: Start` command
5. Install the [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) extension for VSCode and run the project in debug mode, then you are ready to run the function using the URL in the console!

> [!IMPORTANT]
> - You will be prompted to install the Azure Functions Core Tools if using VSCode. If not, install it manually.
> - You will need a way to do Http Requests to test the application.

**Notes about the Environment Variables**

- The `NOTION_KEY` must be created and retrieved from the [My Integrations](https://www.notion.so/my-integrations) page for your user. Should contain 50 characters.
- The `NOTION_DATABASE_ID` is from a database connected to the integration stated above and can be simply retrieved from the URL of the database. Should contain 32 characters.
- The `NOTION_DATABASE_SUBSCRIPTION_COLUMN_NAME` is the **name** of the column in the database that defines if the user wants to fetch updates on that game's price. The column must be a `select` property.
- The `NOTION_DATABASE_SUBSCRIPTION_COLUMN_POSITIVE_VALUE_NAME` is the **value** that should be in the property stated above for it to be accepted as true (if set to any other value the tracker will ignore this record).
- The `NOTION_DATABASE_LUDOPEDIA_URL_COLUMN_NAME` is the **name** of the column in the database with the URL of the game on the Ludopedia website. The column must be a `URL` property.
- `NODE_ENV` can either be **development** or **production**.

### Running the application

You can run the application as local Azure Function with the following command:

```sh
npm start
```

> Be sure to have the Azurite service up and running in your environment.

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
