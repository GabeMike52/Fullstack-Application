const createEvent = async (event) => {
    try {
      const eventCreated = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
      }).then(res => res.json())
  
      return eventCreated;
    } catch (error) {
      alert(error)
    }
}

const deleteEvent = async (eventId) => {
    try {
        await fetch('http:localhost:3000/events' + '/' + eventId, {
            method: 'DELETE',
        });
    } catch (error) {
        alert(error);
    }
}

const updateEvent = async (eventId, eventUpdate) => {
    try {
        await fetch('http:localhost:3000/events' + '/' + eventId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventUpdate)
        });
    } catch (error) {
        alert(error);
    }
}

const getEvents = async (userId) => {
    try {
        const events = await fetch('http://localhost:3000/events' + '/' + userId).then(res => res.json());
        return events;
    } catch (error) {
        alert(error);
    }
}   

const userJson = localStorage.getItem('user');

const goToLogin = () => {
    window.location.href = 'http://127.0.0.1:5500/src/frontend/login/index.html';
};

if (!userJson) {
    goToLogin();
}

const user = JSON.parse(userJson);

const userNameElement = document.getElementById('user-name');
const userEmailElement = document.getElementById('user-email');
const logoutButtonElement = document.getElementById('logout-btn');
const createEventButtonElement = document.getElementById('event-button');
const createEventInput = document.getElementById('event-input');
const eventsListEl = document.getElementById('events-list');

userNameElement.textContent = user.name;
userEmailElement.textContent = user.email;

logoutButtonElement.addEventListener('click', () => {
    localStorage.removeItem('user');
    goToLogin();
});

createEventButtonElement.addEventListener('click', async () => {
    const title = createEventInput.value;
    await createEvent({ title: title, done: false, userId: user.id });
    window.location.reload();
});

getEvents(user.id).then(events => {
    for (const event of events) {
        const liElement = document.createElement('li');
        liElement.className = 'flex justify-between items-center mb-4';

        const checkAndTitle = document.createElement('div');
        checkAndTitle.className = 'flex gap-4';

        const checkEl = document.createElement('input');
        checkEl.type = 'checkbox';
        checkEl.checked = event.done ? 'checked' : '';
        checkEl.className = 'checkbox';

        checkEl.addEventListener('click', async () => {
            await updateEvent(event.id, { done: !event.done });
            // window.location.reload();
        });

        const titleEl = document.createElement('p');
        titleEl.textContent = event.title;

        const deleteEl = document.createElement('button');
        deleteEl.className = 'btn btn-outline btn-error';
        deleteEl.textContent = 'Delete';

        deleteEl.addEventListener('click', async () => {
            await deleteEvent(event.id);
            window.location.reload();
        });

        checkAndTitle.appendChild(checkEl);
        checkAndTitle.appendChild(titleEl);

        liElement.appendChild(checkAndTitle);
        liElement.appendChild(deleteEl);

        eventsListEl.appendChild(liElement);
    }
});