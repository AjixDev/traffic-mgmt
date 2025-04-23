const db = require("../services/dbService");
const { generateOurParam } = require("../services/paramService");

const AFFILIATE_LINK_BASE = "https://affiliate-network.com";

const handleTrafficRequest = async (req, res) => {
  const { keyword, src, creative } = req.query;
  if (!keyword || !src || !creative) {
    return res.status(400).send("Missing parameters");
  }

  const combinationKey = `${keyword}|${src}|${creative}`;
  let ourParam;

  try {
    const [rows] = await db.query(
      "SELECT our_param, version FROM mappings WHERE combination_key = ?",
      [combinationKey]
    );

    if (rows.length > 0) {
      ourParam = rows[0].our_param;
    } else {
      const version = 1;
      ourParam = generateOurParam(combinationKey, version);
      await db.query(
        "INSERT INTO mappings (combination_key, our_param, version) VALUES (?, ?, ?)",
        [combinationKey, ourParam, version]
      );
    }

    const redirectUrl = `${AFFILIATE_LINK_BASE}?our_param=${ourParam}`;
    res.redirect(redirectUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { handleTrafficRequest };
