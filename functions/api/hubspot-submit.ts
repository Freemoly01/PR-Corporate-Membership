// functions/api/hubspot-submit.ts

export const onRequestPost = async (context: any) => {
  try {
    // 1. Grab the information the user typed into the frontend form
    const body = await context.request.json();
    const { firstName, lastName, email, phone, message } = body;
    
    // 2. Fetch the secret token from your Cloudflare environment variables
    const HUBSPOT_TOKEN = context.env.HUBSPOT_ACCESS_TOKEN;

    if (!HUBSPOT_TOKEN) {
      return Response.json({ error: 'HubSpot token not configured on server.' }, { status: 500 });
    }

    // 3. Send the data to HubSpot's official API
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUBSPOT_TOKEN}`
      },
      body: JSON.stringify({
        properties: {
          firstname: firstName,
          lastname: lastName,
          email: email,
          phone: phone,
          message: message,
          lifecyclestage: 'lead',
          lead_source: 'Corporate Membership Website Enquiry'
        }
      })
    });

    // 4. Check if HubSpot rejected the data (e.g., invalid email format)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error((errorData as any).message || 'Failed to submit to HubSpot');
    }

    // 5. Success! Tell the frontend the contact was created.
    const data = await response.json();
    return Response.json({ success: true, contactId: (data as any).id });
    
  } catch (error: any) {
    console.error('HubSpot Error:', error);
    return Response.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
};
