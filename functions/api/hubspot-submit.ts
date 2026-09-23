// functions/api/hubspot-submit.ts

export const onRequestPost = async (context: any) => {
  try {
    const body = await context.request.json().catch(() => ({}));
    const { firstName, lastName, email, phone, message } = body || {};
    
    const HUBSPOT_TOKEN = context.env?.HUBSPOT_ACCESS_TOKEN;

    if (!HUBSPOT_TOKEN) {
      return Response.json({ error: 'HubSpot token not configured on server.' }, { status: 500 });
    }

    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUBSPOT_TOKEN}`
      },
      body: JSON.stringify({
        properties: {
          firstname: firstName || '',
          lastname: lastName || '',
          email: email || '',
          phone: phone || '',
          message: message || '',
          lifecyclestage: 'lead',
          lead_source: 'Corporate Membership Website Enquiry'
        }
      })
    });

    const respText = await response.text();
    let respData: any = {};
    try {
      respData = respText ? JSON.parse(respText) : {};
    } catch {
      respData = { message: respText || 'Unknown response from HubSpot' };
    }

    if (!response.ok) {
      throw new Error(respData.message || respData.error || 'Failed to submit to HubSpot');
    }

    return Response.json({ success: true, contactId: respData.id });
    
  } catch (error: any) {
    console.error('HubSpot Error:', error);
    return Response.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
};
