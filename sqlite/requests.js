import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('DentTimetable.db');

const createTables = () => {
       
    db.transaction(txn => {
        txn.executeSql(
          'CREATE TABLE IF NOT EXISTS patients (id INTEGER PRIMARY KEY AUTOINCREMENT, fullname VARCHAR(20) NOT NULL, phone VARCHAR(20), isSmoking BOOLEAN CHECK (isSmoking IN (0, 1)), isPregnancy BOOLEAN CHECK (isPregnancy IN (0, 1)))',
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
        'CREATE TABLE IF NOT EXISTS appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, patientId INTEGER NOT NULL, toothNumber INTEGER, diagnosis VARCHAR(20), price INTEGER, date VARCHAR(20) NOT NULL, time VARCHAR(20) NOT NULL, FOREIGN KEY (patientId) REFERENCES patients(id))',
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
        txn.executeSql(`SELECT * FROM appointments WHERE patientId = ${patientId};`, null,
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

  const deletePatientAppointments = (patientId) => {

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

  const getPatients = async () => {
    return new Promise((res, rej) => {
      db.transaction(txn => {
        txn.executeSql('SELECT * FROM patients', null,
        (txnObj, result) => {      
          res(result)
        },
        (txnObj, error) => {
          console.log(error);
          rej(error)
        }
        )
      })
    })
  }

  const getAppointmentsWithPatients = () => {
    return new Promise((res, rej) => {
      db.transaction(txn => {
        txn.executeSql('SELECT * FROM patients JOIN appointments WHERE appointments.patientId = patients.id', null, 
        (txnObj, result) => {
          res(result)
        },
        (txnObj, error) => {
          console.log(error);
          rej(error)
        }
        )
      })
    })
  }

  const deleteAppointment = (appointmentId) => {
    db.transaction(txn => {
      txn.executeSql(`DELETE FROM appointments WHERE id = ${appointmentId};`,
      [],
      () => {
        console.log('appointment deleted successfully')
      },
      error => {
        console.log('error on deleting appointment' + error.message)
      })
    })
  }

  const changePatient = (fullname, phone, id, isSmoking, isPregnancy) => {
    db.transaction(txn => {
      txn.executeSql(
        `UPDATE patients 
        SET fullname = '${fullname}', phone = '${phone}', isSmoking = '${Number(isSmoking)}',  isPregnancy = '${Number(isPregnancy)}' 
        WHERE id = ${id}
        `,
        [],
        () => {
          console.log('info update successfully')
        },
        error => {
          console.log('error on updating info ' + error.message),
          console.log(isSmoking, isPregnancy)
        }
          )
      }) 
  }

  const changeAppointment = (id, date, diagnosis, price, time, toothNumber) => {
    db.transaction(txn => {
      txn.executeSql(
        `UPDATE appointments 
        SET date = '${date}', diagnosis = '${diagnosis}', price = '${price}', time = '${time}', toothNumber = '${toothNumber}'
        WHERE id = ${id}
        `,
        [],
        () => {
          console.log('info updated successfully')
        },
        error => {
          console.log('error on updating info ' + error.message)
        }
          )
      }) 
  }

  const getPatientAppointments = async (patientId) => {
    return new Promise((res, rej) => {
      db.transaction(txn => {
        txn.executeSql(`SELECT * FROM appointments WHERE patientId = ${patientId};`, null,
        (txnObj, result) => {
          res(result)
        },
        (txnObj, error) => {
          console.log(error);
          rej(error)
        }
        )
      })
    })
  }

  const addPatients = (fullname, phone, isSmoking, isPregnancy) => {
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO patients (fullname, phone, isSmoking, isPregnancy) VALUES ('${fullname}', '${phone}', ${isSmoking}, ${isPregnancy})`,
        [],
        () => {
          console.log('Patient added successfully')
        },
        error => {
          console.log('error on adding patient' + error.message)
        }
          )
      }) 
  }

  const addAppointments = (patient, toothNumber, diagnosis, price, date, time) => {

    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO appointments (patientId, toothNumber, diagnosis, price, date, time) VALUES (${patient}, ${Number(toothNumber)}, '${diagnosis}', ${Number(price)}, '${date}', '${time}')`,
        [],
        () => {
          console.log('appointment added successfully')
        },
        error => {
          console.log('error on adding appointment' + error.message)
        }
          )
      }) 
  }

  export { createTables, showAppointments, showPatients, dropAppointments, dropPatients, deletePatientAppointments, isPatientAppointments, deletePatient, getPatients, getAppointmentsWithPatients, deleteAppointment, changePatient, changeAppointment, getPatientAppointments, addPatients, addAppointments }
