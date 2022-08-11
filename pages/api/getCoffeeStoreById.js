import { findRecordByFilter } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const records = await findRecordByFilter(id);

      if (records.length !== 0) {
        res.json(records);
      } else {
        res.json({ message: 'Sorry this coffee store could not be found'});
      }

    } else {
      res.status(400);
      res.json({ message: 'Id or name is missing'});
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "Something went wrong", error})
  }

}

export default getCoffeeStoreById;
