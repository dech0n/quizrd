import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditDeckForm from './EditDeckForm';

function EditDeckFormModal({deck}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className='new-deck-btn'
        id='homepage-new-deck-btn'
        onClick={() => setShowModal(true)}
      >Update Deck</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditDeckForm deck={deck} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditDeckFormModal;
