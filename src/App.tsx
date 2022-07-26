import Header from "./components/Header";

import initialEmails from "./data/emails";

import { useState } from "react";

import "./App.css";

type email = {
  id: number;
  read: boolean;
  sender: string;
  starred: boolean;
  title: string;
};

function App() {
  // Use initialEmails for state
  const [emailsList, setEmailsList] = useState(initialEmails);
  const [initEmails, setInitEmails] = useState(
    JSON.parse(JSON.stringify(initialEmails))
  );
  const [hideRead, setHideRead] = useState(false);
  const [inboxNr, setInboxNr] = useState(initialEmails.length);
  const [starredNr, setStarredNr] = useState(function () {
    let count = 0;
    for (let email of emailsList) {
      if (email.starred) {
        count++;
      }
    }
    return count;
  });

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => {
              setEmailsList(initEmails);
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{inboxNr}</span>
          </li>
          <li
            className="item"
            onClick={() => {
              setEmailsList(() => {
                let copyEmailLists = JSON.parse(
                  JSON.stringify(emailsList)
                ).filter((email: email) => {
                  return email.starred;
                });
                return copyEmailLists;
              });
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{starredNr}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              onChange={() => {
                if (!hideRead) {
                  setEmailsList(() => {
                    let filteredEmailsList;
                    filteredEmailsList = emailsList.filter((email) => {
                      return !email.read;
                    });

                    return JSON.parse(JSON.stringify(filteredEmailsList));
                  });
                } else {
                  setEmailsList(JSON.parse(JSON.stringify(initEmails)));
                }
                setHideRead(!hideRead);
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {emailsList.map((email: email, index) => (
          <div className="email" key={email.id}>
            <input
              type="checkbox"
              name=""
              id=""
              className="first-child"
              checked={email.read}
              onClick={() => {
                let copyEmailLists = JSON.parse(JSON.stringify(initEmails));
                copyEmailLists[index].read = !copyEmailLists[index].read;
                setInitEmails(JSON.parse(JSON.stringify(copyEmailLists))); //JSON.parse(JSON.stringify(copyEmailLists));
                setEmailsList(copyEmailLists);
              }}
            />
            <input
              className="star-checkbox"
              type="checkbox"
              checked={email.starred}
              onClick={() => {
                if (email.starred) {
                  setStarredNr(starredNr - 1);
                } else {
                  setStarredNr(starredNr + 1);
                }
                let copyEmailLists = JSON.parse(JSON.stringify(initEmails));
                copyEmailLists[index].starred = !email.starred;
                setInitEmails(JSON.parse(JSON.stringify(copyEmailLists)));
                setEmailsList(JSON.parse(JSON.stringify(copyEmailLists)));
              }}
            />
            <div className="">{email.sender}</div>
            <div className="">{email.title}</div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
