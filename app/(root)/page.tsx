"use client";

import Modal from "@/components/ui/modal";

const SetupPage = () => {
  return (
    <div className="p-4">
      <Modal isOpen onClose={() => {}} title="Título" description="Descrição">
        Children
      </Modal>
    </div>
  );
};

export default SetupPage;
