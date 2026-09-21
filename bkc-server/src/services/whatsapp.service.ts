import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode';
import { sendQRCodeEmail, sendAlertEmail } from './email.service';

class WhatsAppService {
  private client: Client | null = null;
  private isReady = false;
  private messageQueue: { to: string, message: string }[] = [];

  async initialize() {
    try {
      this.client = new Client({
        authStrategy: new LocalAuth({ dataPath: 'bkc-whatsapp-session' }),
        puppeteer: {
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
          ]
        },
        webVersionCache: {
          type: 'none'
        }
      });

      this.client.on('qr', async (qr) => {
        console.log('Intercepted QR code, emailing it to admin...');
        // qrcode-terminal or generate data URL
        const qrDataUrl = await qrcode.toDataURL(qr);
        await sendQRCodeEmail(qrDataUrl);
      });

      this.client.on('ready', async () => {
        this.isReady = true;
        console.log('WhatsApp Service Initialized');
        await this.processQueue();
      });

      this.client.on('disconnected', (reason) => {
        console.log(`WhatsApp Disconnected: ${reason}`);
        sendAlertEmail(`WhatsApp Disconnected`, `The WhatsApp connection has dropped. Reason: ${reason}.`);
        if (process.env.NODE_ENV === 'production') {
          process.exit(1);
        }
      });

      await this.client.initialize();
    } catch (error) {
      console.error('Failed to initialize WhatsApp service:', error);
      sendAlertEmail('WhatsApp Init Failure', `The WhatsApp service failed to initialize: ${error}`);
      if (process.env.NODE_ENV === 'production') {
        process.exit(1);
      }
    }
  }

  async processQueue() {
    if (this.messageQueue.length > 0) {
      console.log(`Processing ${this.messageQueue.length} queued WhatsApp messages...`);
      for (const item of this.messageQueue) {
        await this.sendMessage(item.to, item.message);
        // Small delay to prevent rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      this.messageQueue = [];
    }
  }

  async sendMessage(to: string, message: string) {
    if (!this.isReady || !this.client) {
      console.log('WhatsApp client not ready, queuing message:', message.substring(0, 50) + '...');
      this.messageQueue.push({ to, message });
      return true;
    }

    try {
      const cleanPhone = to.replace(/\D/g, '');
      let phoneWithCode = cleanPhone;
      if (cleanPhone.length === 10) {
        phoneWithCode = `91${cleanPhone}`;
      }
      const chatId = `${phoneWithCode}@c.us`;

      await this.client.sendMessage(chatId, message);
      console.log(`WhatsApp message sent to ${to}`);
      return true;
    } catch (error) {
      console.error(`Failed to send WhatsApp message to ${to}:`, error);
      return false;
    }
  }
}

export const waService = new WhatsAppService();
