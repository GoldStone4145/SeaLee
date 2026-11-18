export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { paymentId, txid } = req.body || {};
  if (!paymentId || !txid) {
    return res.status(400).json({ error: 'Missing paymentId or txid' });
  }

  const piApiKey = process.env.PI_API_KEY;

  if (piApiKey) {
    try {
      const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Key ${piApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ txid })
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to complete payment with Pi Server', details: error.message });
    }
  }

  return res.status(200).json({
    completed: true,
    paymentId,
    txid,
    mode: 'SANDBOX_SIMULATION',
    timestamp: new Date().toISOString()
  });
}
