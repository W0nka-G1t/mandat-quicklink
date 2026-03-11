import { API_URL, LINK_URL } from './config/api'

import './modal.css'

export const generateQRCode = function (shortCode, parentElement) {

  fetch(`${LINK_URL}/${shortCode}/qr`, {
    method: 'POST'
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('QR code generated:', data.qrCodeUrl);
        // Display the QR code in a modal
        if (parentElement) {
           parentElement.innerHTML = `<img src="${data.qrCode}" alt="QR Code for ${shortCode}" />`;
        } else {
          const modal = document.createElement('div');
          modal.classList.add('modal');
          modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>QR Code pour ${shortCode}</h2>
          <img src="${data.qrCode}" alt="QR Code for ${shortCode}" />
        </div>
      `;
          document.body.appendChild(modal);

          // Show the modal
          modal.style.display = 'flex';
          // Close the modal when the close button is clicked 
          modal.querySelector('.close').addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.removeChild(modal);
          });

        }
      }
    })
    .catch(err => {
      console.error('Error generating QR code:', err);
    });
}