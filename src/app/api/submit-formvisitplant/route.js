export async function POST(request) {
  try {
    const data = await request.json();
    
    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeH8Nj2lwrOtytTrJt3MTn09iTKmko9rx0BKhNEatOhakR1ng/formResponse";
    
    // ===== VALUE MAPPING - EXACT MATCHES FROM FORM =====
    const valueMapping = {
      projectCapacity: {
        // Map old values to actual form values
        "Below 2 TPD": "2-5 TPD",
        "2-5 TPD": "2-5 TPD",
        "5-10 TPD": "10-12 TPD",
        "10-12 TPD": "10-12 TPD",
        "10-20 TPD": "20-50 TPD",
        "20-50 TPD": "20-50 TPD",
        "Above 50 TPD": "Above 50 TPD",
        "Not decided yet": "Not decided yet",
      },
      landStatus: {
        // Map old values to actual form values
        "Yes (own)": "Yes (own)",
        "Yes (leased)": "No (leased)",
        "No (leased)": "No (leased)",
        "No": "Not yet",
        "Not yet": "Not yet",
        "Planning to acquire": "In process",
        "In process": "In process",
      },
      budgetRange: {
        "Below ₹5 CR": "Below ₹5 CR",
        "₹5-10 CR": "₹5-10 CR",
        "₹10-25 CR": "₹10-25 CR",
        "₹25-50 CR": "₹25-50 CR",
        "₹50-100 CR": "₹50-100 CR",
        "Above ₹100 CR": "Above ₹100 CR",
        "₹100 CR+": "Above ₹100 CR",
      },
      startTimeline: {
        "Immediate": "Immediately (0-3 months)",
        "Immediately (0-3 months)": "Immediately (0-3 months)",
        "3-6 months": "3-6 months",
        "6-12 months": "6-12 months",
        "More than 12 months": "More than 12 months",
      },
      projectTeam: {
        "Yes": "Yes",
        "No": "No",
        "Planning to build": "Planning to build",
      },
      cbgProject: {
        "Yes": "Yes",
        "No": "No",
      },
      accommodation: {
        "Yes": "Yes",
        "No": "No",
      }
    };
    
    // Apply mapping
    const mappedData = {
      ...data,
      projectCapacity: valueMapping.projectCapacity[data.projectCapacity] || data.projectCapacity,
      landStatus: valueMapping.landStatus[data.landStatus] || data.landStatus,
      budgetRange: valueMapping.budgetRange[data.budgetRange] || data.budgetRange,
      startTimeline: valueMapping.startTimeline[data.startTimeline] || data.startTimeline,
      projectTeam: valueMapping.projectTeam[data.projectTeam] || data.projectTeam,
      cbgProject: valueMapping.cbgProject[data.cbgProject] || data.cbgProject,
      accommodation: valueMapping.accommodation[data.accommodation] || data.accommodation,
    };
    
    console.log("📥 Original:", {
      projectCapacity: data.projectCapacity,
      landStatus: data.landStatus,
      budgetRange: data.budgetRange,
    });
    
    console.log("🔄 Mapped:", {
      projectCapacity: mappedData.projectCapacity,
      landStatus: mappedData.landStatus,
      budgetRange: mappedData.budgetRange,
    });
    
    const formData = new URLSearchParams();

    // ===== Personal & Demographic Details =====
    formData.append("entry.1529464660", mappedData.fullName || "");
    formData.append("entry.1853999342", mappedData.age || "");
    formData.append("entry.1741049491", mappedData.gender || "");
    formData.append("entry.137502388", mappedData.mobileNumber || "");
    formData.append("entry.831602080", mappedData.email || "");
    formData.append("entry.1413182816", mappedData.cityState || "");
    formData.append("entry.1894456408", mappedData.occupation || "");
    formData.append("entry.2135215183", mappedData.organization || "");

    // ===== Purpose of Visit =====
    formData.append("entry.1002462533", mappedData.visitObjective || "");
    if (mappedData.visitObjective === "Others" && mappedData.otherObjective) {
      formData.append("entry.1002462533.other_option_response", mappedData.otherObjective);
    }
    formData.append("entry.318785217", mappedData.cbgProject || "");

    // ===== Project Interest Details (MAPPED VALUES) =====
    formData.append("entry.1568798045", mappedData.projectCapacity || "");
    formData.append("entry.324942137", mappedData.feedstock || "");
    formData.append("entry.856686223", mappedData.landStatus || "");
    formData.append("entry.494643143", mappedData.budgetRange || "");
    formData.append("entry.190294687", mappedData.startTimeline || "");
    formData.append("entry.733664323", mappedData.projectLocation || "");

    // ===== Experience & Readiness =====
    if (Array.isArray(mappedData.experienceBackground) && mappedData.experienceBackground.length > 0) {
      mappedData.experienceBackground.forEach(item => {
        formData.append("entry.1907746139", item);
      });
    }
    formData.append("entry.1413228472", mappedData.projectTeam || "");

    // ===== Visit Preferences =====
    if (mappedData.visitDate) {
      const [year, month, day] = mappedData.visitDate.split("-");
      formData.append("entry.617848181_year", year);
      formData.append("entry.617848181_month", parseInt(month, 10).toString());
      formData.append("entry.617848181_day", parseInt(day, 10).toString());
    }
    
    formData.append("entry.1318555108", mappedData.numPersons || "");
    formData.append("entry.1558281421", mappedData.accommodation || "");

    // Areas of Interest
    if (Array.isArray(mappedData.areasOfInterest) && mappedData.areasOfInterest.length > 0) {
      mappedData.areasOfInterest.forEach(item => {
        formData.append("entry.225794014", item);
      });
    }
    if (mappedData.areasOfInterest?.includes("Others") && mappedData.otherInterest) {
      formData.append("entry.225794014.other_option_response", mappedData.otherInterest);
    }

    // ===== Payment =====
    formData.append("entry.1825836251", mappedData.paymentMode || "");

    // ===== Declaration =====
    formData.append("entry.1830106532", mappedData.signature || "");
    
    if (mappedData.declarationDate) {
      const [year, month, day] = mappedData.declarationDate.split("-");
      formData.append("entry.2132869345_year", year);
      formData.append("entry.2132869345_month", parseInt(month, 10).toString());
      formData.append("entry.2132869345_day", parseInt(day, 10).toString());
    }

    console.log("📤 Submitting:", formData.toString());

    const res = await fetch(googleFormUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      redirect: "manual"
    });

    console.log("Response Status:", res.status);

    if (res.status === 303 || res.status === 200 || (res.status >= 300 && res.status < 400)) {
      console.log("✅ Success!");
      return Response.json({ 
        success: true,
        message: "Form submitted successfully" 
      });
    }

    const responseText = await res.text();
    console.error("❌ Failed:", responseText.substring(0, 500));

    return Response.json({ 
      success: false, 
      error: `Form returned status ${res.status}`,
      details: responseText.substring(0, 500)
    }, { status: 400 });

  } catch (error) {
    console.error("❌ Error:", error);
    return Response.json({ 
      success: false, 
      error: error.message
    }, { status: 500 });
  }
}