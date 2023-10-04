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
      (txnObj, result) => console.log(result.rows),
      (txnObj, error) => {console.log(error);}
      )
    })
  }

  const dropAppointments = () => {
    db.transaction(txn => {
      txn.executeSql('DROP TABLE appointments', null, 
      (txnObj, result) => console.log('table drop successfully'),
      (txnObj, error) => {console.log(error);}
      )
    })
  }
  
  
  const showPatients = () => {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM patients', null, 
      (txnObj, result) => console.log(result.rows),
      (txnObj, error) => {console.log(error);}
      )
    })
  }

  const dropPatients = () => {
    db.transaction(txn => {
      txn.executeSql('DROP TABLE patients', null, 
      (txnObj, result) => console.log('table drop successfully'),
      (txnObj, error) => {console.log(error);}
      )
    })
  }

  const isPatientAppointments = async (patientId) => {
    return new Promise((res, rej) => {
      db.transaction(txn => {
        txn.executeSql(`SELECT * FROM appointments WHERE patientId=${patientId};`, null,
        (txnObj, result) => {
          const rowCount = result.rows.length;
          const isNotEmpty = rowCount > 0;
          res(isNotEmpty)
        },
        (txnObj, error) => {
          console.log(error);
          rej(error)
        }
        )
      })
    })
   
  }

  const deletePatientAppointments = async (patientId) => {

    db.transaction(txn => {
      txn.executeSql(`SELECT * FROM appointments WHERE patientId=${patientId};`, null, 
      (txnObj, result) => { 
        result.rows.length 
        ? db.transaction(txn => {

          txn.executeSql(`DELETE FROM appointments WHERE patientId=${patientId};`,
          [],
          () => {
            console.log('appointments deleted successfully')
          },
          error => {
            console.log('error on deleting patient' + error.message)
          })
        }) 
        : null
      },
      (txnObj, error) => {console.log(error);}
      )
    }) 
  }

  const deletePatient = (patientId) => {
    db.transaction(txn => {

      txn.executeSql(`DELETE FROM patients WHERE id=${patientId};`,
      [],
      () => {
        console.log('patient deleted successfully')
      },
      error => {
        console.log('error on deleting patient' + error.message)
      })
    })
  }

  


  export { createTables, showAppointments, showPatients, dropAppointments, dropPatients, deletePatientAppointments, isPatientAppointments, deletePatient }
