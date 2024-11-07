import pool from "../connectDB.js";

const getAllCountries = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM country");
    return res.status(200).json(rows);
};

const getCountryById = async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM country WHERE countryId = ?", [id]);
    if (rows.length === 0) {
        return res.status(404).json({ message: "Country not found" });
    }
    return res.status(200).json(rows[0]);
};

const createCountry = async (req, res) => {
    const { name } = req.body;
    const [rows] = await pool.query("INSERT INTO country (name) VALUES (?)", [name]);
    return res.status(201).json({ id: rows.insertId, name });
};

const deleteCountry = async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM country WHERE countryId = ?", [id]);
    if (rows.affectedRows === 0) {
        return res.status(404).json({ message: "Country not found" });
    }
    return res.status(200).json({ message: "Country deleted successfully" });
};

export { getAllCountries , getCountryById, createCountry, deleteCountry };