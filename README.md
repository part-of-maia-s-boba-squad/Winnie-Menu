# Open Grub

> A user can search for a restaurant based on location, cuisine, or restaurant’s name and visit the restaurant’s page to get an overview of what the restaurant has to offer like photos of their dishes, their menu options, customers’ reviews, and be able to make a reservation.

## Related Projects

  - Reservation: https://github.com/part-of-maia-s-boba-squad/reservations_module
  - Restaurant Info & Menu: https://github.com/part-of-maia-s-boba-squad/Winnie-Menu
  - Restaurant Photos: https://github.com/part-of-maia-s-boba-squad/Photos
  - Reviews: https://github.com/part-of-maia-s-boba-squad/reviews_service

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#Development)
1. [Usage](#Usage)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

Seeding Database:
  - For PostGres: `npm run psqlDataGen`
  - For Cassandra: `npm run casDataGen`

API CRUD:

| Endpoints            | Type   | Input                                | Output                               | Description                   |
| -------------------- |------| ------------------------------------| ------------------------------------| -----------------------------|
| /API/restaurant/:id  | GET    | restaurant id                        | document of menu and restaurant info | Gets restaurant info and menu |
| /API/restaurant/     | POST   | document of menu and restaurant info | status code: 201                     | Create a restaurant document  |
| /API/restaurant/:id  | PUT    | restaurant id                        | status code: 200                     | Update a restaurant document  |
| /API/restaurant/:id  | DELETE | restaurant id                        | status code: 200                     | Delete a restaurant document  |

### Usage

From within the root directory:

```sh
npm install
npm run react-dev
npm start
```
In a browser, go to localhost:3003/restaurant/100
- 100 is min and can go to max of 478
