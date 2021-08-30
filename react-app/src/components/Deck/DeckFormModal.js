import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeckForm from './DeckForm';

function DeckFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className='new-deck-btn'
        id='homepage-new-deck-btn'
        onClick={() => setShowModal(true)}
      >+ New Deck</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3 className='modal-title'>New Deck</h3>
          <DeckForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default DeckFormModal;
