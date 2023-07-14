import { Component } from 'react';
import {GoogleSpreadsheet} from 'google-spreadsheet';

export default class SpreadsheetService extends Component {
    spreadsheet = new GoogleSpreadsheet('1BxiMVs0XRA46xgviz5vkc1jbI3vA3V-Z_2GqU_8FmE');

    /*
    // create a sheet and set the header row
const sheet = await doc.addSheet({ headerValues: ['name', 'email'] });

// append rows
const larryRow = await sheet.addRow({ name: 'Larry Page', email: 'larry@google.com' });
const moreRows = await sheet.addRows([
  { name: 'Sergey Brin', email: 'sergey@google.com' },
  { name: 'Eric Schmidt', email: 'eric@google.com' },
]);

// read rows
const rows = await sheet.getRows(); // can pass in { limit, offset }

// read/write row values
console.log(rows[0].name); // 'Larry Page'
rows[1].email = 'sergey@abc.xyz'; // update a value
await rows[1].save(); // save updates
await rows[1].delete(); // delete a row
     */
}
