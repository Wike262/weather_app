import React, { ReactElement } from 'react';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root')!);

interface Props {
	children: ReactElement;
}

const ModalWindow = ({ children }: Props) => {
	return (
		<Modal
			style={{
				overlay: {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					background: 'rgba(0,0,0,.75)',
				},
				content: { width: '250px', top: 'none', bottom: 'none', left: 'none', right: 'none' },
			}}
			parentSelector={() => document.getElementById('root')!}
			isOpen={true}
		>
			{children}
		</Modal>
	);
};

export default ModalWindow;
