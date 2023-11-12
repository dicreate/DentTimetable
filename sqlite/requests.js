import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("DentTimetable.db");

const createTables = () => {
  createPatients();
  createPatientsInfo();
  createAppointments();
  createTeethFormula();
};

const dropTables = () => {
  dropPatients();
  dropAppointments();
  dropPatientsInfo();
  dropTeethFormula();
};

const createPatients = () => {
  db.transaction((txn) => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        fullname VARCHAR(20) NOT NULL, 
        phone VARCHAR(20) 
      )`,
      [],
      () => {
        console.log("table created successfully");
      },
      (error) => {
        console.log("error on creating table" + error.message);
      }
    );
  });
};

const createPatientsInfo = () => {
  db.transaction((txn) => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS patientsInfo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patientId INTEGER NOT NULL, 
        isCardiovascularSystem BOOLEAN CHECK (isCardiovascularSystem IN (0, 1)),
        isNervousSystem BOOLEAN CHECK (isNervousSystem IN (0, 1)),
        isEndocrineSystem BOOLEAN CHECK (isEndocrineSystem IN (0, 1)),
        isDigestive BOOLEAN CHECK (isDigestive IN (0, 1)),
        isRespiratory BOOLEAN CHECK (isRespiratory IN (0, 1)),
        isInfectious BOOLEAN CHECK (isInfectious IN (0, 1)),
        isAllergic BOOLEAN CHECK (isAllergic IN (0, 1)),
        isConstantMedicines BOOLEAN CHECK (isConstantMedicines IN (0, 1)),
        isHarmfulFactors BOOLEAN CHECK (isHarmfulFactors IN (0, 1)),
        isPregnancy BOOLEAN CHECK (isPregnancy IN (0, 1)),
        isAlcohol BOOLEAN CHECK (isAlcohol IN (0, 1)),
        isSmoking BOOLEAN CHECK (isSmoking IN (0, 1)), 
        isOther BOOLEAN CHECK (isOther IN (0, 1)),
        cardiovascularSystem VARCHAR,
        nervousSystem VARCHAR,
        endocrineSystem VARCHAR,
        digestive VARCHAR,
        respiratory VARCHAR,
        infectious VARCHAR,
        allergic VARCHAR,
        constantMedicines VARCHAR,
        harmfulFactors VARCHAR,
        pregnancy VARCHAR,
        alcohol VARCHAR,
        smoking VARCHAR,
        other VARCHAR,
        FOREIGN KEY (patientId) REFERENCES patients(id)
      )`,
      [],
      () => {
        console.log("table created successfully");
      },
      (error) => {
        console.log("error on creating table PatientsInfo" + error.message);
      }
    );
  });
};

const changePatientInfo = async (data) => {
  const {
    patientId,
    isCardiovascularSystem,
    isNervousSystem,
    isEndocrineSystem,
    isDigestive,
    isRespiratory,
    isInfectious,
    isAllergic,
    isConstantMedicines,
    isHarmfulFactors,
    isPregnancy,
    isAlcohol,
    isSmoking,
    isOther,
    cardiovascularSystem,
    nervousSystem,
    endocrineSystem,
    digestive,
    respiratory,
    infectious,
    allergic,
    constantMedicines,
    harmfulFactors,
    pregnancy,
    alcohol,
    smoking,
    other,
  } = data;

  db.transaction((txn) => {
    txn.executeSql(
      `UPDATE patientsInfo
        SET isCardiovascularSystem = '${Number(
          isCardiovascularSystem
        )}', isNervousSystem = '${Number(
        isNervousSystem
      )}', isEndocrineSystem = '${Number(
        isEndocrineSystem
      )}', isDigestive = '${Number(isDigestive)}', isRespiratory = '${Number(
        isRespiratory
      )}', isInfectious = '${Number(isInfectious)}', isAllergic = '${Number(
        isAllergic
      )}', isConstantMedicines = '${Number(
        isConstantMedicines
      )}', isHarmfulFactors = '${Number(
        isHarmfulFactors
      )}', isPregnancy = '${Number(isPregnancy)}', isAlcohol = '${Number(
        isAlcohol
      )}', isSmoking = '${Number(isSmoking)}', isOther = '${Number(
        isOther
      )}', cardiovascularSystem = '${cardiovascularSystem}', nervousSystem = '${nervousSystem}', endocrineSystem = '${endocrineSystem}', digestive = '${digestive}', respiratory = '${respiratory}', infectious = '${infectious}', allergic = '${allergic}', constantMedicines = '${constantMedicines}', harmfulFactors = '${harmfulFactors}', pregnancy = '${pregnancy}', alcohol = '${alcohol}', smoking = '${smoking}', other = '${other}'                       
        WHERE patientId = ${patientId}
        `,
      [],
      () => {
        console.log("info update successfully");
      },
      (error) => {
        console.log("error on updating info " + error.message);
      }
    );
  });
};

