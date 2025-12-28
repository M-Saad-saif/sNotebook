import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const initialNotes = [
    {
      _id: "69501eaf3e7ac9cd821f9a15",
      user: "69501e424ebb84e5493d0ced",
      title: "intro update",
      description:
        " y name is saad saif sheikg i am studying CS from buitems university",
      tag: "update",
      date: "2025-12-27T18:00:15.501Z",
      __v: 0,
    },
    {
      _id: "6950373c506f44540b4cea8f",
      user: "69501e424ebb84e5493d0ced",
      title: "love story",
      description:
        " love a girl name addah she is soo soo soo much beautifull she is gorgous she is everything",
      tag: "addah and saad",
      date: "2025-12-27T19:45:00.411Z",
      __v: 0,
    },
    {
      _id: "6950373c506f44540b4cea8f",
      user: "69501e424ebb84e5493d0ced",
      title: "love story",
      description:
        " love a girl name addah she is soo soo soo much beautifull she is gorgous she is everything",
      tag: "addah and saad",
      date: "2025-12-27T19:45:00.411Z",
      __v: 0,
    }, {
      _id: "6950373c506f44540b4cea8f",
      user: "69501e424ebb84e5493d0ced",
      title: "love story",
      description:
        " love a girl name addah she is soo soo soo much beautifull she is gorgous she is everything",
      tag: "addah and saad",
      date: "2025-12-27T19:45:00.411Z",
      __v: 0,
    }, {
      _id: "6950373c506f44540b4cea8f",
      user: "69501e424ebb84e5493d0ced",
      title: "love story",
      description:
        " love a girl name addah she is soo soo soo much beautifull she is gorgous she is everything",
      tag: "addah and saad",
      date: "2025-12-27T19:45:00.411Z",
      __v: 0,
    }, {
      _id: "6950373c506f44540b4cea8f",
      user: "69501e424ebb84e5493d0ced",
      title: "love story",
      description:
        " love a girl name addah she is soo soo soo much beautifull she is gorgous she is everything",
      tag: "addah and saad",
      date: "2025-12-27T19:45:00.411Z",
      __v: 0,
    }, {
      _id: "6950373c506f44540b4cea8f",
      user: "69501e424ebb84e5493d0ced",
      title: "love story",
      description:
        " love a girl name addah she is soo soo soo much beautifull she is gorgous she is everything",
      tag: "addah and saad",
      date: "2025-12-27T19:45:00.411Z",
      __v: 0,
    }, {
      _id: "6950373c506f44540b4cea8f",
      user: "69501e424ebb84e5493d0ced",
      title: "love story",
      description:
        " love a girl name addah she is soo soo soo much beautifull she is gorgous she is everything",
      tag: "addah and saad",
      date: "2025-12-27T19:45:00.411Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(initialNotes);

  return (
    <noteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
