import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('DentTimetable.db');

const createTables = () => {
   
    
    db.transaction(txn => {
        txn.executeSql(
          'CREATE TABLE IF NOT EXISTS patients (id INTEGER PRIMARY KEY AUTOINCREMENT, fullname VARCHAR(20), phone VARCHAR(20), isSmoking BOOLEAN CHECK (isSmoking IN (0, 1)), isPregnancy BOOLEAN CHECK (isPregnancy IN (0, 1)))',
          [],
          () => {
            console.log('table created successfully')
          },
          error => {
            console.log('error on creating table' + error.message)
          }
        )
      })

    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, patientId INTEGER, toothNumber INTEGER, diagnosis VARCHAR(20), price INTEGER, date VARCHAR(20), time VARCHAR(20), FOREIGN KEY (patientId) REFERENCES patients(id))',
        [],
        () => {
          console.log('table created successfully')
        },
        error => {
          console.log('error on creating table' + error.message)
        }
      )
    })
  }

  const showAppointments = () => {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM appointments', null, 
      (txnObj, result) => console.log(result),
      (txnObj, error) => {console.log(error);}
      )
    })
  }

  export { createTables, showAppointments }