const createAppointments = () => {
  db.transaction((txn) => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        patientId INTEGER NOT NULL, 
        toothNumber INTEGER, 
        diagnosis VARCHAR(20), 
        price INTEGER, 
        date VARCHAR(20) NOT NULL, 
        time VARCHAR(20) NOT NULL, 
        anesthetization BOOLEAN CHECK (anesthetization IN (0, 1)), 
        FOREIGN KEY (patientId) REFERENCES patients(id))`,
      [],
      () => {
        console.log("table created successfully");
      },
      (error) => {
        console.log("error on creating table" + error.message);
      }
    );
  });
};

const createTeethFormula = () => {
  db.transaction((txn) => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS teethFormula (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        patientId INTEGER NOT NULL, 
        toothNumber VARCHAR(5), 
        diagnosis VARCHAR(5), 
        FOREIGN KEY (patientId) REFERENCES patients(id))`,
      [],
      () => {
        console.log("table created successfully");
      },
      (error) => {
        console.log("error on creating table" + error.message);
      }
    );
  });
};

const addTeethFormula = (data) => {
  const { patientId, toothNumber, diagnosis } = data;
  db.transaction((txn) => {
    txn.executeSql(
      `INSERT INTO teethFormula (patientId, toothNumber, diagnosis) VALUES (?, ?, ?)`,
      [patientId, toothNumber, diagnosis],
      () => {
        console.log("teethFormula added successfully");
      },
      (error) => {
        console.log("error on adding teethFormula" + error.message);
      }
    );
  });
};

const getTeethFormula = async (patientId) => {
  return new Promise((res, rej) => {
    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM teethFormula
        WHERE patientId = ${patientId}
        `,
        null,
        (txnObj, result) => {
          res(result);
        },
        (txnObj, error) => {
          console.log(error);
          rej(error);
        }
      );
    });
  });
};

const dropTeethFormula = () => {
  db.transaction((txn) => {
    txn.executeSql(
      "DROP TABLE teethFormula",
      null,
      (txnObj, result) => console.log("table drop successfully"),
      (txnObj, error) => {
        console.log(error);
      }
    );
  });
};

const dropPatientsInfo = () => {
  db.transaction((txn) => {
    txn.executeSql(
      "DROP TABLE patientsInfo",
      null,
      (txnObj, result) => console.log("table drop successfully"),
      (txnObj, error) => {
        console.log(error);
      }
    );
  });
};

const dropTeethHistory = () => {
  db.transaction((txn) => {
    txn.executeSql(
      "DROP TABLE teethHistory",
      null,
      (txnObj, result) => console.log("table drop successfully"),
      (txnObj, error) => {
        console.log(error);
      }
    );
  });
};

const showAppointments = () => {
  db.transaction((txn) => {
    txn.executeSql(
      "SELECT * FROM appointments",
      null,
      (txnObj, result) => console.log(result.rows),
      (txnObj, error) => {
        console.log(error);
      }
    );
  });
};

const dropAppointments = () => {
  db.transaction((txn) => {
    txn.executeSql(
      "DROP TABLE appointments",
      null,
      (txnObj, result) => console.log("table drop successfully"),
      (txnObj, error) => {
        console.log(error);
      }
    );
  });
};

const showPatients = () => {
  db.transaction((txn) => {
    txn.executeSql(
      "SELECT * FROM patients",
      null,
      (txnObj, result) => console.log(result.rows),
      (txnObj, error) => {
        console.log(error);
      }
    );
  });
};

const showPatientsInfo = () => {
  db.transaction((txn) => {
    txn.executeSql(
      "SELECT * FROM patientsInfo",
      null,
      (txnObj, result) => console.log(result.rows._array),
      (txnObj, error) => {
        console.log(error);
      }
    );
  });
};

const dropPatients = () => {
  db.transaction((txn) => {
    txn.executeSql(
      "DROP TABLE patients",
      null,
      (txnObj, result) => console.log("table drop successfully"),
      (txnObj, error) => {
        console.log(error);
      }
    );
  });
};

const isPatientAppointments = async (patientId) => {
  return new Promise((res, rej) => {
    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM appointments WHERE patientId = ${patientId};`,
        null,
        (txnObj, result) => {
          const rowCount = result.rows.length;
          const isNotEmpty = rowCount > 0;
          res(isNotEmpty);
        },
        (txnObj, error) => {
          console.log(error);
          rej(error);
        }
      );
    });
  });
};

