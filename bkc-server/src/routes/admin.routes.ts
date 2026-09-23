import { Router } from 'express';

const router = Router();

// Verify admin passkey against server environment variable
router.post('/verify-passkey', (req, res) => {
  const { passkey } = req.body;
  const configuredPasskey = process.env.ADMIN_PASSKEY || 'bkc2024';

  if (!passkey) {
    return res.status(400).json({ success: false, error: 'Passkey is required' });
  }

  if (passkey === configuredPasskey) {
    return res.json({ success: true, message: 'Passkey verified successfully' });
  }

  return res.status(401).json({ success: false, error: 'Invalid passkey' });
});

export default router;
