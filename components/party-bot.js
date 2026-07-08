// PartyBot - Floating AI Assistant for party bookings
export class PartyBot {
  constructor() {
    this.isOpen = false;
    this.createButton();
    this.createModal();
    this.bindEvents();
  }

  createButton() {
    this.button = document.createElement('button');
    this.button.id = 'party-bot-button';
    this.button.className = 'party-bot-button';
    this.button.innerHTML = '🤖';
    this.button.title = 'PartyBot Assistant';
    document.body.appendChild(this.button);

    const style = document.createElement('style');
    style.textContent = `
      .party-bot-button {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #16C172, #0E9F63);
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(22, 193, 114, 0.3);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
      }

      .party-bot-button:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 24px rgba(22, 193, 114, 0.4);
      }

      .party-bot-button:active {
        transform: scale(0.95);
      }

      .party-bot-modal {
        display: none;
        position: fixed;
        bottom: 100px;
        right: 24px;
        width: 320px;
        max-height: 500px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        z-index: 998;
        flex-direction: column;
        animation: slideUp 0.3s ease;
      }

      .party-bot-modal.open {
        display: flex;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .party-bot-header {
        background: linear-gradient(135deg, #16C172, #0E9F63);
        color: white;
        padding: 16px;
        border-radius: 16px 16px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
      }

      .party-bot-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .party-bot-content {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        font-size: 13px;
        color: #1C2B24;
        line-height: 1.6;
      }

      .party-bot-message {
        margin-bottom: 12px;
        padding: 10px;
        background: #FFFBF4;
        border-radius: 8px;
        border-left: 3px solid #16C172;
      }

      .party-bot-message.bot {
        background: #E8F7F1;
      }

      .party-bot-footer {
        padding: 12px 16px;
        border-top: 1px solid #E8E8E8;
        display: flex;
        gap: 8px;
      }

      .party-bot-input {
        flex: 1;
        border: 1px solid #E8E8E8;
        border-radius: 8px;
        padding: 8px 12px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 12px;
      }

      .party-bot-send {
        background: #16C172;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 8px 12px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s ease;
      }

      .party-bot-send:hover {
        background: #0E9F63;
      }

      @media (max-width: 480px) {
        .party-bot-modal {
          width: 280px;
          right: 12px;
          bottom: 80px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  createModal() {
    this.modal = document.createElement('div');
    this.modal.className = 'party-bot-modal';
    this.modal.innerHTML = `
      <div class="party-bot-header">
        <span>🤖 PartyBot</span>
        <button class="party-bot-close" id="party-bot-close">&times;</button>
      </div>
      <div class="party-bot-content" id="party-bot-messages">
        <div class="party-bot-message bot">
          Hey! 👋 I'm PartyBot! I can help you plan the perfect party. Ask me anything about themes, pricing, add-ons, or our booking process!
        </div>
      </div>
      <div class="party-bot-footer">
        <input type="text" class="party-bot-input" id="party-bot-input" placeholder="Ask me anything...">
        <button class="party-bot-send" id="party-bot-send">Send</button>
      </div>
    `;
    document.body.appendChild(this.modal);
  }

  bindEvents() {
    document.getElementById('party-bot-close').addEventListener('click', () => this.close());
    this.button.addEventListener('click', () => this.toggle());

    const input = document.getElementById('party-bot-input');
    const send = document.getElementById('party-bot-send');

    send.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.modal.classList.add('open');
    this.isOpen = true;
    document.getElementById('party-bot-input').focus();
  }

  close() {
    this.modal.classList.remove('open');
    this.isOpen = false;
  }

  sendMessage() {
    const input = document.getElementById('party-bot-input');
    const message = input.value.trim();

    if (!message) return;

    this.addMessage('user', message);
    input.value = '';

    // Simulate AI response with a delay
    setTimeout(() => {
      const response = this.generateResponse(message);
      this.addMessage('bot', response);
    }, 500);
  }

  addMessage(sender, text) {
    const messagesContainer = document.getElementById('party-bot-messages');
    const messageEl = document.createElement('div');
    messageEl.className = `party-bot-message ${sender === 'bot' ? 'bot' : ''}`;
    messageEl.textContent = text;
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  generateResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Mock AI responses
    if (message.includes('price') || message.includes('cost')) {
      return 'Our party packages start at $25 with pricing from $10-15 per guest. Add-ons like cake, decorations, and photography are available too! 💰';
    }

    if (message.includes('theme') || message.includes('robotics') || message.includes('art') || message.includes('dance')) {
      return 'We offer amazing themes like Robotics, Art & Craft, Dance, Science Lab, Sports, and Gaming! Each is tailored for different age groups. 🎉';
    }

    if (message.includes('how') || message.includes('book')) {
      return 'Booking is easy! Just select a theme, choose your date/time, add guests, pick add-ons, and confirm. Takes just 5 minutes! ✨';
    }

    if (message.includes('age')) {
      return 'Our parties are designed for kids aged 4-14. Each theme has specific age recommendations to ensure the perfect fit! 🎂';
    }

    if (message.includes('add-on')) {
      return 'We offer cake & snacks, party favors, premium photography, decorations, and DJ services. Mix and match to customize your party! 🎊';
    }

    if (message.includes('hi') || message.includes('hello')) {
      return 'Hey there! 👋 How can I help you plan an amazing party today?';
    }

    // Default response
    return 'Great question! I can help with information about themes, pricing, booking process, age recommendations, and add-ons. What would you like to know? 🎈';
  }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PartyBot();
  });
} else {
  new PartyBot();
}
