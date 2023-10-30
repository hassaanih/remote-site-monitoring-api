// Import the functions you need from the SDKs you need
import { mysqldb } from "../db.js";
import { eachDayOfInterval } from 'date-fns';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../fbConfig.js";
import { getDatabase, ref, onValue } from "firebase/database";


const getStartAndEndDateOfWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Calculate the start date of the week (Sunday)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - dayOfWeek);

    // Calculate the end date of the week (Saturday)
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + (6 - dayOfWeek));

    // Format the dates as strings (YYYY-MM-DD)
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    return { startDate: formattedStartDate, endDate: formattedEndDate };
}

const getDateinText = (date) => {
    const dateObj = new Date(date);
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getDate().toString().padStart(2, "0");
    let year = dateObj.getUTCFullYear();

    return year + "-" + month + "-" + day;
}
const startAndEndDate = getStartAndEndDateOfWeek();

const daysOfWeek = eachDayOfInterval({
    start: new Date(startAndEndDate.startDate),
    end: new Date(startAndEndDate.endDate)
});

// Create a new array with dates only (without time)
const datesOnly = daysOfWeek.map(date => {
    return getDateinText(date);
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();


export const electricityStatus = (req, res) => {
    const starCountRef = ref(db, '/ELECTRICITY STATUS');

    const getData = () => {
        return new Promise((resolve, reject) => {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    };

    getData()
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            return res.status(500).send('Internal Server Error');
        });
};

export const flowRate1 = (req, res) => {
    const starCountRef = ref(db, '/TRANS/FLOW_RATE1');

    const getData = () => {
        return new Promise((resolve, reject) => {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    };

    getData()
        .then((data2) => {
            let data = Object.values(data2).map(item => {
                return {
                    data: item.data,
                    timestamp: item.timestamp
                }
            });
            return res.status(200).send(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            return res.status(500).send('Internal Server Error');
        });
};

export const latestflowRate1 = (req, res) => {
    const starCountRef = ref(db, '/TRANS/FLOW_RATE1');

    // Use a Promise to handle the asynchronous nature
    const getData = () => {
        return new Promise((resolve, reject) => {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    };

    // Call the asynchronous function and wait for the data
    getData()
        .then((data) => {
            const dataArray = Object.values(data);
            const lastElement = dataArray[dataArray.length - 1];
            return res.status(200).send({
                latestflowRate1: lastElement.data
            });
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            return res.status(500).send('Internal Server Error');
        });
};

export const avgflowRate1 = (req, res) => {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const starCountRef = ref(db, '/TRANS/FLOW_RATE1');

    // Use a Promise to handle the asynchronous nature
    const getData = () => {
        return new Promise((resolve, reject) => {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    };

    // Call the asynchronous function and wait for the data
    getData()
        .then((data) => {
            const dataArray = Object.values(data);
            let maxData = -Infinity;


            const dayCounts = {
                Sunday: 0,
                Monday: 0,
                Tuesday: 0,
                Wednesday: 0,
                Thursday: 0,
                Friday: 0,
                Saturday: 0,
            };

            const dayData = {
                Sunday: 0,
                Monday: 0,
                Tuesday: 0,
                Wednesday: 0,
                Thursday: 0,
                Friday: 0,
                Saturday: 0,
            };

            dataArray.forEach((elem) => {
                if (elem.timestamp !== undefined) {
                    const day = days[new Date(elem.timestamp).getDay()];
                    const dateText = getDateinText(new Date(elem.timestamp));

                    if (datesOnly.includes(dateText)) {
                        maxData = elem.data > maxData ? elem.data : maxData;
                        dayCounts[day]++;
                        dayData[day] += elem.data;
                    }
                }
            });
            const result = {};
            Object.keys(dayCounts).forEach((day) => {
                result[`${day.toLowerCase()}_avg`] = dayCounts[day] !== 0 ? (dayData[day] / dayCounts[day]) : 0;
            });
            return res.status(200).send({ result, maxData });
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            return res.status(500).send('Internal Server Error');
        });

};

export const flowRate2 = (req, res) => {
    const starCountRef = ref(db, '/FLOW_RATE_2/FIT102');

    const getData = () => {
        return new Promise((resolve, reject) => {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    };

    getData()
        .then((data2) => {
            let data = Object.values(data2).map(item => {
                return {
                    data: item.data,
                    timestamp: item.timestamp
                }
            });
            return res.status(200).send(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            return res.status(500).send('Internal Server Error');
        });
};

export const latestflowRate2 = (req, res) => {
    const starCountRef = ref(db, '/FLOW_RATE_2/FIT102');

    const getData = () => {
        return new Promise((resolve, reject) => {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    };

    getData()
        .then((data) => {
            const dataArray = Object.values(data);
            const lastElement = dataArray[dataArray.length - 1];
            return res.status(200).send({
                latestflowRate2: lastElement.data
            });
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            return res.status(500).send('Internal Server Error');
        });
};

export const avgflowRate2 = (req, res) => {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const starCountRef = ref(db, '/FLOW_RATE_2/FIT102');

    // Use a Promise to handle the asynchronous nature
    const getData = () => {
        return new Promise((resolve, reject) => {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    };

    // Call the asynchronous function and wait for the data
    getData()
        .then((data) => {
            const dataArray = Object.values(data);
            let maxData = -Infinity;


            const dayCounts = {
                Sunday: 0,
                Monday: 0,
                Tuesday: 0,
                Wednesday: 0,
                Thursday: 0,
                Friday: 0,
                Saturday: 0,
            };

            const dayData = {
                Sunday: 0,
                Monday: 0,
                Tuesday: 0,
                Wednesday: 0,
                Thursday: 0,
                Friday: 0,
                Saturday: 0,
            };

            dataArray.forEach((elem) => {
                if (elem.timestamp !== undefined) {
                    const day = days[new Date(elem.timestamp).getDay()];
                    const dateText = getDateinText(new Date(elem.timestamp));
                    if (datesOnly.includes(dateText)) {
                        maxData = elem.data > maxData ? elem.data : maxData;
                        dayCounts[day]++;
                        dayData[day] += elem.data;
                    }

                }
            });

            maxData = maxData;
            const result = {};
            Object.keys(dayCounts).forEach((day) => {
                result[`${day.toLowerCase()}_avg`] = dayCounts[day] !== 0 ? (dayData[day] / dayCounts[day]) : 0;
            });
            return res.status(200).send({ result, maxData });
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            return res.status(500).send('Internal Server Error');
        });

};

export const sumflowrates = (req, res) => {

    const starCountRef = ref(db, '/TRANS/FLOW_RATE1');
    const starCountRef2 = ref(db, '/FLOW_RATE_2/FIT102');

    // Use a Promise to handle the asynchronous nature
    const getData = () => {
        return new Promise((resolve, reject) => {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    };

    const getData2 = () => {
        return new Promise((resolve, reject) => {
            onValue(starCountRef2, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    };

    Promise.all([getData(), getData2()])
        .then(([data1, data2]) => {
            let flowRate1 = Object.values(data1).map(item => {
                return {
                    data: item.data,
                    timestamp: item.timestamp
                }
            });
            let flowRate2 = Object.values(data2).map(item => {
                return {
                    data: item.data,
                    timestamp: item.timestamp
                }
            });

            // Check if both data arrays have been populated before sending the response
            if (flowRate1.length !== 0 && flowRate2.length !== 0) {
                // Create an object to store the summed data                         

                res.status(200).send({
                    sum: flowRate1[flowRate1.length - 1].data + flowRate2[flowRate2.length - 1].data
                });
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            return res.status(500).send('Internal Server Error');
        });


};

export const roEnable = (req, res) => {
    const starCountRef = ref(db, '/RO ENABLE');

    const getData = () => {
        return new Promise((resolve, reject) => {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    };

    getData()
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            return res.status(500).send('Internal Server Error');
        });
};

export const totalFt101hr = (req, res) => {
    const starCountRef = ref(db, '/Total running hr of fit101');

    const getData = () => {
        return new Promise((resolve, reject) => {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    };

    getData()
        .then((data2) => {
            let data = Object.values(data2).map(item => {
                return {
                    data: item.data,
                    timestamp: item.timestamp
                }
            });
            return res.status(200).send(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            return res.status(500).send('Internal Server Error');
        });
};

export const totalFt102hr = (req, res) => {
    const starCountRef = ref(db, '/total running hr FIT102');

    const getData = () => {
        return new Promise((resolve, reject) => {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    };

    getData()
        .then((data2) => {
            let data = Object.values(data2).map(item => {
                return {
                    data: item.data,
                    timestamp: item.timestamp
                }
            });
            return res.status(200).send(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            return res.status(500).send('Internal Server Error');
        });
};

export const getallusers = (req, res) => {
    let query = "SELECT * FROM users;";

    const executeQuery = () => {
        return new Promise((resolve, reject) => {
            mysqldb.query(query, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    };

    executeQuery()
        .then((data) => {
            // Process the retrieved data, for example, send it as a response to the client
            res.status(200).json(data);
        })
        .catch((error) => {
            // Handle the error, for example, send an error response to the client
            console.error("Error executing the query:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

export const insertValues = (req, res) => {    
    const query = "INSERT INTO watersun.users SET ?";

    const insertData = {
        username: req.body.username,
        password: req.body.password,
        user_role: req.body.user_role,
        dash_head1: req.body.dash_head1,
        dash_head2: req.body.dash_head2,
        dash_head3: req.body.dash_head3,
        site_head1: req.body.site_head1,
        site_head2: req.body.site_head2,
        site_head3: req.body.site_head3,
    }
    const executeQuery = (query, insertData) => {
        return new Promise((resolve, reject) => {
            mysqldb.query(query, insertData, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    };

    executeQuery(query, insertData)
        .then((data) => {
            // Process the retrieved data, for example, send it as a response to the client
            res.status(200).json(data);
        })
        .catch((error) => {
            // Handle the error, for example, send an error response to the client
            console.error("Error executing the query:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });


};
