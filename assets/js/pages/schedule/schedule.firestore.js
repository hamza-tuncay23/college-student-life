import {
    getFirestore,
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import { auth } from "../../core/firebase.js";

const db = getFirestore();

function scheduleCollection() {

    const uid = auth.currentUser.uid;

    return collection(
        db,
        "users",
        uid,
        "schedule"
    );

}

/* ==========================
   LISTENER
========================== */

export function listenSchedule(callback) {

    const q = query(
        scheduleCollection(),
        orderBy("day"),
        orderBy("startTime")
    );

    return onSnapshot(q, (snapshot) => {

        const sessions = [];

        snapshot.forEach(docSnap => {

            sessions.push({

                id: docSnap.id,

                ...docSnap.data()

            });

        });

        callback(sessions);

    });

}

/* ==========================
   ADD
========================== */

export async function addSession(data) {

    await addDoc(
        scheduleCollection(),
        {

            ...data,

            createdAt: Date.now()

        }
    );

}

/* ==========================
   UPDATE
========================== */

export async function updateSession(id, data) {

    const ref = doc(
        db,
        "users",
        auth.currentUser.uid,
        "schedule",
        id
    );

    await updateDoc(ref, {

        ...data,

        updatedAt: Date.now()

    });

}

/* ==========================
   DELETE
========================== */

export async function deleteSession(id) {

    const ref = doc(
        db,
        "users",
        auth.currentUser.uid,
        "schedule",
        id
    );

    await deleteDoc(ref);

}

/* ==========================
   UPCOMING CLASS
========================== */

export function getUpcomingClass(sessions) {

    if (!sessions.length) return null;

    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 +
        now.getMinutes();

    const today = now.toLocaleDateString("en-US", {
        weekday: "long"
    });

    const todaySessions = sessions.filter(
        s => s.day === today
    );

    for (const session of todaySessions) {

        const [h, m] = session.startTime.split(":");

        const start =
            Number(h) * 60 +
            Number(m);

        if (start >= currentMinutes)
            return session;

    }

    return todaySessions[0] || null;

}

/* ==========================
   SUBJECTS
========================== */

export function getSubjects(sessions) {

    const map = {};

    sessions.forEach(session => {

        if (!map[session.title]) {

            map[session.title] = 0;

        }

        map[session.title]++;

    });

    return Object.entries(map).map(([name, count]) => ({

        name,

        count

    }));

}
