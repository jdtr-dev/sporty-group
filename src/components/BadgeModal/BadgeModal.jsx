function BadgeModal({ imagen, seasonYears, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="modal-card">
            <section className="modal-card-body">
                <figure className="image is-4by3">
                    <img src={imagen} alt="Badge" />
                </figure>
                <h4 className="has-text-centered">{seasonYears}</h4>
            </section>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
}

export default BadgeModal;
