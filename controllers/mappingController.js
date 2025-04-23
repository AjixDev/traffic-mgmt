const db = require("../services/dbService");
const { generateOurParam } = require("../services/paramService");

const retrieveOriginal = async (req, res) => {
  const { our_param } = req.query;
  if (!our_param) {
    return res.status(400).send("Missing our_param");
  }

  try {
    const [rows] = await db.query(
      "SELECT combination_key FROM mappings WHERE our_param = ?",
      [our_param]
    );

    if (rows.length === 0) {
      return res.status(404).send("Mapping not found");
    }

    const [keyword, src, creative] = rows[0].combination_key.split("|");
    res.json({ keyword, src, creative });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const refreshMapping = async (req, res) => {
  const { keyword, src, creative } = req.body;
  if (!keyword || !src || !creative) {
    return res.status(400).send("Missing parameters");
  }

  const combinationKey = `${keyword}|${src}|${creative}`;

  try {
    const [rows] = await db.query(
      "SELECT version FROM mappings WHERE combination_key = ?",
      [combinationKey]
    );

    if (rows.length === 0) {
      return res.status(404).send("Mapping not found");
    }

    const newVersion = rows[0].version + 1;
    const newOurParam = generateOurParam(combinationKey, newVersion);

    await db.query(
      "UPDATE mappings SET our_param = ?, version = ? WHERE combination_key = ?",
      [newOurParam, newVersion, combinationKey]
    );

    res.json({ our_param: newOurParam });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { retrieveOriginal, refreshMapping };