const deletePatientAppointments = (patientId) => {
  db.transaction((txn) => {
    txn.executeSql(
      `SELECT * FROM appointments WHERE patientId=${patientId};`,
      null,
      (txnObj, result) => {
        result.rows.length
          ? db.transaction((txn) => {
              txn.executeSql(
                `DELETE FROM appointments WHERE patientId=${patientId};`,
                [],
                () => {
                  console.log("appointments deleted successfully");
                },
                (error) => {
                  console.log("error on deleting patient" + error.message);
                }
              );
            })
          : null;
      },
      (txnObj, error) => {
        console.log(error);
      }
    );
  });
};

const deletePatient = (patientId) => {
  db.transaction((txn) => {
    txn.executeSql(
      `DELETE FROM patients WHERE id=${patientId};`,
      [],
      () => {
        console.log("patient deleted successfully");
      },
      (error) => {
        console.log("error on deleting patient" + error.message);
      }
    );
  });
};

const getPatients = async () => {
  return new Promise((res, rej) => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT * FROM patients",
        null,
        (txnObj, result) => {
          res(result);
        },
        (txnObj, error) => {
          console.log(error);
          rej(error);
        }
      );
    });
  });
};

const getAppointmentsWithPatients = () => {
  return new Promise((res, rej) => {
    db.transaction((txn) => {
      txn.executeSql(
        `
        SELECT * FROM patients 
        JOIN appointments 
        WHERE appointments.patientId = patients.id`,
        null,
        (txnObj, result) => {
          res(result);
        },
        (txnObj, error) => {
          console.log(error);
          rej(error);
        }
      );
    });
  });
};

const deleteAppointment = (appointmentId) => {
  db.transaction((txn) => {
    txn.executeSql(
      `DELETE FROM appointments WHERE id = ${appointmentId};`,
      [],
      () => {
        console.log("appointment deleted successfully");
      },
      (error) => {
        console.log("error on deleting appointment" + error.message);
      }
    );
  });
};

const changePatient = (fullname, phone, id) => {
  db.transaction((txn) => {
    txn.executeSql(
      `UPDATE patients 
        SET fullname = '${fullname}', phone = '${phone}' 
        WHERE id = ${id}
        `,
      [],
      () => {
        console.log("info update successfully");
      },
      (error) => {
        console.log("error on updating info " + error.message);
      }
    );
  });
};

const changeAppointment = (id, date, diagnosis, price, time, toothNumber) => {
  db.transaction((txn) => {
    txn.executeSql(
      `UPDATE appointments 
        SET date = '${date}', diagnosis = '${diagnosis}', price = '${price}', time = '${time}', toothNumber = '${toothNumber}'
        WHERE id = ${id}
        `,
      [],
      () => {
        console.log("info updated successfully");
      },
      (error) => {
        console.log("error on updating info " + error.message);
      }
    );
  });
};

