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

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
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
                console.log(index);
                let copyEmailLists = JSON.parse(JSON.stringify(emailsList));
                copyEmailLists[index].read = !email.read;
                setEmailsList(copyEmailLists);
                console.log(emailsList);
              }}
            />
            <input
              className="star-checkbox"
              type="checkbox"
              checked={email.starred}
              onClick={() => {
                console.log(index);
                let copyEmailLists = JSON.parse(JSON.stringify(emailsList));
                copyEmailLists[index].starred = !email.starred;
                setEmailsList(copyEmailLists);
                console.log(emailsList);
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
