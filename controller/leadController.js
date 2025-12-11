const axios = require("axios");
const Lead = require("../models/leadModel");

// PROCESS NAMES
exports.processNames = async (req, res) => {
  try {
    const { names } = req.body;
    const nameArr = names.split(",").map(n => n.trim());
    const results = [];

    for (let name of nameArr) {
      try {
        const response = await axios.get(`https://api.nationalize.io?name=${name}`);
        const data = response.data.country[0] || { country_id: "N/A", probability: 0 };

        const status = data.probability > 0.6 ? "Verified" : "To Check";

        const lead = await Lead.create({
          name,
          country: data.country_id,
          probability: data.probability,
          status
        });

        results.push(lead);

      } catch (apiErr) {
        console.log("API error for name:", name, apiErr.message);
      }
    }

    res.json(results);

  } catch (err) {
    console.log("Controller Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// GET ALL LEADS
exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    console.log("Fetch Error:", err);
    res.status(500).json({ message: "Error fetching leads" });
  }
};


// CRON LOGIC (Called from server.js)
exports.syncVerifiedLeads = async () => {
  try {
    const leads = await Lead.find({ status: "Verified", synced: false });

    for (let lead of leads) {
      console.log(`[CRM Sync] Sending verified lead ${lead.name} to Sales Team...`);
      lead.synced = true;
      await lead.save();
    }

  } catch (err) {
    console.log("Cron Sync Error:", err);
  }
};
