import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeckForm from './DeckForm';

function DeckFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    {/* TODO: Change "Log In" to something else - submit ? */}
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeckForm />
        </Modal>
      )}
    </>
  );
}

export default DeckFormModal;
