// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

import { firebaseConfig } from "../fbConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();


export const electrictyStatus = (req, res) => {
    const starCountRef = ref(db, '/ELECTRICITY STATUS');
    let data ;
    onValue(starCountRef, (snapshot) => {
        data = snapshot.val();
    });
    return res.status(200).send(data);
}

export const flowRate1 = (req, res) => {
    const starCountRef = ref(db, '/TRANS/FLOW_RATE1');
    let data ;
    onValue(starCountRef, (snapshot) => {
        data = snapshot.val();
    });
    return res.status(200).send(data);
}

export const flowRate2 = (req, res) => {
    const starCountRef = ref(db, '/FLOW_RATE_2/FIT102');
    let data ;
    onValue(starCountRef, (snapshot) => {
        data = snapshot.val();
    });
    return res.status(200).send(data);
}

export const roEnable = (req, res) => {
    const starCountRef = ref(db, '/RO ENABLE');
    let data ;
    onValue(starCountRef, (snapshot) => {
        data = snapshot.val();
    });
    return res.status(200).send(data);
}

export const totalFt101hr = (req, res) => {
    const starCountRef = ref(db, '/Total running hr of fit101');
    let data ;
    onValue(starCountRef, (snapshot) => {
        data = snapshot.val();
    });
    return res.status(200).send(data);
}

export const totalFt102hr = (req, res) => {
    const starCountRef = ref(db, '/total running hr FIT102');
    let data ;
    onValue(starCountRef, (snapshot) => {
        data = snapshot.val();
    });
    return res.status(200).send(data);
}
