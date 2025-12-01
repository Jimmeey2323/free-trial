const express = require('express');
const path = require('path');
const app = express();

// Get port from environment variable (Railway will set this) or use 3000 for local
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// In-memory storage (for demo - use a database in production)
let leads = [];

// Main route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Analytics dashboard route
app.get('/analytics', (req, res) => {
  res.sendFile(path.join(__dirname, 'analytics-dashboard.html'));
});

// Test tracking route
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-tracking.html'));
});

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// ==========================================================
// API ENDPOINTS FOR LEAD TRACKING
// ==========================================================

// Store lead data
app.post('/api/leads', (req, res) => {
  try {
    const leadData = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...req.body
    };
    
    leads.push(leadData);
    
    console.log('📊 New lead captured:', {
      name: `${leadData.firstName} ${leadData.lastName}`,
      source: leadData.utm_source || 'direct',
      campaign: leadData.utm_campaign || 'none'
    });
    
    res.json({ success: true, id: leadData.id });
  } catch (error) {
    console.error('Error storing lead:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all leads
app.get('/api/leads', (req, res) => {
  res.json(leads);
});

// Get campaign statistics
app.get('/api/campaigns/stats', (req, res) => {
  const stats = leads.reduce((acc, lead) => {
    const campaign = lead.utm_campaign || 'No Campaign';
    if (!acc[campaign]) {
      acc[campaign] = {
        campaign,
        source: lead.utm_source || 'Unknown',
        medium: lead.utm_medium || 'Unknown',
        count: 0,
        leads: []
      };
    }
    acc[campaign].count++;
    acc[campaign].leads.push({
      name: `${lead.firstName} ${lead.lastName}`,
      email: lead.email,
      date: lead.timestamp,
      center: lead.center
    });
    return acc;
  }, {});
  
  res.json(Object.values(stats));
});

// Get leads by source
app.get('/api/leads/source/:source', (req, res) => {
  const source = req.params.source.toLowerCase();
  const filtered = leads.filter(lead => 
    (lead.utm_source || '').toLowerCase().includes(source) ||
    (source === 'google' && lead.gclid) ||
    (source === 'facebook' && lead.fbclid)
  );
  res.json(filtered);
});

// Get leads by campaign
app.get('/api/leads/campaign/:campaign', (req, res) => {
  const campaign = req.params.campaign;
  const filtered = leads.filter(lead => 
    lead.utm_campaign === campaign
  );
  res.json(filtered);
});

// Export leads as CSV
app.get('/api/leads/export', (req, res) => {
  const headers = [
    'ID', 'Date', 'First Name', 'Last Name', 'Email', 'Phone', 
    'Studio', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Content', 
    'UTM Term', 'Google Click ID', 'Facebook Click ID', 'Landing Page', 'Referrer'
  ];
  
  const rows = leads.map(lead => [
    lead.id,
    lead.timestamp,
    lead.firstName,
    lead.lastName,
    lead.email,
    lead.phoneNumber,
    lead.center,
    lead.utm_source || '',
    lead.utm_medium || '',
    lead.utm_campaign || '',
    lead.utm_content || '',
    lead.utm_term || '',
    lead.gclid || '',
    lead.fbclid || '',
    lead.landing_page || '',
    lead.referrer || ''
  ]);
  
  let csv = headers.join(',') + '\n';
  rows.forEach(row => {
    csv += row.map(cell => `"${cell}"`).join(',') + '\n';
  });
  
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=leads_${new Date().toISOString().split('T')[0]}.csv`);
  res.send(csv);
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on port ${PORT}`);
  console.log(`📝 Form: http://localhost:${PORT}`);
  console.log(`📊 Analytics: http://localhost:${PORT}/analytics`);
  console.log(`🧪 Test Tracking: http://localhost:${PORT}/test`);
  console.log(`🔗 API: http://localhost:${PORT}/api/leads\n`);
});
