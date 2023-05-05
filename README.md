# React Disc Golf Bag


This is a JavaScript React web application for managing a disc golf inventory. It allows you to add, remove, edit, and move discs between your bag and storage.

## How to Use

To use this application, simply open https://my-disc-golf-bag.onrender.com/ in your web browser, or to run this locally you will need to copy the migration.sql and seed.sql files into a database and in the index.js file add "http://localhost:3000/" to the front of the fetch routes. This will display the main page of the application, which shows your current disc inventory in your bag and storage.

To add a new disc, click one of the "Add" button at the top of the page, the one under "Bag" will add a new disc to the bag section and the one under storage will add a new disc to the storage section. Clicking the "Add" button will display a form where you can enter the details of the new disc, such as its manufacturer, name, type of plastic, type of disc, color, weight, speed, glide, turn, and fade.

To remove a disc, click on the "Remove" button next to the disc you want to remove. This will remove the disc that it is next to from your inventory.

To move a disc between your bag and storage, drag and drop the disc where you want it to be.

To edit a disc, Click the "Edit" button next to the disc you want to edit, this will display a form where you can edit the details of the selected disc.

## How It Works

This application uses JavaScript and the Fetch API to communicate with a server that stores the disc inventory data. The server is built using Node.js and Express.js, and it stores the data in a Docker database.

When the application loads, it fetches the disc inventory data from the server and displays it on the main page. When you add, remove, move, or edit a disc, the application sends a request to the server to update the data in the database. The application then fetches the updated data from the server and displays it on the main page.

The application uses event listeners to respond to user interactions, such as clicking a button. It also uses functions to perform various tasks, such as fetching data from the server, updating the user interface, and sending requests to the server to update the data.

## Requirements

To run this application, you will need a web browser and a server that can run Node.js and some sort of database. You will also need to install the following dependencies:

- concurrently
- express
- cors
- dotenv
- pg
- nodemon (optional)
- react
- vite

You can install these dependencies using the following command:

```
npm install
```