export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { paymentId } = req.body || {};
  if (!paymentId) {
    return res.status(400).json({ error: 'Missing paymentId' });
  }

  const piApiKey = process.env.PI_API_KEY;

  // Pi Server API Key가 설정된 경우 실제 Pi Network API 호출
  if (piApiKey) {
    try {
      const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Key ${piApiKey}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to approve payment with Pi Server', details: error.message });
    }
  }

  // 개발/샌드박스 환경 폴백 응답
  return res.status(200).json({
    approved: true,
    paymentId,
    mode: 'SANDBOX_SIMULATION',
    timestamp: new Date().toISOString()
  });
}

