export default function About() {
  return (
    <div className="container">
      <h1>About s.NoteBook</h1>

      <ul className="product-plans">
        <li className="product-plan">
          <div className="title">Clear your mind. s.NoteBook is here.</div>
          <div className="price">Welcome</div>
          <ul className="features">
            <li className="d-flex">
              Your brain is for having ideas, not for holding them. s.Notebook
              was designed to be your 'second brain'—a digital sanctuary where
              your thoughts are safe, organized, and always one click away.
            </li>
          </ul>
          <p className="btn">
            <i class="ri-reactjs-line"></i>
            <small>Reactjs</small>
          </p>
        </li>

        <li className="product-plan">
          <div className="title">Write at the speed of your thought</div>
          <div className="price">To</div>
          <ul className="features">
            <li className="d-flex">
              s.Notebook cuts through the clutter. A lean, high-performance
              workspace for serious note-takers. No bloated features, no
              lag—just pure speed when inspiration strikes. Built for people who
              value their time
            </li>
          </ul>
          <button className="btn"><i class="ri-nodejs-line"></i><small> Nodejs</small></button>
        </li>

        <li className="product-plan">
          <div className="title"> Simplicity you can trust.</div>
          <div className="price">s.NoteBook</div>
          <ul className="features">
            <li className="d-flex">
              We believe your private thoughts should stay private. s.Notebook is
              a transparent, open-source project built with a 'user-first'
              philosophy. No hidden tracking, no confusing menus. Just a clean,
              honest space to build your knowledge base.
            </li>
          </ul>
          <button className="btn"><i class="ri-database-line"></i> <small> MongoBD</small></button>
        </li>
      </ul>
    </div>
  );
}
