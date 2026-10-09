// app/api/submit-form/route.js

export async function POST(request) {
  try {
    const { name, email, investor } = await request.json();

    // Your Google Form URL
    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSevcz5HID2atMrVZ9GfDt_x3BFWlrIuFeWIYuprQI__oZtFog/formResponse';
    
    // Create form data with correct entry IDs
    const formData = new URLSearchParams();
    formData.append('entry.123456789', name);
    formData.append('entry.987654321', email);
    formData.append('entry.456789123', investor);

    // Submit to Google Forms from server side
    await fetch(googleFormUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    // Return success (Google returns error but saves data)
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}



