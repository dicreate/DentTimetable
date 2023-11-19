import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("DentTimetable.db");

/* Общие запросы */
const createTables = () => {
  createPatients();
  createPatientsInfo();
  createAppointments();
  createTeethFormula();
  createInactiveAppointments();
};

const dropTables = () => {
  dropPatients();
  dropAppointments();
  dropPatientsInfo();
  dropTeethFormula();
};


/* ------------------------------------  Пациенты ----------------------------------------------------- */

// Создание таблицы пациентов
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

// отображение пациентов
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

// удаление пациентов
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

// добавление пациентов
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

// Получение приёмов пациента
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

// Проверка наличия приёмов у пациента
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

// Изменение пациента 
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

// Получение всех пациентов
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

// Удаление приёмов пациента
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

// Удаление пациента 
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

/* ------------------------------------  Информация о пациенте ----------------------------------------------------- */

// Создание таблцы информации о пациенте 
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

// измненение таблицы информации о пациенте 
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

// удаление таблицы инфомации о пациенте 
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

// отображение всей информации из таблицы информации о пациентах
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

// Добавление информации о пациенте
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

// Получение информации пациента 
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


/* ------------------------------------  Активные приёмы ----------------------------------------------------------------- */

// Создание таблицы приёмов
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

// Отображение приёмов
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

// Удаление таблицы приёмов
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

// Получение приёмов с учётом пациентов
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

// удаление приёма
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

// Добавление приёма 
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

// Изменение приёма 
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


/* ------------------------------------  Завершённые приёмы --------------------------------------------------------------- */

// создание таблицы завершённых приёмов
const createInactiveAppointments = () => {
  db.transaction((txn) => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS inactiveAppointments (
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

/* ------------------------------------  Формула зубов --------------------------------------------------------------- */

// создание таблицы формулы зубов
const createTeethFormula = () => {
  db.transaction((txn) => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS teethFormula (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        patientId INTEGER NOT NULL, 
        toothIndex Number,
        diagnosisTop VARCHAR(5),
        diagnosisBottom VARCHAR(5),  
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

// добавление информации в таблицу формулы зубов 
const addTeethFormula = (data) => {
  const { patientId, toothIndex, diagnosisTop, diagnosisBottom } = data;
  db.transaction((txn) => {
    txn.executeSql(
      `INSERT INTO teethFormula (patientId, toothIndex, diagnosisTop, diagnosisBottom) VALUES (?, ?, ?, ?)`,
      [patientId, toothIndex, diagnosisTop, diagnosisBottom],
      () => {
        console.log("teethFormula added successfully");
      },
      (error) => {
        console.log("error on adding teethFormula" + error.message);
      }
    );
  });
};

// изменение таблицы информации формулы зубов
const changeTeethFormula = (data) => {
  const { patientId, toothIndex, diagnosisTop, diagnosisBottom } = data;
  db.transaction((txn) => {
    txn.executeSql(
      `UPDATE teethFormula 
        SET diagnosisTop = '${diagnosisTop}', diagnosisBottom = '${diagnosisBottom}' 
        WHERE patientId = ${patientId} AND toothIndex = ${toothIndex}
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

// Получение таблицы информации конкретного пациента 
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

 // удаление информации формулы зубов о конкретном пациенте
const deleteFromTeethFormula =(patientId) => {
  db.transaction((txn) => {
    txn.executeSql(
      `SELECT * FROM teethFormula WHERE patientId=${patientId};`,
      null,
      (txnObj, result) => {
        result.rows.length
          ? db.transaction((txn) => {
              txn.executeSql(
                `DELETE FROM teethFormula WHERE patientId=${patientId};`,
                [],
                () => {
                  console.log("teethFormula deleted successfully");
                },
                (error) => {
                  console.log("error on deleting teethFormula" + error.message);
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

// Проверка на наличие информации о зубе пациента
const isPatientTooth = async (patientId, toothIndex) => {
  return new Promise((res, rej) => {
    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM teethFormula WHERE patientId = ${patientId} AND toothIndex = ${toothIndex}`,
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

// удаление таблицы формулы зубов
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
  dropTables,
  addPatientsInfo,
  getPatientInfo,
  showPatientsInfo,
  changePatientInfo,
  getTeethFormula,
  addTeethFormula,
  changeTeethFormula,
  isPatientTooth,
  deleteFromTeethFormula
};
