
import Notes from "./Notes";

export default function Home(props) {
  return (
    <>
      <div className="container home-notes-container my-3">
        
        <Notes showAlert={props.showAlert} />
      </div>
    </>
  );
}
