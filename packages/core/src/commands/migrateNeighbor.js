const mongodb = require('mongodb');
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

const client = new mongodb.MongoClient(MONGO_URL);

let db;
let Items;
let Categories;
let Neighbors;

const insertOrUpdate = async (catId, itemId, type) => {
  const neighbor = await Neighbors.findOne({
    productCategoryId: catId,
  });

  if (neighbor) {
    if (
      !neighbor.data ||
      !neighbor.data[type] ||
      (neighbor.data[type] && !neighbor.data[type].includes(itemId))
    ) {
      await Neighbors.updateOne(
        {
          productCategoryId: catId,
        },
        { $push: { [`data.${type}`]: itemId } }
      );
    }
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

  const types = ['kindergarden', 'school', 'hospital', 'khoroo', 'pharmacy'];

  for (const type of types) {
    const neighborItems = await Items.find({ type }).toArray();

    for (const item of neighborItems) {
      let found = false;
      let district = '';
      let khoroo = '';

      if (type === 'khoroo') {
        const names = item.name.trim().split(' ');

        if (names.length === 4) {
          district = names[0];
          khoroo = names[2].replace('-р', '');
        } else if (names.length === 5) {
          district = names[0] + names[1];
          khoroo = names[3].replace('-р', '');
        }
      } else if (item[`${type}Data`]) {
        district = item[`${type}Data`].district;
        khoroo = item[`${type}Data`].khoroo;
      }

      if (type === 'hospital' && khoroo && khoroo.split('-').length > 1) {
        const khorooArr = khoroo.split('-');

        khoroo = khorooArr[1];
      }

      if (type === 'pharmacy' && khoroo && khoroo.split('-').length > 1) {
        const khorooArr = khoroo.split('-');

        khoroo = khorooArr[0];
      }

      district = district.toLowerCase().trim();
      khoroo = khoroo.toLowerCase().trim();

      if (district && khoroo) {
        const selDistrict = districts.find(d => d.names.includes(district));

        if (selDistrict) {
          const cat = await Categories.findOne({ code: selDistrict.code });

          if (cat) {
            const khorooCat = await Categories.findOne({
              parentId: cat._id,
              name: khoroo + '-р хороо',
            });

            if (khorooCat) {
              await insertOrUpdate(khorooCat._id, item._id, type);

              found = true;
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
