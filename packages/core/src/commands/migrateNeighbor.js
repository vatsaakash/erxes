const { Collection, Db, MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const districts = [
  {
    code: 'khanuul',
    names: ['хан-уул', 'хан уул', 'хануул'],
  },
  { code: 'songinokhairkhan', names: ['сонгино-хайрхан', 'сонгинохайрхан'] },
  {
    code: 'bagakhangai',
    names: ['багахангай'],
  },
  { code: 'bayangol', names: ['баянгол'] },
  { code: 'sukhbaatar', names: ['сүхбаатар'] },
  { code: 'chingeltei', names: ['чингэлтэй'] },
  { code: 'bayanzurkh', names: ['баянзүрх'] },
  { code: 'nalaikh', names: ['налайх'] },
  { code: 'baganuur', names: ['багануур'] },
];

const { MONGO_URL } = process.env;

if (!MONGO_URL) {
  throw new Error(`Environment variable MONGO_URL not set.`);
}

const client = new MongoClient(MONGO_URL);

let db;
let Items;
let Categories;
let Neighbors;

const insertOrUpdate = async (catId, itemId, type) => {
  const neighbor = await Neighbors.findOne({
    productCategoryId: catId,
  });

  if (neighbor) {
    await Neighbors.updateOne(
      {
        productCategoryId: catId,
      },
      { $push: { [`data.${type}`]: itemId } }
    );
  } else {
    await Neighbors.insertOne({
      productCategoryId: catId,
      data: {
        [type]: [itemId],
      },
    });
  }
};

const command = async () => {
  await client.connect();
  db = client.db();

  Items = db.collection('neighbor_items');
  Categories = db.collection('product_categories');
  Neighbors = db.collection('neighbors');

  const types = ['kindergarden', 'school'];

  for (const type of types) {
    const neighborKGItems = await Items.find({ type }).toArray();

    for (const item of neighborKGItems) {
      let found = false;

      if (item[`${type}Data`]) {
        const district = item[`${type}Data`].district;

        if (district) {
          const selDistrict = districts.find(d =>
            d.names.includes(district.toLowerCase().trim())
          );

          if (selDistrict) {
            const cat = await Categories.findOne({ code: selDistrict.code });

            if (cat) {
              const khoroo = item[`${type}Data`].khoroo;

              if (khoroo) {
                const khorooCat = await Categories.findOne({
                  parentId: cat._id,
                  name: khoroo.trim() + '-р хороо',
                });

                if (khorooCat) {
                  await insertOrUpdate(khorooCat._id, item._id, type);

                  found = true;
                }
              }
            }
          }
        }

        if (!found) {
          const cat = await Categories.findOne({ code: 'other' });

          await insertOrUpdate(cat._id, item._id, type);
        }
      }
    }
  }

  console.log(`Process finished at: ${new Date()}`);

  process.exit();
};

command();
