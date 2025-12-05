interface IModal {
    isOpen: boolean;
    children?: React.ReactNode;
    onConfirm?: () => void;
    onClose?: () => void;
}

interface ModalProps {
    titulo: string;
    legendaBotao: string;
}

function Modal({ isOpen, titulo, legendaBotao, children, onConfirm, onClose }: IModal & ModalProps) {
    if (!isOpen) return null;

    return (
        <div className='overlay'>
            <div className="modal">
                <div className="btn-topo">
                    <button className="btn-fechar-modal" onClick={onClose}>X</button>
                </div>
                    <h1 className='modal-titulo'>{titulo}</h1>
                {children}
                <button
                    onClick={onConfirm}
                    className='modal-button'
                >
                    {legendaBotao}
                </button>
            </div>
        </div>
    );
}

export default Modal;