const getPatientAppointments = async (patientId) => {
  return new Promise((res, rej) => {
    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM appointments WHERE patientId = ${patientId};`,
        null,
        (txnObj, result) => {
          res(result);
        },
        (txnObj, error) => {
          console.log(error);
          rej(error);
        }
      );
    });
  });
};

const getPatientInfo = async (patientId) => {
  return new Promise((res, rej) => {
    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM patientsInfo WHERE patientId = ${patientId};`,
        null,
        (txnObj, result) => {
          res(result);
        },
        (txnObj, error) => {
          console.log(error);
          rej(error);
        }
      );
    });
  });
};

const addPatients = async (fullname, phone) => {
  return new Promise((res, rej) => {
    db.transaction((txn) => {
      txn.executeSql(
        `INSERT INTO patients (fullname, phone) VALUES (?, ?)`,
        [fullname, phone],
        (txnObj, result) => {
          res(result.insertId);
          console.log("Patient added successfully");
        },
        (txnObj, error) => {
          console.log(error);
          rej(error);
        }
      );
    });
  });
};

const addPatientsInfo = async (
  patientId,
  isCardiovascularSystem,
  isNervousSystem,
  isEndocrineSystem,
  isDigestive,
  isRespiratory,
  isInfectious,
  isAllergic,
  isConstantMedicines,
  isHarmfulFactors,
  isPregnancy,
  isAlcohol,
  isSmoking,
  isOther,
  cardiovascularSystem,
  nervousSystem,
  endocrineSystem,
  digestive,
  respiratory,
  infectious,
  allergic,
  constantMedicines,
  harmfulFactors,
  pregnancy,
  alcohol,
  smoking,
  other
) => {
  db.transaction((txn) => {
    txn.executeSql(
      `INSERT INTO patientsInfo (patientId, isCardiovascularSystem, isNervousSystem, isEndocrineSystem, isDigestive, isRespiratory, isInfectious, isAllergic, isConstantMedicines, isHarmfulFactors, isPregnancy, isAlcohol, isSmoking, isOther, cardiovascularSystem, nervousSystem, endocrineSystem, digestive, respiratory, infectious, allergic, constantMedicines,harmfulFactors, pregnancy, alcohol, smoking, other) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        patientId,
        isCardiovascularSystem,
        isNervousSystem,
        isEndocrineSystem,
        isDigestive,
        isRespiratory,
        isInfectious,
        isAllergic,
        isConstantMedicines,
        isHarmfulFactors,
        isPregnancy,
        isAlcohol,
        isSmoking,
        isOther,
        cardiovascularSystem,
        nervousSystem,
        endocrineSystem,
        digestive,
        respiratory,
        infectious,
        allergic,
        constantMedicines,
        harmfulFactors,
        pregnancy,
        alcohol,
        smoking,
        other,
      ],
      () => {
        console.log("PatientInfo added successfully");
      },
      (error) => {
        console.log("error on adding patientInfo " + error.message);
      }
    );
  });
};

const addAppointments = (
  patient,
  toothNumber,
  diagnosis,
  price,
  date,
  time,
  anesthetization
) => {
  db.transaction((txn) => {
    txn.executeSql(
      `INSERT INTO appointments (patientId, toothNumber, diagnosis, price, date, time, anesthetization) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        patient,
        Number(toothNumber),
        diagnosis,
        Number(price),
        date,
        time,
        anesthetization,
      ],
      () => {
        console.log("appointment added successfully");
      },
      (error) => {
        console.log("error on adding appointment " + error.message);
      }
    );
  });
};

export {
  createTables,
  showAppointments,
  showPatients,
  dropAppointments,
  dropPatients,
  deletePatientAppointments,
  isPatientAppointments,
  deletePatient,
  getPatients,
  getAppointmentsWithPatients,
  deleteAppointment,
  changePatient,
  changeAppointment,
  getPatientAppointments,
  addPatients,
  addAppointments,
  dropTeethHistory,
  dropTables,
  addPatientsInfo,
  getPatientInfo,
  showPatientsInfo,
  changePatientInfo,
  getTeethFormula,
  addTeethFormula
};
